import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { EVENT_CATEGORIES, SERVICES } from '@/data/mockData';
import { submitEnquiry } from '@/api/forms';

const BUDGET_RANGES = [
  'Under ₹5 Lakhs',
  '₹5 – 15 Lakhs',
  '₹15 – 40 Lakhs',
  '₹40 Lakhs – 1 Crore',
  '₹1 Crore+',
  'Not sure yet',
];

// Mirrors the server's Enquiry model (eventType, eventDate, location, guestCount,
// budgetRange, specialNotes, contactName, contactEmail, contactPhone, services[])
const enquirySchema = z.object({
  eventType: z.string().min(1, 'Please choose an event type'),
  services: z.array(z.string()).min(1, 'Select at least one service'),
  eventDate: z.string().optional(),
  location: z.string().min(1, 'Please tell us the city or venue'),
  guestCount: z.string().optional(),
  budgetRange: z.string().min(1, 'Please select a budget range'),
  contactName: z.string().min(2, 'Please enter your full name'),
  contactEmail: z.string().email('Please enter a valid email'),
  contactPhone: z.string().min(8, 'Please enter a valid phone number'),
  specialNotes: z.string().optional(),
});

type EnquiryFormValues = z.infer<typeof enquirySchema>;

const STEPS = [
  { id: 1, label: 'Event Type' },
  { id: 2, label: 'Services' },
  { id: 3, label: 'Details' },
  { id: 4, label: 'Your Info' },
];

