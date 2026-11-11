import rateLimit from 'express-rate-limit';

// Public form endpoints: at most 10 submissions per IP every 15 minutes.
export const formRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many submissions. Please try again in a few minutes.' },
});
