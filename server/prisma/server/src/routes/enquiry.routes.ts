import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../config/prisma';
import { formRateLimit } from '../middleware/rateLimit';
import { notifyNewEnquiry } from '../services/mail.service';

const router = Router();

const enquirySchema = z.object({
  eventType: z.string().trim().min(1).max(100),
  services: z.array(z.string().trim().max(100)).min(1).max(20),
  eventDate: z.string().trim().optional(),
  location: z.string().trim().min(1).max(150),
  guestCount: z.union([z.string(), z.number()]).optional(),
  budgetRange: z.string().trim().max(100).optional(),
  contactName: z.string().trim().min(2).max(100),
  contactEmail: z.string().trim().email().max(150),
  contactPhone: z.string().trim().min(8).max(25),
  specialNotes: z.string().trim().max(5000).optional(),
});

const newEnquiryNumber = () =>
  `EVT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1_000_000)).padStart(6, '0')}`;

router.post('/enquiries', formRateLimit, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = enquirySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: 'Please check the form and try again.' });
    }
    const data = parsed.data;

    const eventDate = data.eventDate ? new Date(data.eventDate) : null;
    const validDate = eventDate && !Number.isNaN(eventDate.getTime()) ? eventDate : null;

    const guestNumber = data.guestCount !== undefined && data.guestCount !== '' ? parseInt(String(data.guestCount), 10) : NaN;
    const guestCount = Number.isFinite(guestNumber) && guestNumber > 0 ? guestNumber : null;

    // Link to Service rows when they exist in the database.
    type ServiceRow = { id: string; slug: string; name: string };
    const knownServices: ServiceRow[] = await prisma.service.findMany({
      where: { slug: { in: data.services } },
      select: { id: true, slug: true, name: true },
    });
    const nameBySlug = new Map<string, string>(knownServices.map((s: ServiceRow) => [s.slug, s.name]));
    const serviceLabels: string[] = data.services.map((slug) => nameBySlug.get(slug) ?? slug);

    // Keep the requested services in the notes too, so nothing is lost
    // when the Service table has not been filled in yet.
    const notes = [data.specialNotes, `Services requested: ${serviceLabels.join(', ')}`]
      .filter(Boolean)
      .join('\n\n');

    let saved = null;
    for (let attempt = 0; attempt < 5 && !saved; attempt++) {
      try {
        saved = await prisma.enquiry.create({
          data: {
            enquiryNumber: newEnquiryNumber(),
            eventType: data.eventType,
            eventDate: validDate,
            location: data.location,
            guestCount,
            budgetRange: data.budgetRange || null,
            specialNotes: notes,
            contactName: data.contactName,
            contactEmail: data.contactEmail.toLowerCase(),
            contactPhone: data.contactPhone,
            services: { create: knownServices.map((s: ServiceRow) => ({ serviceId: s.id })) },
          },
        });
      } catch (err: unknown) {
        // P2002 = unique constraint (enquiry number collision): try a new number.
        if ((err as { code?: string }).code !== 'P2002') throw err;
      }
    }
    if (!saved) {
      return res.status(500).json({ success: false, message: 'Could not save your enquiry. Please try again.' });
    }

    await notifyNewEnquiry({
      enquiryNumber: saved.enquiryNumber,
      contactName: data.contactName,
      contactPhone: data.contactPhone,
      contactEmail: data.contactEmail,
      eventType: data.eventType,
      eventDate: data.eventDate,
      location: data.location,
      guestCount,
      budgetRange: data.budgetRange,
      services: serviceLabels,
      specialNotes: data.specialNotes,
    });

    return res.status(201).json({ success: true, enquiryNumber: saved.enquiryNumber });
  } catch (err) {
    return next(err);
  }
});

export default router;
