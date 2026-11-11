import React, { useEffect, useRef, useState } from 'react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2 } from 'lucide-react';
import { EVENT_CATEGORIES } from '@/data/mockData';
import { submitContact } from '@/api/forms';

// Mirrors the server's ContactMessage model (name, phone, email, eventType, eventDate, location, message)
const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email'),
  eventType: z.string().optional(),
  eventDate: z.string().optional(),
  location: z.string().optional(),
  message: z.string().min(10, 'Tell us a little more about your event'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// Floating-label engraved-line field. Uses the placeholder-shown trick so the
// label rests on the line until the field has content or focus, then rises —
// like a name being written onto a card.
const EngravedField: React.FC<{
  label: string;
  error?: string;
  as?: 'input' | 'textarea';
  rows?: number;
  registration: UseFormRegisterReturn;
} & React.InputHTMLAttributes<HTMLInputElement>> = ({
  label,
  error,
  as = 'input',
  rows,
  registration,
  className,
  ...rest
}) => {
    const Tag = as as 'input';
    return (
      <div className="relative">
        <Tag
          {...registration}
          {...(rest as any)}
          rows={rows}
          placeholder=" "
          className={`peer w-full bg-transparent border-0 border-b border-brand-gold/25 focus:border-brand-gold px-0.5 pt-5 pb-2 text-sm text-brand-ivory placeholder-transparent focus:outline-none transition-colors font-sans resize-none ${className || ''}`}
        />
        <label
          className="absolute left-0.5 top-5 text-sm text-brand-muted font-sans transition-all duration-200 pointer-events-none
          peer-focus:top-0 peer-focus:text-[11px] peer-focus:tracking-widest peer-focus:uppercase peer-focus:text-brand-gold
          peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-[11px] peer-[&:not(:placeholder-shown)]:tracking-widest peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:text-brand-cream/60"
        >
          {label}
        </label>
        {error && <p className="text-[11px] text-red-400/90 mt-1.5 font-sans">{error}</p>}
      </div>
    );
  };

export const InvitationForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [sheen, setSheen] = useState({ x: 50, y: 50, active: false });
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  useEffect(() => {
    reducedMotion.current =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion.current || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ ry: (px - 0.5) * 12, rx: -(py - 0.5) * 12 });
    setSheen({ x: px * 100, y: py * 100, active: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setSheen((s) => ({ ...s, active: false }));
  };

  const onSubmit = async (data: ContactFormValues) => {
    setServerError(null);
    try {
      await submitContact(data);
      setSubmitted(true);
      reset();
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or contact us on WhatsApp.'
      );
    }
  };

  return (
    <div
      className="relative mx-auto max-w-xl"
      style={{ perspective: '1800px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient backdrop glow, sits behind the card in normal document flow */}
      <div className="absolute -inset-10 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-brand-gold/5 rounded-full blur-3xl" />
      </div>

      {/* Tilting card */}
      <div
        ref={cardRef}
        style={{
          transformStyle: 'preserve-3d',
          transform: mounted
            ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
            : 'rotateX(-16deg) rotateY(0deg) translateY(24px) scale(0.96)',
          opacity: mounted ? 1 : 0,
          transition: mounted
            ? 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1)'
            : 'transform 900ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms ease-out',
        }}
        className="relative rounded-sm"
      >
        {/* Base panel */}
        <div
          className="relative rounded-sm bg-brand-charcoal border border-brand-gold/30 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] px-8 py-10 md:px-12 md:py-12"
          style={{ transform: 'translateZ(0px)' }}
        >
          {/* Inner hairline frame — double-border engraved look */}
          <div className="absolute inset-3 border border-brand-gold/15 pointer-events-none rounded-sm" />

          {/* Cursor-tracking foil sheen */}
          <div
            className="absolute inset-0 pointer-events-none rounded-sm transition-opacity duration-300"
            style={{
              opacity: sheen.active ? 0.5 : 0,
              background: `radial-gradient(circle at ${sheen.x}% ${sheen.y}%, rgba(223,192,127,0.35), transparent 45%)`,
              mixBlendMode: 'overlay',
              transform: 'translateZ(2px)',
            }}
          />

          {/* Corner flourishes — pop furthest off the surface */}
          {[
            'top-3 left-3',
            'top-3 right-3 rotate-90',
            'bottom-3 left-3 -rotate-90',
            'bottom-3 right-3 rotate-180',
          ].map((pos, i) => (
            <svg
              key={i}
              className={`absolute ${pos} w-4 h-4 text-brand-gold/50 pointer-events-none`}
              style={{ transform: `${pos.includes('rotate') ? '' : ''} translateZ(50px)` }}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M2 2 L2 9 M2 2 L9 2"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          ))}

          {/* Content layer — visually elevated above the base panel */}
          <div style={{ transform: 'translateZ(36px)' }} className="relative space-y-8">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <CheckCircle2 className="w-11 h-11 text-brand-gold mx-auto" />
                <h3 className="text-2xl font-serif text-brand-ivory">
                  Your Invitation to Begin
                </h3>
                <p className="text-sm text-brand-cream/70 font-sans max-w-sm mx-auto">
                  Thank you for reaching out. Our concierge team will respond within
                  24 hours to start designing your celebration.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs uppercase tracking-widest text-brand-gold hover:text-brand-gold-light transition-colors font-sans mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div className="text-center space-y-2">
                  <span className="text-[11px] tracking-widest uppercase text-brand-gold font-sans">
                    Request an Introduction
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif text-brand-ivory">
                    Tell Us About Your Occasion
                  </h3>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
                    <EngravedField
                      label="Full Name"
                      registration={register('name')}
                      error={errors.name?.message}
                    />
                    <EngravedField
                      label="Phone"
                      type="tel"
                      registration={register('phone')}
                      error={errors.phone?.message}
                    />
                  </div>

                  <EngravedField
                    label="Email"
                    type="email"
                    registration={register('email')}
                    error={errors.email?.message}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-7">
                    <div className="relative">
                      <select
                        {...register('eventType')}
                        defaultValue=""
                        className="peer w-full bg-transparent border-0 border-b border-brand-gold/25 focus:border-brand-gold px-0.5 pt-5 pb-2 text-sm text-brand-ivory focus:outline-none transition-colors font-sans appearance-none"
                      >
                        <option value="" disabled hidden></option>
                        {EVENT_CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.name} className="bg-brand-charcoal">
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      <label className="absolute left-0.5 top-0 text-[11px] tracking-widest uppercase text-brand-cream/60 font-sans pointer-events-none">
                        Event Type
                      </label>
                    </div>

                    <EngravedField label="Event Date" type="date" registration={register('eventDate')} />
                    <EngravedField label="Location" registration={register('location')} />
                  </div>

                  <EngravedField
                    label="Your Message"
                    as="textarea"
                    rows={4}
                    registration={register('message')}
                    error={errors.message?.message}
                  />

                  {serverError && (
                    <p className="text-xs text-red-400/90 text-center font-sans" role="alert">
                      {serverError}
                    </p>
                  )}

                  {/* Wax-seal submit */}
                  <div className="flex justify-center pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative w-24 h-24 rounded-full bg-gradient-to-br from-brand-gold-light via-brand-gold to-brand-gold-dark text-brand-dark font-sans text-[11px] uppercase tracking-widest font-semibold shadow-[0_10px_25px_-6px_rgba(201,164,92,0.6),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-3px_6px_rgba(0,0,0,0.25)] hover:scale-105 active:scale-95 transition-transform duration-300 disabled:opacity-60 disabled:pointer-events-none"
                    >
                      {isSubmitting ? 'Sending…' : 'Seal & Send'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationForm;
