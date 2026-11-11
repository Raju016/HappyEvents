import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Plus, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import './ServicesAccordion.css';

export interface ServiceAccordionItem {
  number: string;
  id: string;
  name: string;
  slug: string;
  headline: string;
  description: string;
  image: string;
  subServices: string[];
}

export const SERVICES_16: ServiceAccordionItem[] = [
  {
    number: '01',
    id: 'weddings',
    name: 'Weddings',
    slug: 'weddings',
    headline: 'Bespoke Royal Celebrations',
    description: 'Elegant celebrations crafted around your story, from lavish sangeet galas to breathtaking architectural mandaps.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    subServices: ['Wedding Planning', 'Decor & Floral Art', 'Venue Management', 'Guest Experience'],
  },
  {
    number: '02',
    id: 'engagements',
    name: 'Engagements',
    slug: 'engagements',
    headline: 'The First Promise',
    description: 'Intimate candlelit rings, opulent floral backdrops, and unforgettable cocktail soirées honoring your new journey.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    subServices: ['Theme Concepts', 'Ring Ceremony Stages', 'Cocktail Lounge Setup', 'Candid Cinematography'],
  },
  {
    number: '03',
    id: 'birthdays',
    name: 'Birthdays',
    slug: 'birthdays',
    headline: 'Milestone Celebrations',
    description: 'Extravagant 1st birthdays, luxury sweet 16s, and majestic golden jubilee galas engineered for supreme joy.',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80',
    subServices: ['Bespoke Theming', 'Custom Cake Stages', 'Entertainment & DJs', 'Interactive Kids Zones'],
  },
  {
    number: '04',
    id: 'anniversaries',
    name: 'Anniversaries',
    slug: 'anniversaries',
    headline: 'Enduring Legacies',
    description: 'Silver and golden jubilee celebrations with cinematic vow renewals, nostalgic archives, and vintage ambiance.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    subServices: ['Vow Renewal Sets', 'Memory Galleries', 'Fine Dining Banquets', 'Live Acoustic Bands'],
  },
  {
    number: '05',
    id: 'corporate-events',
    name: 'Corporate Events',
    slug: 'corporate-events',
    headline: 'Executive Precision',
    description: 'Global summits, annual corporate galas, and world-class shareholder banquets executed with corporate mastery.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    subServices: ['AV & Stage Engineering', 'Keynote Production', 'VIP Hospitality', 'Brand Alignment'],
  },
  {
    number: '06',
    id: 'concerts-live-shows',
    name: 'Concerts & Live Shows',
    slug: 'concerts-live-shows',
    headline: 'Acoustic Mastery & Spectacle',
    description: 'Stadium arena tours, live artist concerts, and immersive electronic music festival stages with explosive energy.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    subServices: ['Line-Array Acoustics', 'Intelligent Moving Beams', 'Artist Management', 'Crowd Safety Systems'],
  },
  {
    number: '07',
    id: 'college-events',
    name: 'College Events',
    slug: 'college-events',
    headline: 'Youthful Momentum',
    description: 'Mega university cultural fests, star-studded DJ nights, and high-octane collegiate competitions that inspire.',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80',
    subServices: ['Celebrity Artist Booking', 'Mega Stage Trussing', 'Sound & Laser FX', 'Campus Logistics'],
  },
  {
    number: '08',
    id: 'school-events',
    name: 'School Events',
    slug: 'school-events',
    headline: 'Inspired Milestones',
    description: 'Grand annual day productions, sports meets, and student graduation ceremonies with theatrical grandeur.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
    subServices: ['Theatrical Sets', 'Costume & Light Cues', 'Auditorium AV', 'Graduation Protocols'],
  },
  {
    number: '09',
    id: 'private-parties',
    name: 'Private Parties',
    slug: 'private-parties',
    headline: 'Exclusive Discretion',
    description: 'Luxury villa parties, penthouse gatherings, and private sundowners curated exclusively for your inner circle.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    subServices: ['Villa Transformation', 'Craft Mixology Bars', 'Private DJ Sets', 'Ambient Illumination'],
  },
  {
    number: '10',
    id: 'baby-showers',
    name: 'Baby Showers',
    slug: 'baby-showers',
    headline: 'Tender Beginnings',
    description: 'Pastel dreamscapes, custom floral swings, and heartfelt maternity festivities designed with whimsical elegance.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    subServices: ['Pastel Spatial Styling', 'Custom Floral Arbors', 'Gourmet Dessert Tables', 'Keepsake Activities'],
  },
  {
    number: '11',
    id: 'naming-ceremonies',
    name: 'Naming Ceremonies',
    slug: 'naming-ceremonies',
    headline: 'Sacred Blessings',
    description: 'Traditional cradle ceremonies with celestial decor, Vedic reverence, and curated familial banquets.',
    image: 'https://images.unsplash.com/photo-1519225438184-c7919832a454?auto=format&fit=crop&w=1200&q=80',
    subServices: ['Floral Cradle Decor', 'Traditional Stage Backdrops', 'Puja Seating Layouts', 'Curated Catering'],
  },
  {
    number: '12',
    id: 'cultural-events',
    name: 'Cultural Events',
    slug: 'cultural-events',
    headline: 'Heritage Celebrations',
    description: 'Folk performances, regional festivals, and authentic cultural showcases honoring deep artistic traditions.',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
    subServices: ['Traditional Set Design', 'Folk Troupe Coordination', 'Authentic Lighting', 'Heritage Gastronomy'],
  },
  {
    number: '13',
    id: 'religious-events',
    name: 'Religious Events',
    slug: 'religious-events',
    headline: 'Divine Serenity',
    description: 'Devotional kirtans, temple ceremonies, and spiritual congregational gatherings crafted with solemn beauty.',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80',
    subServices: ['Sacred Mandap Setup', 'Acoustic Clarity AV', 'Devotional Seating', 'Prasadam Distribution'],
  },
  {
    number: '14',
    id: 'award-functions',
    name: 'Award Functions',
    slug: 'award-functions',
    headline: 'Golden Accolades',
    description: 'Red carpet entries, trophy presentations, and high-impact stage productions celebrating triumph and industry prestige.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    subServices: ['Red Carpet Media Walls', 'Dynamic Award Stems', 'Teleprompters & Cues', 'Gala Banquet Seating'],
  },
  {
    number: '15',
    id: 'exhibitions',
    name: 'Exhibitions & Expos',
    slug: 'exhibitions',
    headline: 'Curated Showcases',
    description: 'Art gallery installations, industrial trade shows, and bespoke luxury expos connecting creators & patrons seamlessly.',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80',
    subServices: ['Modular Booth Systems', 'Exhibition Lighting', 'Visitor Flow Signage', 'Registration Counters'],
  },
  {
    number: '16',
    id: 'brand-activations',
    name: 'Brand Activations',
    slug: 'brand-activations',
    headline: 'Experiential Reach',
    description: 'Interactive consumer pop-ups, immersive brand zones, and viral PR setups that command audience attention.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
    subServices: ['Interactive AR/VR Pods', 'Immersive Photo Ops', 'Product Sampling Kiosks', 'Social Amplification'],
  },
];

