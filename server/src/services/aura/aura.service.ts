import Groq from 'groq-sdk';
import { getGroqConfig, isGroqConfigured } from '../../config/groq';
import { buildProfileMessage, buildSystemPrompt } from './prompt';
import {
  ALLOWED_ROUTES,
  AllowedRoute,
  AuraRequest,
  AuraResult,
  EventProfile,
  PROFILE_FIELDS,
  cleanText,
  modelOutputSchema,
  profileSchema,
} from './schema';

export type AuraErrorCode = 'unavailable' | 'rate_limited' | 'timeout' | 'bad_response' | 'upstream';

export class AuraError extends Error {
  constructor(public code: AuraErrorCode, public statusCode: number, message: string) {
    super(message);
  }
}

// The slice of the Groq client we use, so tests can pass a fake.
export interface ChatClient {
  chat: {
    completions: {
      create: (
        body: Record<string, unknown>,
        options?: { timeout?: number; maxRetries?: number }
      ) => Promise<{ choices: { message?: { content?: string | null } }[] }>;
    };
  };
}

/** Merge model updates into the profile. null removes a field; blanks are ignored. */
export const mergeProfile = (current: EventProfile, updates: Record<string, string | null | undefined>) => {
  const next: EventProfile = { ...current };
  for (const field of PROFILE_FIELDS) {
    if (!(field in updates)) continue;
    const value = updates[field];
    if (value === null) delete next[field];
    else if (typeof value === 'string' && value.trim() !== '') next[field] = value;
  }
  return next;
};

const isAllowedRoute = (value: unknown): value is AllowedRoute =>
  typeof value === 'string' && (ALLOWED_ROUTES as readonly string[]).includes(value);

/** Turn raw model text into a trusted result, or a safe plain-text fallback. */
export const parseModelOutput = (raw: string, currentProfile: EventProfile): AuraResult => {
  const tryParse = (text: string): unknown => {
    try {
      return JSON.parse(text);
    } catch {
      return undefined;
    }
  };

  let candidate = tryParse(raw);
  if (candidate === undefined) {
    const start = raw.indexOf('{');
    const end = raw.lastIndexOf('}');
    if (start !== -1 && end > start) candidate = tryParse(raw.slice(start, end + 1));
  }

  const validated = modelOutputSchema.safeParse(candidate);
  if (validated.success) {
    const { reply, profileUpdates, navigate, briefReady } = validated.data;
    return {
      reply: cleanText(reply, 1500),
      profile: mergeProfile(currentProfile, profileUpdates as Record<string, string | null | undefined>),
      navigate: isAllowedRoute(navigate) ? navigate : null,
      briefReady: Boolean(briefReady),
    };
  }

  // Invalid structure: never act on it. Show plain text only if it is not JSON-looking.
  const plain = cleanText(raw, 1500);
  if (plain && !plain.startsWith('{') && !plain.startsWith('[')) {
    return { reply: plain, profile: currentProfile, navigate: null, briefReady: false };
  }
  throw new AuraError('bad_response', 502, 'Aura could not form a response. Please try again.');
};

const mapProviderError = (err: unknown): AuraError => {
  if (err instanceof AuraError) return err;
  const e = err as { status?: number; name?: string; code?: string; message?: string };
  if (e?.name === 'APIConnectionTimeoutError' || e?.name === 'AbortError' || e?.code === 'ETIMEDOUT') {
    return new AuraError('timeout', 504, 'Aura took too long to respond. Please try again.');
  }
  if (e?.status === 401 || e?.status === 403 || e?.status === 404) {
    // Bad key or unknown model: a setup problem, not something the visitor can fix.
    return new AuraError('unavailable', 503, 'Aura is not available right now.');
  }
  if (e?.status === 429) {
    return new AuraError('rate_limited', 429, 'Aura is very busy right now. Please try again in a moment.');
  }
  return new AuraError('upstream', 502, 'Aura could not respond right now. Please try again.');
};

export const createAuraService = (
  deps: { client?: ChatClient; getConfig?: typeof getGroqConfig; isConfigured?: () => boolean } = {}
) => {
  const getConfig = deps.getConfig ?? getGroqConfig;
  const isConfigured = deps.isConfigured ?? isGroqConfigured;
  let cachedClient: ChatClient | undefined = deps.client;

  const getClient = (): ChatClient => {
    if (cachedClient) return cachedClient;
    cachedClient = new Groq({ apiKey: getConfig().apiKey, maxRetries: 0 }) as unknown as ChatClient;
    return cachedClient;
  };

  const chat = async (request: AuraRequest): Promise<AuraResult> => {
    if (!isConfigured()) {
      throw new AuraError('unavailable', 503, 'Aura is not available right now.');
    }

    const profile = profileSchema.parse(request.profile ?? {});
    const currentProfile: EventProfile = {};
    for (const field of PROFILE_FIELDS) {
      const v = profile[field];
      if (typeof v === 'string' && v) currentProfile[field] = v;
    }

    const { model, timeoutMs } = getConfig();
    const messages = [
      { role: 'system', content: buildSystemPrompt() },
      { role: 'system', content: buildProfileMessage(currentProfile) },
      ...request.messages.map((m) => ({ role: m.role, content: m.content })),
    ];

    try {
      const completion = await getClient().chat.completions.create(
        {
          model,
          messages,
          temperature: 0.5,
          max_tokens: 700,
          response_format: { type: 'json_object' },
        },
        { timeout: timeoutMs, maxRetries: 0 }
      );
      const raw = completion.choices?.[0]?.message?.content ?? '';
      if (!raw.trim()) throw new AuraError('bad_response', 502, 'Aura could not form a response. Please try again.');
      return parseModelOutput(raw, currentProfile);
    } catch (err) {
      const mapped = mapProviderError(err);
      // Log the kind of failure only: never keys and never the customer's messages.
      console.error(`[aura] ${mapped.code} (provider status: ${(err as { status?: number })?.status ?? 'n/a'})`);
      throw mapped;
    }
  };

  return { chat, isAvailable: isConfigured };
};

export type AuraService = ReturnType<typeof createAuraService>;
