/* eslint-disable @typescript-eslint/no-explicit-any */
// The small slice of the Prisma client the admin panel uses. Routes depend on
// this shape (not on Prisma directly) so they can be tested with a stand-in.
export interface Delegate {
  findMany(args?: any): Promise<any[]>;
  findUnique(args: any): Promise<any | null>;
  count(args?: any): Promise<number>;
  update(args: any): Promise<any>;
  delete(args: any): Promise<any>;
  create(args: any): Promise<any>;
}

export interface AdminDb {
  admin: Delegate;
  contactMessage: Delegate;
  enquiry: Delegate;
  auditLog: Delegate;
}

export type AdminRoleName = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';

export interface AdminIdentity {
  id: string;
  email: string;
  name: string;
  role: AdminRoleName;
}

export interface AuditEntry {
  action: string;
  entity: string;
  entityId?: string;
  details?: string;
  ip?: string;
  adminId?: string;
}

/** Audit logging must never break the request it describes. */
export const writeAudit = async (db: AdminDb, entry: AuditEntry) => {
  try {
    await db.auditLog.create({
      data: {
        action: entry.action,
        entity: entry.entity,
        entityId: entry.entityId ?? null,
        details: entry.details ?? null,
        ipAddress: entry.ip ?? null,
        adminId: entry.adminId ?? null,
      },
    });
  } catch (err) {
    console.error('[audit] could not write audit entry:', (err as { code?: string })?.code ?? 'unknown');
  }
};
