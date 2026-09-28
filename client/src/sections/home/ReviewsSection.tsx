import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { REVIEWS } from '@/data/mockData';
import SectionHeading from '@/components/ui/SectionHeading';
import ReviewCard from '@/components/cards/ReviewCard';

export const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // We display 3 cards on desktop at a time, or scroll through them
  const maxIndex = Math.max(0, REVIEWS.length - 1);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="bg-brand-charcoal text-brand-ivory py-24 md:py-32 border-t border-brand-border/20 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <SectionHeading
          theme="dark"
          eyebrow="OUR CLIENTS SAY"
          title="Real Experiences. Happy Clients."
          subtitle="The trust and happiness of our clients is what drives us to create better events every day."
        />

        {/* Development Data Notice Disclaimer */}
        <div className="flex items-center justify-center gap-2 mb-8 text-[11px] font-mono text-brand-gold/80">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Note: Development sample reviews shown for design preview. Genuine client reviews published via Admin Panel.</span>
        </div>

        {/* Carousel Desktop View (3 Cards) & Mobile Single Card View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {REVIEWS.slice(0, 3).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Interactive Controls & Dots */}
        <div className="flex items-center justify-between max-w-xs mx-auto pt-4">
          <button
            onClick={prevReview}
            aria-label="Previous review"
            className="w-11 h-11 rounded-full border border-brand-gold/40 hover:bg-brand-gold hover:text-brand-dark flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {REVIEWS.slice(0, 3).map((_, idx) => (
              <span
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-brand-gold' : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextReview}
            aria-label="Next review"
            className="w-11 h-11 rounded-full border border-brand-gold/40 hover:bg-brand-gold hover:text-brand-dark flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
