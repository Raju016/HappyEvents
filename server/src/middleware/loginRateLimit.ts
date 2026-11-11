import rateLimit from 'express-rate-limit';

// Only failed attempts count: 10 wrong passwords per IP per 15 minutes.
export const createLoginRateLimit = (limit = 10) =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit,
    skipSuccessfulRequests: true,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many sign-in attempts. Please wait 15 minutes and try again.' },
  });
