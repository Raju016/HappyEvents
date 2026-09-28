import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EVENT_CATEGORIES, EventCategoryData } from '@/data/mockData';
import SectionHeading from '@/components/ui/SectionHeading';
import EventCategoryCard from '@/components/cards/EventCategoryCard';
import Button from '@/components/ui/Button';

export const AllEventsSection: React.FC = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  // Top 10 primary categories for initial display
  const displayedCategories = showAll
    ? EVENT_CATEGORIES
    : EVENT_CATEGORIES.slice(0, 10);

  const handleCategoryClick = (category: EventCategoryData) => {
    navigate(`/events/${category.slug}`);
  };

  return (
    <section className="bg-brand-ivory text-brand-dark py-24 md:py-32 relative overflow-hidden transition-colors duration-500">
      {/* Decorative Subtle Background Flourish */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cream/50 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none -ml-32 -mb-32" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading with Warm Ivory / Light Theme */}
        <SectionHeading
          theme="light"
          eyebrow="ALL EVENTS"
          title="Every Occasion, Beautifully Planned"
          subtitle="From grand weddings to intimate celebrations, corporate summits to cultural festivals — we bring your vision to life with flawless elegance."
        />

        {/* 2-column on mobile, 3-column on tablet, up to 5-column on wide desktop as specified */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-14">
          {displayedCategories.map((cat) => (
            <EventCategoryCard
              key={cat.id}
              category={cat}
              onClick={() => handleCategoryClick(cat)}
            />
          ))}
        </div>

        {/* Category Expansion CTA */}
        <div className="text-center pt-2">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setShowAll(!showAll)}
            className="border-brand-dark/40 text-brand-dark hover:bg-brand-dark hover:text-brand-ivory"
          >
            {showAll ? 'Show Top Categories' : `Explore All 20 Event Categories →`}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AllEventsSection;
