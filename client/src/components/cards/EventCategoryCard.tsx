import React from 'react';
import { ArrowUpRight, LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { EventCategoryData } from '@/data/mockData';

interface EventCategoryCardProps {
  category: EventCategoryData;
  onClick?: () => void;
}

export const EventCategoryCard: React.FC<EventCategoryCardProps> = ({
  category,
  onClick,
}) => {
  // Dynamically resolve icon from lucide
  const IconComponent = (Icons[category.icon as keyof typeof Icons] as LucideIcon) || Icons.Sparkles;

  return (
    <div
      onClick={onClick}
      className="group relative h-96 md:h-[420px] rounded-xl overflow-hidden cursor-pointer bg-brand-charcoal border border-neutral-200/80 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-6"
    >
      {/* Background Image with Dark Vignette */}
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />

      {/* Editorial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 transition-opacity duration-300 group-hover:from-black" />

      {/* Floating Category Icon & Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-dark transition-colors duration-300">
          <IconComponent className="w-4 h-4" />
        </div>
      </div>

      {/* Floating Arrow Icon (Top Right) */}
      <div className="absolute top-4 right-4 z-10">
        <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-dark transition-all duration-300 group-hover:rotate-45">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 space-y-2">
        <span className="text-[10px] tracking-widest uppercase font-semibold text-brand-gold font-sans block">
          {category.tagline}
        </span>
        <h3 className="text-2xl font-serif text-brand-ivory font-medium tracking-wide">
          {category.name}
        </h3>
        <p className="text-xs text-brand-cream/80 line-clamp-2 font-sans font-light leading-relaxed transform transition-all duration-300 group-hover:text-brand-ivory">
          {category.description}
        </p>

        {/* Subtle Gold line reveal on hover */}
        <div className="w-8 h-[2px] bg-brand-gold/60 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 pt-0.5" />
      </div>
    </div>
  );
};

export default EventCategoryCard;
