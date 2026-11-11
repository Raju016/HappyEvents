import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import DepthCarousel, { DepthCarouselCard } from '@/components/carousel/DepthCarousel';
import { EVENT_CATEGORIES, EventCategoryData } from '@/data/mockData';

export const AllEventsSection: React.FC = () => {
  const navigate = useNavigate();

  // Maps your real EVENT_CATEGORIES (all 19) into the shape DepthCarousel expects.
  // tagline -> category eyebrow, name -> title, description stays as-is.
  const carouselCards: DepthCarouselCard[] = useMemo(
    () =>
      EVENT_CATEGORIES.map((cat) => ({
        id: cat.id,
        category: cat.tagline,
        title: cat.name,
        description: cat.description,
        image: cat.image,
        alt: `${cat.name} — ${cat.tagline}`,
      })),
    []
  );

  const handleCardClick = (card: DepthCarouselCard) => {
    const matched = EVENT_CATEGORIES.find(
      (cat: EventCategoryData) => cat.id === card.id
    );
    if (matched) navigate(`/events/${matched.slug}`);
  };

  return (
    <section
      id="all-events"
      className="scroll-mt-24 bg-brand-dark text-brand-ivory py-24 md:py-32 relative overflow-hidden"
    >
      {/* Dynamic ambient gold glows with slow pulsing animation */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/15 rounded-full blur-[130px] pointer-events-none -mr-32 -mt-32"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.16, 0.08],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none -ml-32 -mb-32"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Subtle Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-charcoal/90 border border-brand-gold/30 text-brand-gold text-[10px] uppercase font-sans tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3 h-3" />
            <span>16 Signature Event Categories</span>
          </div>

          <SectionHeading
            theme="dark"
            eyebrow="EXPLORE OUR PORTFOLIO"
            title="All Celebrations & Events"
            subtitle="Explore our curated collection of signature celebrations. Swipe, drag, or click to discover each bespoke event type."
            className="mb-8"
          />

          {/* Animated Gold Divider Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-brand-gold to-transparent mb-12 origin-center"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <DepthCarousel cards={carouselCards} onCardClick={handleCardClick} />
      </motion.div>
    </section>
  );
};

export default AllEventsSection;
