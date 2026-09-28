import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';
import { ReviewData } from '@/data/mockData';

interface ReviewCardProps {
  review: ReviewData;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="relative rounded-2xl bg-brand-surface/90 border border-brand-border/30 p-8 flex flex-col justify-between shadow-xl hover:border-brand-gold/40 transition-all duration-300 group">
      {/* Decorative Quote Mark */}
      <div className="absolute top-6 right-6 text-brand-gold/15 group-hover:text-brand-gold/25 transition-colors">
        <Quote className="w-10 h-10" />
      </div>

      <div className="space-y-6">
        {/* Star Rating */}
        <div className="flex items-center gap-1 text-brand-gold">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating ? 'fill-current text-brand-gold' : 'text-neutral-600'
              }`}
            />
          ))}
        </div>

        {/* Review Quote Body */}
        <p className="text-sm md:text-base font-serif italic text-brand-cream/90 leading-relaxed">
          &ldquo;{review.reviewText}&rdquo;
        </p>
      </div>

      {/* Customer Attribution Footer */}
      <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-4">
        <img
          src={review.customerPhoto}
          alt={review.customerName}
          className="w-12 h-12 rounded-full object-cover border border-brand-gold/40"
          loading="lazy"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-sans font-semibold text-brand-ivory">
              {review.customerName}
            </h4>
            {review.isDemo && (
              <span className="text-[9px] font-mono uppercase bg-brand-gold/10 text-brand-gold px-1.5 py-0.5 rounded border border-brand-gold/20">
                Demo
              </span>
            )}
          </div>
          {review.role && (
            <p className="text-xs text-brand-muted font-sans font-light">
              {review.role}
            </p>
          )}
          <div className="flex items-center gap-1 text-[11px] text-brand-gold/90 mt-0.5 font-sans">
            <MapPin className="w-3 h-3" />
            <span>{review.eventTitle} • {review.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
