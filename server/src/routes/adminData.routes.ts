import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { createRequireAuth, requireRole } from '../middleware/requireAuth';
import { AdminDb, writeAudit } from '../services/adminDb';

export const ENQUIRY_STATUSES = [
  'NEW',
  'CONTACTED',
  'QUOTED',
  'CONFIRMED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
] as const;

const pagingSchema = z.object({
  page: z.coerce.number().int().min(1).max(10000).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  q: z.string().trim().max(100).optional(),
});

const messageQuerySchema = pagingSchema.extend({
  status: z.enum(['active', 'unread', 'read', 'archived', 'all']).default('active'),
});

const enquiryQuerySchema = pagingSchema.extend({
  status: z.enum(['all', ...ENQUIRY_STATUSES]).default('all'),
});

const idSchema = z.string().uuid();

const messagePatchSchema = z
  .object({ isRead: z.boolean().optional(), isArchived: z.boolean().optional() })
  .refine((v) => v.isRead !== undefined || v.isArchived !== undefined, { message: 'Nothing to update' });

const enquiryPatchSchema = z
  .object({
    status: z.enum(ENQUIRY_STATUSES).optional(),
    internalNotes: z.string().max(5000).nullable().optional(),
    assignedTo: z.string().trim().max(100).nullable().optional(),
  })
  .refine((v) => Object.keys(v).length > 0, { message: 'Nothing to update' });

const contains = (field: string, q: string) => ({ [field]: { contains: q, mode: 'insensitive' } });

const notFound = (res: Response) => res.status(404).json({ success: false, message: 'Not found.' });
const badRequest = (res: Response, message = 'That request could not be read.') =>
  res.status(400).json({ success: false, message });

const isRecordMissing = (err: unknown) => (err as { code?: string })?.code === 'P2025';

const paged = (items: unknown[], total: number, page: number, limit: number) => ({
  success: true,
  items,
  total,
  page,
  pageSize: limit,
  totalPages: Math.max(1, Math.ceil(total / limit)),
});

