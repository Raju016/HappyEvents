import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ClipboardList,
  Copy,
  ExternalLink,
  RotateCcw,
  Send,
  Sparkles,
  X,

} from 'lucide-react';
import { SITE_CONTACT } from '@/data/siteConfig';
import { AuraRoute, friendlyAuraError, sendAuraMessage } from '@/api/aura';
import AuraBriefCard from './AuraBriefCard';
import {
  EventProfile,
  ProfileField,
  buildWhatsAppUrl,
  filledFields,
  formatBriefText,
} from './auraBrief';
import './AuraConcierge.css';

interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  navigate?: AuraRoute | null;
  isWelcome?: boolean;
}

type View = 'chat' | 'brief' | 'handoff';

const WELCOME =
  "Welcome to HappyEvents! I'm Aura, your personal event concierge. Let's create something beautiful together. How can I help you plan your special occasion?";

const SUGGESTIONS: { label: string; prompt: string }[] = [
  { label: 'Plan a wedding', prompt: "I'd like to plan a wedding." },
  { label: 'Plan a birthday', prompt: "I'd like to plan a birthday celebration." },
  { label: 'Organize a corporate event', prompt: "I'd like to organize a corporate event." },
  { label: 'Explore event themes', prompt: 'Can you suggest some event themes?' },
  { label: 'Customize my event', prompt: "I'd like to customize my event." },
  { label: 'Ask about HappyEvents services', prompt: 'What services does HappyEvents offer?' },
];

const ROUTE_LABELS: Record<AuraRoute, string> = {
  '/': 'Home',
  '/events': 'Events',
  '/services': 'Services',
  '/work': 'Our Work',
  '/reviews': 'Reviews',
  '/about': 'About',
  '/contact': 'Contact',
  '/plan-your-event': 'Plan Your Event',
};

const MAX_INPUT = 800;
const HISTORY_LIMIT = 16;

