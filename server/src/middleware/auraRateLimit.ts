import rateLimit from 'express-rate-limit';

// Chat is the costly endpoint: 25 messages per IP every 5 minutes.
export const auraRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 25,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'You are sending messages very quickly. Please wait a few minutes and try again.' },
});
