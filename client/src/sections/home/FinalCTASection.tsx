import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Sparkles, MapPin, Phone, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';

export const FinalCTASection: React.FC = () => {
  const handleWhatsAppChat = () => {
    const defaultMsg = encodeURIComponent("Hello Happy Events, I would like to plan a bespoke celebration with your team.");
    window.open(`https://wa.me/919908683101?text=${defaultMsg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 relative py-24 md:py-32 overflow-hidden bg-brand-dark border-t border-white/5"
    >
      {/* Background Event Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="/wedding.jpg"
          alt="Happy Events Luxury stage lighting and celebration setup"
          className="w-full h-full object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-brand-dark/90 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center space-y-12">
        {/* Eyebrow & Call To Action Headline */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-brand-gold text-xs font-semibold tracking-eyebrow uppercase font-sans">
            <Sparkles className="w-3.5 h-3.5" />
            LET&apos;S CREATE SOMETHING EXTRAORDINARY
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-brand-ivory font-normal tracking-tight leading-tight">
            READY TO PLAN <br />
            <span className="text-gold-gradient italic font-serif">YOUR CELEBRATION?</span>
          </h2>

          <p className="text-base sm:text-lg text-brand-cream/80 font-sans font-light max-w-xl mx-auto leading-relaxed">
            Tell us about your event vision. Our Hyderabad production team will connect with you
            with a customized design concept and quotation within 24 hours.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link to="/plan-your-event" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-2xl group">
              <span>Plan Your Event</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>

          <Button
            variant="secondary"
            size="lg"
            onClick={handleWhatsAppChat}
            className="w-full sm:w-auto border-emerald-500/60 text-emerald-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-600"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            <span>Chat on WhatsApp</span>
          </Button>

          <Link to="/contact" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              <span>Full Contact & Studio Map</span>
            </Button>
          </Link>
        </div>

        {/* Direct Studio Contact Cards Strip */}
        <div className="pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
          <div className="p-5 rounded-xl bg-brand-surface/60 border border-brand-border/30 flex items-start gap-3.5">
            <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-widest font-sans font-semibold text-brand-ivory mb-1">
                Hyderabad Studio
              </h4>
              <p className="text-xs text-brand-cream/70 font-sans font-light leading-relaxed">
                Himayatnagar & Jubilee Hills, Hyderabad, Telangana, India
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-brand-surface/60 border border-brand-border/30 flex items-start gap-3.5">
            <Phone className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-widest font-sans font-semibold text-brand-ivory mb-1">
                HappyEvents Direct Line
              </h4>
              <a
                href="tel:+919908683101"
                className="text-xs text-brand-cream/70 hover:text-brand-gold font-sans font-light transition-colors block"
              >
                +91 99086 83101
              </a>

            </div>
          </div>

          <div className="p-5 rounded-xl bg-brand-surface/60 border border-brand-border/30 flex items-start gap-3.5">
            <Mail className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-widest font-sans font-semibold text-brand-ivory mb-1">
                Direct Email
              </h4>
              <a
                href="mailto:rajkadiyam9346@gmail.com"
                className="text-xs text-brand-cream/70 hover:text-brand-gold font-sans font-light transition-colors"
              >
                rajkadiyam9346@gmail.com
              </a>
              <p className="text-[11px] text-brand-muted font-sans mt-0.5">
                Replies within 24 business hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