/** Mirrors the WhatsApp button's footer avoidance so the two never collide. */
const useFooterOffset = () => {
  const [offset, setOffset] = useState(24);
  useEffect(() => {
    const update = () => {
      const footer = document.querySelector('footer');
      if (!footer) return setOffset(24);
      const top = footer.getBoundingClientRect().top;
      setOffset(top < window.innerHeight ? Math.max(24, window.innerHeight - top + 24) : 24);
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return offset;
};

export const AuraConcierge: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const footerOffset = useFooterOffset();

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, role: 'assistant', text: WELCOME, isWelcome: true },
  ]);
  const [profile, setProfile] = useState<EventProfile>({});
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [briefReady, setBriefReady] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [briefError, setBriefError] = useState<string | null>(null);
  const [handoff, setHandoff] = useState<{ text: string; url: string; blocked: boolean } | null>(null);
  const [copied, setCopied] = useState(false);

  const idRef = useRef(1);
  const requestRef = useRef(0);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLTextAreaElement>(null);

  const bottom = footerOffset + 72; // WhatsApp button (56px) + 16px gap
  const filledCount = filledFields(profile).length;

  const close = useCallback(() => {
    setOpen(false);
    setConfirmReset(false);
    launcherRef.current?.focus();
  }, []);

  // Move focus into the panel when it opens.
  useEffect(() => {
    if (open && view === 'chat') inputRef.current?.focus();
  }, [open, view]);

  // Keep the newest message in view.
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading, error, view, open]);

  const request = useCallback(
    async (history: ChatMessage[], currentProfile: EventProfile) => {
      const requestId = ++requestRef.current;
      setLoading(true);
      setError(null);
      try {
        const payload = history
          .filter((m) => !m.isWelcome)
          .slice(-HISTORY_LIMIT)
          .map((m) => ({ role: m.role, content: m.text }));
        const result = await sendAuraMessage(payload, currentProfile);
        if (requestId !== requestRef.current) return; // conversation was reset meanwhile
        setMessages((prev) => [
          ...prev,
          { id: idRef.current++, role: 'assistant', text: result.reply, navigate: result.navigate },
        ]);
        setProfile(result.profile);
        setBriefReady(result.briefReady);
      } catch (err) {
        if (requestId !== requestRef.current) return;
        setError(friendlyAuraError(err));
      } finally {
        if (requestId === requestRef.current) setLoading(false);
      }
    },
    []
  );

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim().slice(0, MAX_INPUT);
      if (!text || loading) return;
      const next = [...messages, { id: idRef.current++, role: 'user' as const, text }];
      setMessages(next);
      setInput('');
      if (inputRef.current) inputRef.current.style.height = 'auto';
      void request(next, profile);
    },
    [loading, messages, profile, request]
  );

  const reset = () => {
    requestRef.current++;
    setMessages([{ id: idRef.current++, role: 'assistant', text: WELCOME, isWelcome: true }]);
    setProfile({});
    setBriefReady(false);
    setError(null);
    setLoading(false);
    setInput('');
    setView('chat');
    setHandoff(null);
    setBriefError(null);
    setConfirmReset(false);
  };

  const updateField = (field: ProfileField, value: string) => {
    setProfile((prev) => {
      const next = { ...prev };
      if (value.trim() === '') delete next[field];
      else next[field] = value;
      return next;
    });
    setBriefError(null);
  };

  const prepareWhatsApp = () => {
    if (filledFields(profile).length === 0) {
      setBriefError('Add at least one detail, such as your event type, before preparing a message.');
      return;
    }
    const text = formatBriefText(profile);
    const url = buildWhatsAppUrl(SITE_CONTACT.whatsappNumber, text);
    // Opened only because the customer just clicked. They press Send themselves.
    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    setHandoff({ text, url, blocked: !opened });
    setCopied(false);
    setBriefError(null);
    setView('handoff');
  };

  const copyMessage = async () => {
    if (!handoff) return;
    try {
      await navigator.clipboard.writeText(handoff.text);
    } catch {
      previewRef.current?.select();
      document.execCommand?.('copy');
    }
    setCopied(true);
  };

  const followLink = (route: AuraRoute) => {
    navigate(route);
    if (window.innerWidth < 641) setOpen(false);
  };

  // Escape closes; Tab stays inside the panel.
  const onPanelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      close();
      return;
    }
    if (e.key !== 'Tab' || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), textarea:not([disabled]), input:not([disabled]), a[href]'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (location.pathname.startsWith('/admin')) return null;

  const showSuggestions = messages.length === 1 && !loading;
  const lastMessage = messages[messages.length - 1];

  return (
    <div className="aura-root">
      {!open && (
        <button
          ref={launcherRef}
          type="button"
          className="aura-launcher"
          style={{ bottom }}
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
        >
          <Sparkles size={17} aria-hidden />
          Plan Your Event with Aura
        </button>
      )}

      {open && (
        <div
          ref={panelRef}
          className="aura-panel"
          style={{ bottom, height: `min(620px, calc(100vh - ${bottom + 20}px))` }}
          role="dialog"
          aria-label="Aura, your HappyEvents AI concierge"
          onKeyDown={onPanelKeyDown}
        >
          <header className="aura-header">
            <div className="aura-avatar" aria-hidden>
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="aura-title aura-serif">Aura</h2>
              <p className="aura-subtitle">Your HappyEvents AI Concierge</p>
            </div>
            <div className="aura-header-actions">
              {view === 'chat' && (
                <button
                  type="button"
                  className="aura-icon-btn"
                  onClick={() => setView('brief')}
                  aria-label={`View my event brief (${filledCount} details)`}
                  title="View my event brief"
                >
                  <ClipboardList size={18} aria-hidden />
                  {filledCount > 0 && <span className="aura-badge">{filledCount}</span>}
                </button>
              )}
              <button
                type="button"
                className="aura-icon-btn"
                onClick={() => setConfirmReset((v) => !v)}
                aria-label="Start a new conversation"
                title="New conversation"
              >
                <RotateCcw size={17} aria-hidden />
              </button>
              <button type="button" className="aura-icon-btn" onClick={close} aria-label="Close Aura">
                <X size={19} aria-hidden />
              </button>
            </div>
          </header>

          {confirmReset && (
            <div className="aura-reset-confirm" role="alert">
              <span>Start over? This clears the chat and your event details.</span>
              <button type="button" className="is-primary" onClick={reset}>
                Start over
              </button>
              <button type="button" onClick={() => setConfirmReset(false)}>
                Keep
              </button>
            </div>
          )}

          {view === 'chat' && (
            <>
              <div
                ref={bodyRef}
                className="aura-body"
                role="log"
                aria-live="polite"
                aria-relevant="additions"
                aria-label="Conversation with Aura"
              >
                {messages.map((m) => (
                  <React.Fragment key={m.id}>
                    <div className={`aura-msg aura-msg--${m.role}`}>{m.text}</div>
                    {m.role === 'assistant' && m.navigate && (
                      <button
                        type="button"
                        className="aura-chip aura-chip--link"
                        onClick={() => followLink(m.navigate as AuraRoute)}
                      >
                        Open {ROUTE_LABELS[m.navigate]}
                        <ArrowRight size={14} aria-hidden />
                      </button>
                    )}
                  </React.Fragment>
                ))}

                {showSuggestions && (
                  <div className="aura-chip-row" aria-label="Suggested prompts">
                    {SUGGESTIONS.map((s) => (
                      <button key={s.label} type="button" className="aura-chip" onClick={() => send(s.prompt)}>
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}

                {loading && (
                  <div className="aura-typing" role="status" aria-label="Aura is typing">
                    <span />
                    <span />
                    <span />
                  </div>
                )}

                {error && !loading && (
                  <div className="aura-error" role="alert">
                    <span>{error}</span>
                    <button type="button" onClick={() => void request(messages, profile)}>
                      Retry
                    </button>
                  </div>
                )}
              </div>

              <div className="aura-footer">
                {briefReady && lastMessage?.role === 'assistant' && (
                  <div className="aura-brief-cta">
                    <span>Your event brief is ready to review.</span>
                    <button type="button" onClick={() => setView('brief')}>
                      View my event brief
                    </button>
                  </div>
                )}
                <form
                  className="aura-input-row"
                  onSubmit={(e) => {
                    e.preventDefault();
                    send(input);
                  }}
                >
                  <label htmlFor="aura-input" className="aura-sr-only">
                    Message Aura
                  </label>
                  <textarea
                    id="aura-input"
                    ref={inputRef}
                    className="aura-textarea"
                    rows={1}
                    maxLength={MAX_INPUT}
                    value={input}
                    placeholder="Tell Aura about your event…"
                    onChange={(e) => {
                      setInput(e.target.value);
                      e.target.style.height = 'auto';
                      e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        send(input);
                      }
                    }}
                  />
                  <button
                    type="submit"
                    className="aura-send"
                    disabled={loading || input.trim() === ''}
                    aria-label="Send message"
                  >
                    <Send size={17} aria-hidden />
                  </button>
                </form>
                <p className="aura-privacy">
                  Aura is an AI assistant and can make mistakes. It can&apos;t confirm prices, dates or bookings.
                  This chat isn&apos;t saved.
                </p>
              </div>
            </>
          )}

          {view === 'brief' && (
            <AuraBriefCard
              profile={profile}
              error={briefError}
              onChange={updateField}
              onContinue={() => setView('chat')}
              onPrepare={prepareWhatsApp}
            />
          )}

          {view === 'handoff' && handoff && (
            <div className="aura-sheet">
              <p className="aura-notice" role="status">
                {handoff.blocked
                  ? 'Your browser blocked WhatsApp from opening. Use "Open WhatsApp" below, or copy the message.'
                  : 'WhatsApp should now be open with your message ready.'}{' '}
                <strong>Nothing has been sent yet.</strong> Check the message there and press Send yourself.
              </p>
              <label htmlFor="aura-preview" className="aura-sr-only">
                Your WhatsApp message
              </label>
              <textarea
                id="aura-preview"
                ref={previewRef}
                className="aura-preview"
                readOnly
                value={handoff.text}
              />
              <div className="aura-actions">
                <div className="aura-actions-row">
                  <a
                    className="aura-btn aura-btn--primary"
                    href={handoff.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={15} aria-hidden />
                    Open WhatsApp
                  </a>
                  <button type="button" className="aura-btn" onClick={() => void copyMessage()}>
                    <Copy size={15} aria-hidden />
                    {copied ? 'Copied' : 'Copy message'}
                  </button>
                </div>
                <button type="button" className="aura-btn" onClick={() => setView('brief')}>
                  <ChevronLeft size={15} aria-hidden />
                  Back to my details
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AuraConcierge;