export const ServicesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [tilt, setTilt] = useState<{ rotX: number; rotY: number }>({ rotX: 0, rotY: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  // References for drag and scrolling
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastWheelTime = useRef<number>(0);
  const pointerStartX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const isPageScrolling = useRef<boolean>(false);
  const scrollTimer = useRef<number | null>(null);

  // Mobile accordion state (allows toggling item or null)
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number | null>(0);

  // Preload all 16 images in background for instant, flawless display
  useEffect(() => {
    SERVICES_16.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Track window scroll state so hover does not trigger when scrolling down the page
  useEffect(() => {
    const handleWindowScroll = () => {
      isPageScrolling.current = true;
      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
      scrollTimer.current = window.setTimeout(() => {
        isPageScrolling.current = false;
      }, 120);
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
    };
  }, []);

  // Center active card horizontally inside the track ONLY without touching window scroll!
  const centerCardInTrack = useCallback((index: number) => {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;

    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const currentScrollLeft = track.scrollLeft;

    // Relative distance within track
    const cardLeftRelativeToTrack = cardRect.left - trackRect.left + currentScrollLeft;
    const targetScrollLeft = cardLeftRelativeToTrack - trackRect.width / 2 + cardRect.width / 2;

    track.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    centerCardInTrack(activeIndex);
  }, [activeIndex, centerCardInTrack]);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % SERVICES_16.length);
  }, []);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + SERVICES_16.length) % SERVICES_16.length);
  }, []);

  // Subtle 3D mouse-tilt on the active card (strictly 4-6 degrees)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const MAX_TILT = 5.0;
    setTilt({
      rotX: -y * MAX_TILT,
      rotY: x * MAX_TILT,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotX: 0, rotY: 0 });
  };

  // Safe hover: only activates if user is NOT scrolling down the page
  const handleCardHover = (index: number) => {
    if (isPageScrolling.current) return;
    setActiveIndex(index);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrev();
    }
  };

  // Wheel navigation: ONLY intercepts horizontal swipe or Shift+Wheel!
  // Normal vertical wheel (scrolling down the page) passes through untouched!
  const handleWheel = (e: React.WheelEvent) => {
    // If scrolling vertically, let the browser scroll down the page naturally!
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) * 1.2 && !e.shiftKey) {
      return;
    }

    // Only handle explicit horizontal scroll
    if (Math.abs(e.deltaX) > 15 || (e.shiftKey && Math.abs(e.deltaY) > 15)) {
      const now = performance.now();
      if (now - lastWheelTime.current < 260) return;
      lastWheelTime.current = now;

      const delta = Math.abs(e.deltaX) > 15 ? e.deltaX : e.deltaY;
      if (delta > 0) goToNext();
      else goToPrev();
    }
  };

  // Pointer drag for desktop track
  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
    isDragging.current = true;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = e.clientX - pointerStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) goToNext();
      else goToPrev();
    }
  };

  return (
    <section
      id="services"
      aria-label="Our Services"
      className="scroll-mt-24 bg-[#0c0c0c] text-brand-ivory py-24 md:py-32 border-y border-brand-border/20 relative overflow-hidden select-none"
    >
      {/* Cinematic Ambient Atmosphere Glows */}
      <div className="absolute top-1/3 left-1/4 w-[550px] h-[550px] bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[160px] pointer-events-none translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Heading with Staggered Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-charcoal/80 border border-brand-gold/30 text-brand-gold text-[10px] md:text-[11px] uppercase font-sans tracking-widest mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>16 Master Services • 3D Expanding Collection</span>
          </div>

          <SectionHeading
            theme="dark"
            eyebrow="OUR SERVICES"
            title="Complete Event Production"
            subtitle="Explore our comprehensive spectrum of 16 bespoke services. Hover or click any card to inspect full capabilities and event artistry."
            className="mb-6"
          />

          {/* Animated Gold Divider Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-brand-gold to-transparent origin-center"
          />
        </motion.div>

        {/* =========================================================================
            DESKTOP INTERACTION: 3D Horizontal Accordion / Expanding Cards (>= 768px)
            ========================================================================= */}
        <div className="hidden md:block">
          <div
            tabIndex={0}
            role="region"
            aria-label="Interactive 3D Services Collection"
            onKeyDown={handleKeyDown}
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            className="services-accordion-stage focus:outline-none py-4"
          >
            <div
              ref={trackRef}
              className="services-accordion-track services-hide-scrollbar flex items-stretch gap-2.5 lg:gap-3 py-6 px-4 md:px-8 lg:px-12 overflow-x-auto min-h-[580px] lg:min-h-[620px]"
            >
              {SERVICES_16.map((service, index) => {
                const isActive = index === activeIndex;
                const diff = index - activeIndex;

                // Subtle concave 3D angle based on distance from focal card
                const angleY = reducedMotion
                  ? 0
                  : isActive
                  ? tilt.rotY
                  : diff < 0
                  ? Math.min(5.2, 2.5 + Math.abs(diff) * 0.3)
                  : -Math.min(5.2, 2.5 + Math.abs(diff) * 0.3);

                const angleX = isActive && !reducedMotion ? tilt.rotX : 0;
                const translateZ = reducedMotion ? 0 : isActive ? 28 : -Math.min(22, Math.abs(diff) * 3);
                const scaleVal = isActive ? 1.015 : 0.985;

                const cardTransform = `perspective(1400px) translate3d(0, 0, ${translateZ}px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(${scaleVal})`;

                return (
                  <div
                    key={service.id}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isActive}
                    aria-label={`${service.number} ${service.name}`}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => handleCardHover(index)}
                    onMouseMove={isActive ? handleMouseMove : undefined}
                    onMouseLeave={isActive ? handleMouseLeave : undefined}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveIndex(index);
                      }
                    }}
                    className={`services-accordion-card relative rounded-2xl overflow-hidden cursor-pointer border select-none shrink-0 ${
                      isActive
                        ? 'services-card-active-glow border-brand-gold/60 w-[420px] lg:w-[460px] z-30'
                        : 'border-white/10 hover:border-brand-gold/40 w-[48px] lg:w-[52px] z-10 opacity-75 hover:opacity-100'
                    }`}
                    style={{
                      transform: cardTransform,
                    }}
                  >
                    {/* Background Visual with Zoom & Dynamic Scrim */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none bg-[#161616]">
                      <img
                        src={service.image}
                        alt={`${service.name} event visual`}
                        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                          isActive
                            ? 'scale-105 brightness-95 contrast-105'
                            : 'scale-100 brightness-40 saturate-50 blur-[0.6px]'
                        }`}
                        loading="eager"
                        decoding="async"
                      />
                      {/* Gradient Scrims: active has soft bottom readability; collapsed has dark glass tone */}
                      <div
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          isActive
                            ? 'bg-gradient-to-t from-black/95 via-black/45 to-black/25'
                            : 'bg-black/60 backdrop-blur-[1px]'
                        }`}
                      />
                    </div>

                    {/* Compressed Slat Representation (When not active) */}
                    {!isActive && (
                      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center py-6 px-1">
                        {/* Service Number at Top */}
                        <span className="font-mono text-xs font-semibold text-brand-gold tracking-widest">
                          {service.number}
                        </span>

                        {/* Elegant Vertical Title */}
                        <div className="flex-1 flex items-center justify-center my-4">
                          <span className="services-vertical-title text-sm lg:text-base font-serif tracking-[0.2em] font-medium text-brand-ivory/90 uppercase whitespace-nowrap">
                            {service.name}
                          </span>
                        </div>

                        {/* Subtle Indicator Dash */}
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/40" />
                      </div>
                    )}

                    {/* Expanded Interactive Card Content (When active) */}
                    {isActive && (
                      <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 lg:p-8">
                        {/* Top Bar: Number + Service Title */}
                        <div>
                          <div className="flex items-center justify-between gap-4 mb-2">
                            <span className="font-mono text-xs font-semibold text-brand-gold tracking-widest px-2.5 py-1 rounded bg-black/60 border border-brand-gold/30 backdrop-blur-md">
                              {service.number}
                            </span>
                            <span className="text-[10px] uppercase font-sans tracking-widest text-brand-cream/60">
                              Signature Capability
                            </span>
                          </div>

                          <h3 className="text-2xl lg:text-3xl font-serif text-brand-ivory font-medium tracking-wide">
                            {service.name}
                          </h3>
                        </div>

                        {/* Bottom Editorial Content & Actions */}
                        <div className="space-y-4">
                          {/* Headline Tagline */}
                          <div className="inline-flex items-center gap-1.5 text-xs font-sans tracking-wider uppercase font-semibold text-brand-gold">
                            <Sparkles className="w-3 h-3 text-brand-gold" />
                            <span>{service.headline}</span>
                          </div>

                          {/* Smooth Description */}
                          <p className="text-xs lg:text-sm text-brand-cream/85 font-sans font-light leading-relaxed line-clamp-3">
                            {service.description}
                          </p>

                          {/* Related Sub-services Matrix */}
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            {service.subServices.map((sub, sIdx) => (
                              <div
                                key={sIdx}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 backdrop-blur-md"
                              >
                                <Check className="w-3 h-3 text-brand-gold shrink-0" />
                                <span className="text-[11px] font-sans text-brand-ivory truncate">
                                  {sub}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* CTAs */}
                          <div className="pt-3 flex items-center justify-between gap-3 border-t border-white/10">
                            <Link
                              to={`/events/${service.slug}`}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold text-brand-dark text-xs font-semibold uppercase tracking-widest hover:bg-brand-gold-light hover:shadow-[0_0_20px_rgba(201,164,92,0.4)] transition-all duration-300 group"
                            >
                              <span>Explore Service</span>
                              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>

                            <Link
                              to="/plan-your-event"
                              className="text-[11px] font-sans uppercase tracking-wider text-brand-cream/75 hover:text-brand-gold transition-colors py-1 px-2"
                            >
                              Plan This →
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Interactive Controls: Previous / Next & Counter */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/10">
            {/* Left: Active Counter */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-brand-gold tracking-widest font-semibold">
                {SERVICES_16[activeIndex]?.number}
              </span>
              <span className="text-white/20 text-xs">/</span>
              <span className="font-mono text-xs text-brand-muted tracking-widest">16</span>
              <span className="text-xs uppercase font-sans tracking-widest text-brand-cream/70 ml-2">
                {SERVICES_16[activeIndex]?.name}
              </span>
            </div>

            {/* Center: Interactive Progress Scrub Dots */}
            <div className="flex items-center gap-1.5">
              {SERVICES_16.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Jump to ${s.name}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex
                      ? 'w-7 bg-brand-gold'
                      : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Right: Stepper Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goToPrev}
                aria-label="Previous Service"
                className="w-10 h-10 rounded-full border border-brand-gold/40 text-brand-ivory hover:bg-brand-gold hover:text-brand-dark flex items-center justify-center transition-colors duration-300 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                aria-label="Next Service"
                className="w-10 h-10 rounded-full border border-brand-gold/40 text-brand-ivory hover:bg-brand-gold hover:text-brand-dark flex items-center justify-center transition-colors duration-300 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            MOBILE INTERACTION: Clean Vertical Accordion (< 768px)
            ========================================================================= */}
        <div className="block md:hidden space-y-3">
          {SERVICES_16.map((service, index) => {
            const isOpen = mobileActiveIndex === index;

            return (
              <div
                key={service.id}
                className={`rounded-xl border transition-all duration-300 overflow-hidden bg-brand-charcoal/60 backdrop-blur-md ${
                  isOpen
                    ? 'border-brand-gold/50 shadow-lg shadow-black/60'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Header Row: 01 WEDDINGS + */}
                <button
                  type="button"
                  onClick={() => setMobileActiveIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-4 text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-brand-gold tracking-widest">
                      {service.number}
                    </span>
                    <span className="text-base font-serif font-medium text-brand-ivory uppercase tracking-wider">
                      {service.name}
                    </span>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full border flex items-center justify-center transition-transform duration-300 ${
                      isOpen
                        ? 'border-brand-gold text-brand-gold rotate-45 bg-brand-gold/10'
                        : 'border-white/20 text-brand-muted'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </div>
                </button>

                {/* Expanded Drawer Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 space-y-4 border-t border-white/5">
                        {/* High-res Image visual */}
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden mt-3 shadow-inner bg-[#161616]">
                          <img
                            src={service.image}
                            alt={`${service.name} preview`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />
                          <div className="absolute bottom-3 left-3 right-3 text-xs text-brand-gold font-sans font-semibold uppercase tracking-wider">
                            {service.headline}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-brand-cream/85 font-sans font-light leading-relaxed">
                          {service.description}
                        </p>

                        {/* Related Services */}
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          {service.subServices.map((sub, sIdx) => (
                            <div
                              key={sIdx}
                              className="flex items-center gap-1.5 p-2 rounded-lg bg-black/40 border border-white/5"
                            >
                              <Check className="w-2.5 h-2.5 text-brand-gold shrink-0" />
                              <span className="text-[10px] font-sans text-brand-ivory truncate">
                                {sub}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Explore CTA */}
                        <div className="pt-2 flex items-center justify-between">
                          <Link
                            to={`/events/${service.slug}`}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold text-brand-dark text-xs font-semibold uppercase tracking-widest shadow-md"
                          >
                            <span>Explore Service</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>

                          <Link
                            to="/plan-your-event"
                            className="text-[11px] font-sans uppercase tracking-wider text-brand-cream/70 hover:text-brand-gold py-1 px-2"
                          >
                            Plan Event →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
