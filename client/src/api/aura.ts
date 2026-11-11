import { apiClient } from './client';
import type { EventProfile } from '@/components/aura/auraBrief';

export type AuraRoute =
  | '/'
  | '/events'
  | '/services'
  | '/work'
  | '/reviews'
  | '/about'
  | '/contact'
  | '/plan-your-event';

export interface AuraApiMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AuraReply {
  reply: string;
  profile: EventProfile;
  navigate: AuraRoute | null;
  briefReady: boolean;
}

const ROUTES: AuraRoute[] = ['/', '/events', '/services', '/work', '/reviews', '/about', '/contact', '/plan-your-event'];

/** Turns low-level errors into something a visitor can understand. */
export const friendlyAuraError = (error: unknown) => {
  const message = error instanceof Error ? error.message : '';
  if (/network error/i.test(message)) return "I can't reach our server right now. Please check your connection and try again.";
  if (/timeout/i.test(message)) return 'That took longer than expected. Please try again.';
  return message || 'Something went wrong. Please try again.';
};

export const sendAuraMessage = async (messages: AuraApiMessage[], profile: EventProfile): Promise<AuraReply> => {
  const response = await apiClient.post('/aura/chat', { messages, profile }, { timeout: 30000 });
  const data = response.data as Partial<AuraReply> & { success?: boolean };
  if (!data || typeof data.reply !== 'string' || !data.reply) {
    throw new Error('Aura sent an unreadable reply. Please try again.');
  }
  return {
    reply: data.reply,
    profile: data.profile && typeof data.profile === 'object' ? data.profile : profile,
    // Re-check on the client too: only known internal pages are ever offered.
    navigate: ROUTES.includes(data.navigate as AuraRoute) ? (data.navigate as AuraRoute) : null,
    briefReady: Boolean(data.briefReady),
  };
};
