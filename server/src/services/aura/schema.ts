import { z } from 'zod';

// Pages Aura is allowed to point visitors to. Anything else is dropped.
export const ALLOWED_ROUTES = [
  '/',
  '/events',
  '/services',
  '/work',
  '/reviews',
  '/about',
  '/contact',
  '/plan-your-event',
] as const;
export type AllowedRoute = (typeof ALLOWED_ROUTES)[number];

export const PROFILE_FIELDS = [
  'eventType',
  'preferredDate',
  'city',
  'venue',
  'guestCount',
  'budget',
  'theme',
  'colorPalette',
  'decor',
  'catering',
  'entertainment',
  'specialRequests',
  'customerName',
  'customerContact',
] as const;
export type ProfileField = (typeof PROFILE_FIELDS)[number];

export const MAX_FIELD_LENGTH = 300;
export const MAX_MESSAGE_LENGTH = 800;
export const MAX_MESSAGES = 20;

// Strip control characters and collapse whitespace.
export const cleanText = (value: string, max = MAX_FIELD_LENGTH) =>
  value
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);

const profileValue = z.string().transform((v) => cleanText(v));

// Every field is optional and nullable: nothing is assumed until the customer says it.
export const profileSchema = z
  .object(
    Object.fromEntries(PROFILE_FIELDS.map((f) => [f, profileValue.nullable().optional()])) as Record<
      ProfileField,
      z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>>
    >
  )
  .strip();

export type EventProfile = Partial<Record<ProfileField, string>>;

export const requestSchema = z.object({
  messages: z
    .array(
      z.object({
        // "system" is deliberately not accepted from the browser.
        role: z.enum(['user', 'assistant']),
        content: z.string().min(1).max(MAX_MESSAGE_LENGTH * 2),
      })
    )
    .min(1)
    .max(MAX_MESSAGES),
  profile: profileSchema.optional(),
});

export type AuraRequest = z.infer<typeof requestSchema>;

// What we accept back from the model before trusting any of it.
export const modelOutputSchema = z.object({
  reply: z.string().min(1),
  profileUpdates: profileSchema.optional().default({}),
  navigate: z.string().nullable().optional(),
  briefReady: z.boolean().optional().default(false),
});

export interface AuraResult {
  reply: string;
  profile: EventProfile;
  navigate: AllowedRoute | null;
  briefReady: boolean;
}
