import { Router, Request, Response, NextFunction } from 'express';
import { auraRateLimit } from '../middleware/auraRateLimit';
import { AuraError, AuraService, createAuraService } from '../services/aura/aura.service';
import { MAX_MESSAGE_LENGTH, requestSchema } from '../services/aura/schema';

export const createAuraRouter = (service: AuraService = createAuraService()) => {
  const router = Router();

  // Lets the widget show a friendly state when the AI key has not been set up.
  router.get('/aura/status', (_req: Request, res: Response) => {
    res.json({ success: true, available: service.isAvailable() });
  });

  router.post('/aura/chat', auraRateLimit, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = requestSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ success: false, message: 'That message could not be read. Please try again.' });
      }

      const last = parsed.data.messages[parsed.data.messages.length - 1];
      if (last.role !== 'user') {
        return res.status(400).json({ success: false, message: 'That message could not be read. Please try again.' });
      }
      if (last.content.length > MAX_MESSAGE_LENGTH) {
        return res.status(400).json({
          success: false,
          message: `Please keep messages under ${MAX_MESSAGE_LENGTH} characters.`,
        });
      }

      const result = await service.chat(parsed.data);
      return res.json({ success: true, ...result });
    } catch (err) {
      if (err instanceof AuraError) {
        return res.status(err.statusCode).json({ success: false, code: err.code, message: err.message });
      }
      return next(err);
    }
  });

  return router;
};

export default createAuraRouter();
