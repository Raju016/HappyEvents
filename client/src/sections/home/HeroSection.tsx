import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import FloatingGoldDust from '@/components/ui/FloatingGoldDust';

interface HeroSectionProps {
  onWatchStory: () => void;
}

interface HeroSlide {
  id: string;
  category: string;
  title: string;
  image: string;
  alt: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'weddings',
    category: 'Weddings',
    title: 'Bespoke Royal Mandaps & Receptions',
    image: 'wedding-2.png',
    alt: 'Luxury wedding ballroom with floral chandeliers and opulent mandap',
  },
  {
    id: 'concerts',
    category: 'Concerts & Shows',
    title: 'Stadium Stage Lighting & Line-Array AV',
    image: 'party.jpg',
    alt: 'Massive concert stage with intelligent moving head lights and lasers',
  },
  {
    id: 'birthdays',
    category: 'Birthdays & Jubilees',
    title: 'Milestone Celebrations & Gala Banquets',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=2000&q=85',
    alt: 'Golden milestone anniversary and birthday celebration dining setup',
  },
  {
    id: 'private',
    category: 'Private Parties',
    title: 'Exclusive Villa Sundowners & Soirées',
    image: 'private-party.png',
    alt: 'Luxury outdoor evening party with warm ambient glow and cocktail bar',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onWatchStory }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Auto-rotate hero event backgrounds every 6.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  const currentSlide = HERO_SLIDES[activeSlideIndex];

  return (
    <section
      id="home"
      className="relative min-h-[92vh] md:min-h-screen w-full flex items-center justify-center overflow-hidden bg-brand-dark scroll-mt-24"
    >
      {/* 1. Hero Background & Visual Fade-in */}
      <div className="absolute inset-0 z-0 overflow-hidden anim-hero-bg">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === activeSlideIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-[1]' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className={`w-full h-full object-cover object-center transform transition-transform duration-[7500ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                } ${index === 0 ? 'anim-hero-zoom' : ''}`}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          );
        })}

        {/* Floating Golden Embers & Stardust */}
        <FloatingGoldDust particleCount={36} />

        {/* Ambient Radial Golden Glow */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Calibrated Luxury Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40 z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-transparent to-black/50 z-[2]" />
      </div>

      {/* Hero Content Container with Sequential Staggered Entrance */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 md:py-36 w-full flex flex-col items-start justify-center">
        <div className="max-w-3xl space-y-6 md:space-y-7">
          {/* 2. Hero Brand Mark & Eyebrow Badge (Step 2) */}
          <div className="flex flex-wrap items-center gap-3 anim-hero-badge">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-charcoal/90 border border-brand-gold/40 backdrop-blur-md shadow-lg shadow-black/50">
              <img
                src="/happy_events_logo_crop.png"
                alt="HappyEvents Brand Emblem"
                className="w-4 h-4 rounded-full object-cover border border-brand-gold/60"
              />
              <span className="text-[10px] md:text-[11px] uppercase font-sans font-semibold tracking-eyebrow text-brand-gold">
                HAPPYEVENTS • WE PLAN • WE DESIGN • WE CREATE
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-[10px] md:text-[11px] tracking-wider uppercase text-brand-cream/80">
              <Sparkles className="w-3 h-3 text-brand-gold" />
              <span>HYDERABAD & BEYOND</span>
            </div>
          </div>

          {/* 3. Main Heading with smooth fade & slight upward movement (Step 3) */}
          <div className="overflow-hidden">
            <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-[3.75rem] font-serif font-normal text-brand-ivory leading-[1.12] tracking-tight drop-shadow-md anim-hero-heading">
              WE CREATE <br />
              <span className="text-gold-gradient italic font-serif inline-block">
                MOMENTS
              </span>{' '}
              <br />
              YOU&apos;LL REMEMBER.
            </h1>
          </div>

          {/* 4. Supporting Text with Short Staggered Delay (Step 4) */}
          <p className="text-base sm:text-lg text-brand-cream/90 font-sans font-light max-w-xl leading-relaxed drop-shadow-sm anim-hero-copy">
            From intimate celebrations to large-scale productions, we plan, design,
            and execute unforgettable events with bespoke artistry and precision.
          </p>

          {/* 5. CTA Buttons Smooth Appearance (Step 5) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 anim-hero-cta">
            <Link to="/plan-your-event" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto group shadow-2xl relative overflow-hidden"
              >
                <span>Plan Your Event</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link to="/work" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="md"
                className="w-full sm:w-auto bg-black/40 hover:bg-black/60 backdrop-blur-md border border-brand-gold/30 hover:border-brand-gold transition-all duration-300"
              >
                <span>View Our Work</span>
              </Button>
            </Link>

            {/* Complete Clickable "Watch Our Story" Pill */}
            <button
              onClick={onWatchStory}
              type="button"
              className="inline-flex items-center justify-center gap-3 px-4 py-2.5 rounded-full bg-black/40 hover:bg-brand-charcoal/90 border border-brand-gold/40 hover:border-brand-gold text-brand-ivory hover:text-brand-gold transition-all duration-300 shadow-xl cursor-pointer group backdrop-blur-sm"
              aria-label="Watch our brand story video film"
            >
              <div className="w-8 h-8 rounded-full bg-brand-gold/20 group-hover:bg-brand-gold text-brand-gold group-hover:text-brand-dark flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(201,164,92,0.3)]">
                <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
              </div>
              <span className="font-sans font-medium text-xs tracking-widest uppercase">
                Watch Our Story
              </span>
            </button>
          </div>
        </div>

        {/* Existing Hero Decorative Elements: Multi-Event Category Switcher & Live Indicator */}
        <div className="pt-10 md:pt-14 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 mt-8 anim-hero-footer">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase font-sans tracking-widest text-brand-muted mr-1 hidden lg:inline-block">
              Experience:
            </span>
            {HERO_SLIDES.map((slide, idx) => {
              const isSelected = idx === activeSlideIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`text-[11px] font-sans uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-brand-gold text-brand-dark font-semibold shadow-[0_0_15px_rgba(201,164,92,0.4)] scale-105'
                      : 'bg-black/40 text-brand-cream/70 hover:text-brand-ivory hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {slide.category}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 text-xs text-brand-cream/80 font-sans">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
            <AnimatePresence mode="wait">
              <motion.span
                key={currentSlide.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="font-light"
              >
                {currentSlide.title}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
