import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { SITE_STATS } from '@/data/mockData';
import Button from '@/components/ui/Button';

export const FinalCTASection: React.FC = () => {
  const handleWhatsAppChat = () => {
    const defaultMsg = encodeURIComponent("Hello MOMENTA, I would like to plan a bespoke event with your team.");
    window.open(`https://wa.me/919876543210?text=${defaultMsg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-brand-dark">
      {/* Background Cinematic Event Visual */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury grand gala with illumination and elegant stage setup"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-brand-dark/85 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center space-y-12">
        {/* Eyebrow & Call To Action Headline */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-brand-gold text-xs font-semibold tracking-eyebrow uppercase font-sans">
            <Sparkles className="w-3.5 h-3.5" />
            LET&apos;S CREATE SOMETHING AMAZING
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-brand-ivory font-normal tracking-tight leading-tight">
            READY TO PLAN <br />
            <span className="text-gold-gradient italic font-serif">YOUR EVENT?</span>
          </h2>

          <p className="text-base sm:text-lg text-brand-cream/80 font-sans font-light max-w-xl mx-auto leading-relaxed">
            Tell us about your event and our specialist team will get back to you 
            with a customized design concept and quotation within 24 hours.
          </p>
        </div>

        {/* Dual High-Impact Action CTAs */}
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
        </div>

        {/* Configurable Live Statistics Counter Grid */}
        <div className="pt-16 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {SITE_STATS.map((stat) => (
            <div key={stat.id} className="space-y-1">
              <span className="text-3xl md:text-5xl font-serif font-medium text-brand-gold block">
                {stat.value}
              </span>
              <span className="text-sm font-sans font-medium text-brand-ivory block">
                {stat.label}
              </span>
              <span className="text-[11px] font-sans text-brand-muted block font-light">
                {stat.sublabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
