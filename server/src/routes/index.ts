import { Router } from 'express';
import healthRoutes from './health.routes';
import contactRoutes from './contact.routes';
import enquiryRoutes from './enquiry.routes';
import auraRoutes from './aura.routes';
import adminRoutes from './admin.routes';

const router = Router();

// Mount health routes
router.use('/', healthRoutes);

// Public form submissions (saved to the database and emailed to ADMIN_EMAIL)
router.use('/', contactRoutes);
router.use('/', enquiryRoutes);

// Aura AI concierge (Groq). The API key stays on the server.
router.use('/', auraRoutes);

// Admin panel: sign-in, enquiries and messages (protected by JWT)
router.use('/', adminRoutes);

export default router;
