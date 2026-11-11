import { Request, Response, NextFunction } from 'express';
import { AdminDb, AdminIdentity, AdminRoleName } from '../services/adminDb';
import { verifyToken } from '../services/adminAuth';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      admin?: AdminIdentity;
    }
  }
}

const unauthenticated = (res: Response) =>
  res.status(401).json({ success: false, message: 'Please sign in to continue.' });

export const createRequireAuth = (db: AdminDb, secret: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const header = req.headers.authorization;
      if (!header || !header.startsWith('Bearer ')) return unauthenticated(res);

      let adminId: string;
      try {
        adminId = verifyToken(header.slice(7).trim(), secret).adminId;
      } catch {
        return unauthenticated(res);
      }

      // Look the admin up every time, so a deactivated account loses access immediately.
      const admin = await db.admin.findUnique({ where: { id: adminId } });
      if (!admin || !admin.isActive) return unauthenticated(res);

      req.admin = { id: admin.id, email: admin.email, name: admin.name, role: admin.role };
      return next();
    } catch (err) {
      return next(err);
    }
  };

export const requireRole = (...roles: AdminRoleName[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (req.admin && roles.includes(req.admin.role)) return next();
    return res.status(403).json({ success: false, message: 'You do not have permission to do that.' });
  };
