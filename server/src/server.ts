import { createApp } from './app';
import { env } from './config/env';

const app = createApp();
const PORT = Number(env.PORT) || 5000;

const server = app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`✨ MOMENTA API Server running on port ${PORT}`);
  console.log(`🚀 Mode: ${env.NODE_ENV}`);
  console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
  console.log(`=========================================`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
