import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

interface HeroSectionProps {
  onWatchStory: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onWatchStory }) => {
  return (
    <section className="relative min-h-[92vh] md:min-h-screen w-full flex items-center justify-center overflow-hidden bg-brand-dark">
      {/* Background Cinematic Event Imagery */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85"
          alt="Cinematic luxury event ballroom with crystal chandeliers and floral decor"
          className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[12000ms]"
        />
        {/* Editorial Dark Multi-Layer Gradient Overlays for Maximum Legibility */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 md:py-36 w-full flex flex-col items-start justify-center">
        <div className="max-w-4xl space-y-8">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-charcoal/80 border border-brand-gold/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span className="text-[11px] md:text-xs uppercase font-sans font-semibold tracking-eyebrow text-brand-gold">
              WE PLAN • WE DESIGN • WE CREATE
            </span>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal text-brand-ivory leading-[1.05] tracking-tight">
            WE CREATE <br />
            <span className="text-gold-gradient italic font-serif">MOMENTS</span> <br />
            YOU&apos;LL REMEMBER.
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg md:text-xl text-brand-cream/85 font-sans font-light max-w-2xl leading-relaxed">
            From intimate celebrations to large-scale productions, we plan, design, 
            and execute unforgettable events with bespoke artistry and precision.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 pt-4">
            <Link to="/plan-your-event">
              <Button variant="primary" size="lg" className="w-full sm:w-auto group shadow-2xl">
                <span>Plan Your Event</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link to="/work">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                <span>View Our Work</span>
              </Button>
            </Link>

            {/* Circular Video Control: Watch Our Story */}
            <div className="pt-2 sm:pt-0 sm:ml-4 flex items-center">
              <button
                onClick={onWatchStory}
                className="inline-flex items-center gap-3 text-xs uppercase tracking-widest font-sans text-brand-ivory hover:text-brand-gold transition-colors group cursor-pointer"
                aria-label="Watch our brand story film"
              >
                <div className="w-12 h-12 rounded-full border border-brand-gold/50 bg-black/40 backdrop-blur-md flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-dark group-hover:scale-105 transition-all duration-300 shadow-xl">
                  <Play className="w-4 h-4 ml-0.5 fill-current" />
                </div>
                <span className="font-medium text-[11px] tracking-widest">Watch Our Story</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent Detail */}
      <div className="absolute bottom-6 inset-x-6 max-w-7xl mx-auto flex items-center justify-between z-10 text-[10px] uppercase font-sans tracking-widest text-brand-muted hidden md:flex">
        <span>Curated Experiences Across India</span>
        <span className="w-24 h-[1px] bg-brand-gold/40" />
        <span>Luxury Event Management & Production</span>
      </div>
    </section>
  );
};

export default HeroSection;
