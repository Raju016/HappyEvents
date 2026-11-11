import { Router } from 'express';
import prisma from '../config/prisma';
import { env } from '../config/env';
import { AdminDb } from '../services/adminDb';
import { assertSecureSecret } from '../services/adminAuth';
import { createAuthRouter } from './auth.routes';
import { createAdminDataRouter } from './adminData.routes';

// Fails fast in production if JWT_SECRET is still the development default.
assertSecureSecret(env.JWT_SECRET, env.NODE_ENV);

const db = prisma as unknown as AdminDb;
const secret = env.JWT_SECRET;

const router = Router();
router.use('/', createAuthRouter({ db, secret, expiresIn: process.env.ADMIN_JWT_EXPIRES_IN || '12h' }));
router.use('/', createAdminDataRouter({ db, secret }));

export default router;