export const createAdminDataRouter = ({ db, secret }: { db: AdminDb; secret: string }) => {
  const router = Router();
  router.use('/admin', createRequireAuth(db, secret));

  const canDelete = requireRole('SUPER_ADMIN', 'ADMIN');

  // ---------- Overview ----------
  router.get('/admin/stats', async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const [unreadMessages, totalMessages, newEnquiries, totalEnquiries, enquiriesThisWeek, recentEnquiries, recentMessages] =
        await Promise.all([
          db.contactMessage.count({ where: { isRead: false, isArchived: false } }),
          db.contactMessage.count({ where: { isArchived: false } }),
          db.enquiry.count({ where: { status: 'NEW' } }),
          db.enquiry.count({}),
          db.enquiry.count({ where: { createdAt: { gte: weekAgo } } }),
          db.enquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
          db.contactMessage.findMany({ where: { isArchived: false }, orderBy: { createdAt: 'desc' }, take: 5 }),
        ]);
      res.json({
        success: true,
        stats: { unreadMessages, totalMessages, newEnquiries, totalEnquiries, enquiriesThisWeek },
        recentEnquiries,
        recentMessages,
      });
    } catch (err) {
      next(err);
    }
  });

  // ---------- Contact messages ----------
  router.get('/admin/messages', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = messageQuerySchema.safeParse(req.query);
      if (!parsed.success) return badRequest(res);
      const { page, limit, q, status } = parsed.data;

      const where: Record<string, unknown> = {};
      if (status === 'active') where.isArchived = false;
      if (status === 'unread') Object.assign(where, { isRead: false, isArchived: false });
      if (status === 'read') Object.assign(where, { isRead: true, isArchived: false });
      if (status === 'archived') where.isArchived = true;
      if (q) where.OR = [contains('name', q), contains('email', q), contains('phone', q), contains('message', q)];

      const [items, total] = await Promise.all([
        db.contactMessage.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit }),
        db.contactMessage.count({ where }),
      ]);
      res.json(paged(items, total, page, limit));
    } catch (err) {
      next(err);
    }
  });

  router.patch('/admin/messages/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = idSchema.safeParse(req.params.id);
      if (!id.success) return notFound(res);
      const body = messagePatchSchema.safeParse(req.body);
      if (!body.success) return badRequest(res);

      const data: Record<string, boolean> = {};
      if (body.data.isRead !== undefined) data.isRead = body.data.isRead;
      if (body.data.isArchived !== undefined) data.isArchived = body.data.isArchived;

      const item = await db.contactMessage.update({ where: { id: id.data }, data });
      res.json({ success: true, item });
    } catch (err) {
      if (isRecordMissing(err)) return notFound(res);
      next(err);
    }
  });

  router.delete('/admin/messages/:id', canDelete, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = idSchema.safeParse(req.params.id);
      if (!id.success) return notFound(res);
      await db.contactMessage.delete({ where: { id: id.data } });
      await writeAudit(db, { action: 'MESSAGE_DELETED', entity: 'ContactMessage', entityId: id.data, ip: req.ip, adminId: req.admin!.id });
      res.json({ success: true });
    } catch (err) {
      if (isRecordMissing(err)) return notFound(res);
      next(err);
    }
  });

  // ---------- Enquiries ----------
  router.get('/admin/enquiries', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = enquiryQuerySchema.safeParse(req.query);
      if (!parsed.success) return badRequest(res);
      const { page, limit, q, status } = parsed.data;

      const where: Record<string, unknown> = {};
      if (status !== 'all') where.status = status;
      if (q) {
        where.OR = [
          contains('enquiryNumber', q),
          contains('contactName', q),
          contains('contactEmail', q),
          contains('contactPhone', q),
          contains('eventType', q),
          contains('location', q),
        ];
      }

      const [items, total] = await Promise.all([
        db.enquiry.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit }),
        db.enquiry.count({ where }),
      ]);
      res.json(paged(items, total, page, limit));
    } catch (err) {
      next(err);
    }
  });

  router.get('/admin/enquiries/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = idSchema.safeParse(req.params.id);
      if (!id.success) return notFound(res);
      const item = await db.enquiry.findUnique({
        where: { id: id.data },
        include: { services: { include: { service: true } } },
      });
      if (!item) return notFound(res);

      const { services, ...rest } = item;
      res.json({
        success: true,
        item: {
          ...rest,
          services: (services ?? []).map((s: { service: { id: string; name: string; slug: string } }) => ({
            id: s.service.id,
            name: s.service.name,
            slug: s.service.slug,
          })),
        },
      });
    } catch (err) {
      next(err);
    }
  });

  router.patch('/admin/enquiries/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = idSchema.safeParse(req.params.id);
      if (!id.success) return notFound(res);
      const body = enquiryPatchSchema.safeParse(req.body);
      if (!body.success) return badRequest(res);

      const existing = await db.enquiry.findUnique({ where: { id: id.data } });
      if (!existing) return notFound(res);

      const data: Record<string, unknown> = {};
      if (body.data.status !== undefined) data.status = body.data.status;
      if (body.data.internalNotes !== undefined) data.internalNotes = body.data.internalNotes?.trim() || null;
      if (body.data.assignedTo !== undefined) data.assignedTo = body.data.assignedTo?.trim() || null;

      const item = await db.enquiry.update({ where: { id: id.data }, data });

      if (body.data.status !== undefined && body.data.status !== existing.status) {
        await writeAudit(db, {
          action: 'ENQUIRY_STATUS_UPDATED',
          entity: 'Enquiry',
          entityId: id.data,
          details: `${existing.status} -> ${body.data.status}`,
          ip: req.ip,
          adminId: req.admin!.id,
        });
      }
      if (body.data.internalNotes !== undefined) {
        await writeAudit(db, { action: 'ENQUIRY_NOTES_UPDATED', entity: 'Enquiry', entityId: id.data, ip: req.ip, adminId: req.admin!.id });
      }
      res.json({ success: true, item });
    } catch (err) {
      if (isRecordMissing(err)) return notFound(res);
      next(err);
    }
  });

  router.delete('/admin/enquiries/:id', canDelete, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = idSchema.safeParse(req.params.id);
      if (!id.success) return notFound(res);
      await db.enquiry.delete({ where: { id: id.data } });
      await writeAudit(db, { action: 'ENQUIRY_DELETED', entity: 'Enquiry', entityId: id.data, ip: req.ip, adminId: req.admin!.id });
      res.json({ success: true });
    } catch (err) {
      if (isRecordMissing(err)) return notFound(res);
      next(err);
    }
  });

  return router;
};
