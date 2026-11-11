import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';
import { formRateLimit } from '../middleware/rateLimit';
import { notifyNewContact } from '../services/mail.service';

const router = Router();

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(8).max(25),
  email: z.string().trim().email().max(150),
  eventType: z.string().trim().max(100).optional(),
  eventDate: z.string().trim().optional(),
  location: z.string().trim().max(150).optional(),
  message: z.string().trim().min(10).max(5000),
});

router.post('/contact', formRateLimit, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: 'Please check the form and try again.' });
    }
    const data = parsed.data;

    const eventDate = data.eventDate ? new Date(data.eventDate) : null;
    const validDate = eventDate && !Number.isNaN(eventDate.getTime()) ? eventDate : null;

    // Save first, so the lead is never lost even if email fails.
    const saved = await prisma.contactMessage.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email.toLowerCase(),
        eventType: data.eventType || null,
        eventDate: validDate,
        location: data.location || null,
        message: data.message,
      },
    });

    await notifyNewContact({
      name: data.name,
      phone: data.phone,
      email: data.email,
      eventType: data.eventType,
      eventDate: data.eventDate,
      location: data.location,
      message: data.message,
    });

    return res.status(201).json({ success: true, id: saved.id });
  } catch (err) {
    return next(err);
  }
});

export default router;
