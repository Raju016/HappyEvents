import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeading from '@/components/ui/SectionHeading';
import EventCategoryCard from '@/components/cards/EventCategoryCard';
import { EVENT_CATEGORIES, EventCategoryData } from '@/data/mockData';

export const EventsPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const filteredCategories = useMemo(() => {
    if (!query.trim()) return EVENT_CATEGORIES;
    const q = query.trim().toLowerCase();
    return EVENT_CATEGORIES.filter(
      (cat) =>
        cat.name.toLowerCase().includes(q) ||
        cat.tagline.toLowerCase().includes(q) ||
        cat.description.toLowerCase().includes(q)
    );
  }, [query]);

  const handleCategoryClick = (category: EventCategoryData) => {
    navigate(`/events/${category.slug}`);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-brand-ivory flex flex-col font-sans selection:bg-brand-gold selection:text-brand-dark">
      <Navbar />

      <main className="flex-1">
        {/* Page Header */}
        <section className="pt-40 pb-16 md:pt-48 md:pb-20 bg-brand-dark relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              theme="dark"
              eyebrow="ALL EVENT CATEGORIES"
              title="Every Occasion, Beautifully Planned"
              subtitle="From royal weddings and stadium concerts to executive corporate galas — explore all 16 signature event categories we manage, end to end."
            />

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search event types…"
                className="w-full bg-brand-surface border border-white/10 rounded-full pl-11 pr-5 py-3 text-sm text-brand-ivory placeholder:text-brand-muted focus:outline-none focus:border-brand-gold/50 transition-colors font-sans"
              />
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="pb-24 md:pb-32">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-sm text-brand-muted font-sans mb-10">
              Showing {filteredCategories.length} of {EVENT_CATEGORIES.length} categories
            </p>

            {filteredCategories.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredCategories.map((cat) => (
                  <EventCategoryCard
                    key={cat.id}
                    category={cat}
                    onClick={() => handleCategoryClick(cat)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-brand-muted font-sans">
                  No event categories match "{query}". Try a different search, or reach
                  out — we design custom bespoke events too.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EventsPage;
