import { Router, Request, Response } from 'express';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
  return res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'MOMENTA Event Platform API',
    version: '1.0.0',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

export default router;
