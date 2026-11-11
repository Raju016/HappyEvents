import React, { useState } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight, Star, Award } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import ReviewCard from '@/components/cards/ReviewCard';
import { REVIEWS } from '@/data/mockData';

export const ReviewsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 6;
  const totalPages = Math.ceil(REVIEWS.length / reviewsPerPage);

  const paginatedReviews = REVIEWS.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  );

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="reviews"
      className="scroll-mt-24 bg-brand-dark text-brand-ivory py-24 md:py-32 relative overflow-hidden"
    >
      {/* Subtle ambient atmosphere, consistent with the site's dark luxury theme */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading
          theme="dark"
          eyebrow="CLIENT TESTIMONIALS"
          title="Loved by Families, Powered by Trust"
          subtitle="Genuine verified feedback from couples, families, and hosts across Hyderabad and India who trusted Happy Events with their milestone celebrations."
        />

        {/* WedMeGood Trust Banner */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-12 text-xs md:text-sm text-brand-cream/80 font-sans">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-surface/80 border border-brand-gold/30 shadow-md">
            <Award className="w-4 h-4 text-brand-gold" />
            <span className="font-medium text-brand-ivory">Verified Vendor on WedMeGood</span>
          </div>
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-surface/80 border border-white/5">
            <div className="flex text-brand-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-brand-gold ml-1">5.0 Star Rating</span>
            <span className="text-brand-muted">• 90+ Client Reviews</span>
          </div>
        </div>

        {/* Clean Responsive Review Cards Grid: 3 Desktop, 2 Tablet, 1 Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {paginatedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Pagination Controls & Read All External Link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-white/5">
          {/* Pagination buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-brand-surface border border-white/10 hover:border-brand-gold/50 text-brand-ivory hover:text-brand-gold transition-colors cursor-pointer"
              aria-label="Previous page of reviews"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono uppercase tracking-wider text-brand-muted">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-brand-surface border border-white/10 hover:border-brand-gold/50 text-brand-ivory hover:text-brand-gold transition-colors cursor-pointer"
              aria-label="Next page of reviews"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Read All Reviews Direct External Link */}
          <a
            href="https://www.wedmegood.com/profile/happy-events--1607934/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xs md:text-sm font-sans tracking-widest uppercase text-brand-gold hover:text-amber-300 transition-colors font-medium"
          >
            <span>Read All 90+ Reviews on WedMeGood</span>
            <ExternalLink className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
