import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { createLoginRateLimit } from '../middleware/loginRateLimit';
import { createRequireAuth } from '../middleware/requireAuth';
import { AdminDb, writeAudit } from '../services/adminDb';
import {
  getDummyHash,
  hashPassword,
  signToken,
  validatePassword,
  verifyPassword,
} from '../services/adminAuth';

export interface AuthRouterDeps {
  db: AdminDb;
  secret: string;
  expiresIn?: string;
  rounds?: number;
  loginLimit?: number;
}

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(150),
  password: z.string().min(1).max(200),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1).max(200),
  newPassword: z.string().min(1).max(200),
});

const publicAdmin = (a: { id: string; name: string; email: string; role: string }) => ({
  id: a.id,
  name: a.name,
  email: a.email,
  role: a.role,
});

export const createAuthRouter = ({ db, secret, expiresIn = '12h', rounds = 12, loginLimit = 10 }: AuthRouterDeps) => {
  const router = Router();
  const requireAuth = createRequireAuth(db, secret);

  router.post('/auth/login', createLoginRateLimit(loginLimit), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ success: false, message: 'Enter your email and password.' });
      }
      const { email, password } = parsed.data;

      const admin = await db.admin.findUnique({ where: { email } });
      const usable = Boolean(admin && admin.isActive);
      // Always run one bcrypt comparison, whether or not the account exists.
      const matches = await verifyPassword(password, usable ? admin!.passwordHash : await getDummyHash());

      if (!usable || !matches) {
        await writeAudit(db, { action: 'LOGIN_FAILED', entity: 'Admin', ip: req.ip });
        return res.status(401).json({ success: false, message: 'Incorrect email or password.' });
      }

      await db.admin.update({ where: { id: admin!.id }, data: { lastLoginAt: new Date() } });
      await writeAudit(db, { action: 'LOGIN', entity: 'Admin', entityId: admin!.id, ip: req.ip, adminId: admin!.id });

      return res.json({
        success: true,
        token: signToken(admin!.id, admin!.role, secret, expiresIn),
        admin: publicAdmin(admin!),
      });
    } catch (err) {
      return next(err);
    }
  });

  router.get('/auth/me', requireAuth, (req: Request, res: Response) => {
    res.json({ success: true, admin: publicAdmin(req.admin!) });
  });

  router.post('/auth/change-password', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = changePasswordSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ success: false, message: 'Enter your current and new password.' });
      }
      const { currentPassword, newPassword } = parsed.data;

      const admin = await db.admin.findUnique({ where: { id: req.admin!.id } });
      if (!admin || !(await verifyPassword(currentPassword, admin.passwordHash))) {
        // 400, not 401: the person is signed in, they just typed the wrong current password.
        return res.status(400).json({ success: false, message: 'Your current password is not correct.' });
      }

      const problem = validatePassword(newPassword, admin.email);
      if (problem) return res.status(400).json({ success: false, message: problem });
      if (newPassword === currentPassword) {
        return res.status(400).json({ success: false, message: 'Choose a password different from your current one.' });
      }

      await db.admin.update({ where: { id: admin.id }, data: { passwordHash: await hashPassword(newPassword, rounds) } });
      await writeAudit(db, { action: 'PASSWORD_CHANGED', entity: 'Admin', entityId: admin.id, ip: req.ip, adminId: admin.id });
      return res.json({ success: true });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