export const PlanYourEventPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { services: [] },
  });

  const selectedEventType = watch('eventType');
  const selectedServices = watch('services') || [];
  const selectedBudget = watch('budgetRange');

  const toggleService = (slug: string) => {
    const current = selectedServices.includes(slug)
      ? selectedServices.filter((s) => s !== slug)
      : [...selectedServices, slug];
    setValue('services', current, { shouldValidate: true });
  };

  const stepFields: Record<number, (keyof EnquiryFormValues)[]> = {
    1: ['eventType'],
    2: ['services'],
    3: ['location', 'budgetRange'],
    4: ['contactName', 'contactEmail', 'contactPhone'],
  };

  const goNext = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data: EnquiryFormValues) => {
    setServerError(null);
    try {
      await submitEnquiry(data);
      setSubmitted(true);
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or contact us on WhatsApp.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-brand-ivory flex flex-col font-sans selection:bg-brand-gold selection:text-brand-dark">
      <Navbar />

      <main className="flex-1">
        <section className="pt-40 pb-16 md:pt-48 md:pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              theme="dark"
              eyebrow="BESPOKE ENQUIRY"
              title="Plan Your Event"
              subtitle="A few quick steps to design your customized event blueprint — our concierge team takes it from there."
            />
          </div>
        </section>

        <section className="pb-24 md:pb-32">
          <div className="max-w-3xl mx-auto px-6">
            {submitted ? (
              <div className="rounded-2xl bg-brand-surface border border-brand-border/40 p-10 md:p-14 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-brand-gold mx-auto" />
                <h3 className="text-2xl font-serif text-brand-ivory">
                  Your Blueprint Is In
                </h3>
                <p className="text-sm text-brand-cream/70 font-sans max-w-md mx-auto">
                  Thank you — our concierge team is reviewing your event details and
                  will reach out within 24 hours with a tailored proposal.
                </p>
              </div>
            ) : (
              <>
                {/* Step Indicator */}
                <div className="flex items-center justify-between mb-12">
                  {STEPS.map((s, idx) => (
                    <React.Fragment key={s.id}>
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-sans font-semibold border transition-colors duration-300 ${
                            step === s.id
                              ? 'bg-brand-gold text-brand-dark border-brand-gold'
                              : step > s.id
                              ? 'bg-brand-gold/20 text-brand-gold border-brand-gold/50'
                              : 'bg-brand-surface text-brand-muted border-white/10'
                          }`}
                        >
                          {step > s.id ? <Check className="w-4 h-4" /> : s.id}
                        </div>
                        <span
                          className={`text-[10px] uppercase tracking-widest font-sans hidden sm:block ${
                            step >= s.id ? 'text-brand-gold' : 'text-brand-muted'
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                      {idx < STEPS.length - 1 && (
                        <div
                          className={`flex-1 h-px mx-2 transition-colors duration-300 ${
                            step > s.id ? 'bg-brand-gold/50' : 'bg-white/10'
                          }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="rounded-2xl bg-brand-surface border border-brand-border/40 p-6 md:p-10"
                >
                  {/* Step 1: Event Type */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-serif text-brand-ivory">
                        What are you celebrating?
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {EVENT_CATEGORIES.slice(0, 12).map((cat) => {
                          const IconComponent =
                            (Icons[cat.icon as keyof typeof Icons] as LucideIcon) ||
                            Icons.Sparkles;
                          const isSelected = selectedEventType === cat.name;
                          return (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() =>
                                setValue('eventType', cat.name, { shouldValidate: true })
                              }
                              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? 'bg-brand-gold/15 border-brand-gold text-brand-gold'
                                  : 'bg-brand-dark/50 border-white/10 text-brand-cream/80 hover:border-white/25'
                              }`}
                            >
                              <IconComponent className="w-5 h-5" />
                              <span className="text-xs font-sans">{cat.name}</span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.eventType && (
                        <p className="text-xs text-red-400 font-sans">
                          {errors.eventType.message}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Step 2: Services */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-serif text-brand-ivory">
                        Which services do you need?
                      </h3>
                      <p className="text-xs text-brand-muted font-sans">
                        Select all that apply — you can adjust this later with your
                        event director.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {SERVICES.map((service) => {
                          const isSelected = selectedServices.includes(service.slug);
                          return (
                            <button
                              key={service.id}
                              type="button"
                              onClick={() => toggleService(service.slug)}
                              className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? 'bg-brand-gold/15 border-brand-gold'
                                  : 'bg-brand-dark/50 border-white/10 hover:border-white/25'
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? 'bg-brand-gold border-brand-gold text-brand-dark'
                                    : 'border-white/20'
                                }`}
                              >
                                {isSelected && <Check className="w-3.5 h-3.5" />}
                              </div>
                              <span
                                className={`text-sm font-sans ${
                                  isSelected ? 'text-brand-gold' : 'text-brand-cream/85'
                                }`}
                              >
                                {service.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.services && (
                        <p className="text-xs text-red-400 font-sans">
                          {errors.services.message}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Step 3: Event Details */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-serif text-brand-ivory">
                        Tell us the details
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-brand-muted font-sans mb-2">
                            Preferred Date
                          </label>
                          <input
                            {...register('eventDate')}
                            type="date"
                            className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-brand-ivory focus:outline-none focus:border-brand-gold/50 transition-colors font-sans"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-brand-muted font-sans mb-2">
                            City / Venue *
                          </label>
                          <input
                            {...register('location')}
                            type="text"
                            placeholder="e.g. Hyderabad"
                            className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-brand-ivory placeholder:text-brand-muted focus:outline-none focus:border-brand-gold/50 transition-colors font-sans"
                          />
                          {errors.location && (
                            <p className="text-xs text-red-400 mt-1">
                              {errors.location.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-brand-muted font-sans mb-2">
                            Approx. Guest Count
                          </label>
                          <input
                            {...register('guestCount')}
                            type="number"
                            min="1"
                            placeholder="e.g. 250"
                            className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-brand-ivory placeholder:text-brand-muted focus:outline-none focus:border-brand-gold/50 transition-colors font-sans"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-widest text-brand-muted font-sans mb-3">
                          Budget Range *
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {BUDGET_RANGES.map((range) => (
                            <button
                              key={range}
                              type="button"
                              onClick={() =>
                                setValue('budgetRange', range, { shouldValidate: true })
                              }
                              className={`text-xs px-4 py-2.5 rounded-full border transition-all duration-200 cursor-pointer font-sans ${
                                selectedBudget === range
                                  ? 'bg-brand-gold text-brand-dark border-brand-gold font-semibold'
                                  : 'bg-brand-dark/50 text-brand-cream/80 border-white/10 hover:border-white/25'
                              }`}
                            >
                              {range}
                            </button>
                          ))}
                        </div>
                        {errors.budgetRange && (
                          <p className="text-xs text-red-400 mt-2">
                            {errors.budgetRange.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Contact Info */}
                  {step === 4 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-serif text-brand-ivory">
                        How should we reach you?
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-brand-muted font-sans mb-2">
                            Full Name *
                          </label>
                          <input
                            {...register('contactName')}
                            type="text"
                            className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-brand-ivory focus:outline-none focus:border-brand-gold/50 transition-colors font-sans"
                          />
                          {errors.contactName && (
                            <p className="text-xs text-red-400 mt-1">
                              {errors.contactName.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-brand-muted font-sans mb-2">
                            Phone *
                          </label>
                          <input
                            {...register('contactPhone')}
                            type="tel"
                            className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-brand-ivory focus:outline-none focus:border-brand-gold/50 transition-colors font-sans"
                          />
                          {errors.contactPhone && (
                            <p className="text-xs text-red-400 mt-1">
                              {errors.contactPhone.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-brand-muted font-sans mb-2">
                          Email *
                        </label>
                        <input
                          {...register('contactEmail')}
                          type="email"
                          className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-brand-ivory focus:outline-none focus:border-brand-gold/50 transition-colors font-sans"
                        />
                        {errors.contactEmail && (
                          <p className="text-xs text-red-400 mt-1">
                            {errors.contactEmail.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-brand-muted font-sans mb-2">
                          Anything else we should know?
                        </label>
                        <textarea
                          {...register('specialNotes')}
                          rows={4}
                          placeholder="Optional — themes, must-haves, special requests…"
                          className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-3 text-sm text-brand-ivory placeholder:text-brand-muted focus:outline-none focus:border-brand-gold/50 transition-colors font-sans resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {serverError && (
                    <p className="text-xs text-red-400 font-sans mt-6" role="alert">
                      {serverError}
                    </p>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-10 mt-2 border-t border-white/5">
                    <Button
                      type="button"
                      variant="ghost"
                      size="md"
                      onClick={goBack}
                      disabled={step === 1}
                      className="disabled:invisible"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1.5" />
                      Back
                    </Button>

                    {step < STEPS.length ? (
                      <Button type="button" variant="primary" size="md" onClick={goNext}>
                        Next
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Button>
                    ) : (
                      <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting…' : 'Submit My Blueprint'}
                      </Button>
                    )}
                  </div>
                </form>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PlanYourEventPage;
