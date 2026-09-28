import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apiRoutes from './routes';
import { errorHandler } from './middleware/errorHandler';

export const createApp = (): Application => {
  const app = express();

  // Security Middleware
  app.use(helmet());

  // CORS Configuration
  app.use(
    cors({
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // Body Parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Root welcome route
  app.get('/', (req: Request, res: Response) => {
    res.json({
      message: 'MOMENTA API - Events & Experiences Platform',
      version: '1.0.0',
      status: 'operational',
      docs: '/api/health',
    });
  });

  // Mount API endpoints
  app.use('/api', apiRoutes);

  // 404 Fallback
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: `Endpoint ${req.method} ${req.originalUrl} not found`,
    });
  });

  // Centralized Error Handling
  app.use(errorHandler);

  return app;
};

export default createApp;
