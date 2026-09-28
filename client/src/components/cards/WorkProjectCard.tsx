import React from 'react';
import { Play, MapPin, Calendar } from 'lucide-react';
import { WorkProjectData } from '@/data/mockData';

interface WorkProjectCardProps {
  project: WorkProjectData;
  onPlayVideo?: (project: WorkProjectData) => void;
  onClickDetails?: (project: WorkProjectData) => void;
}

export const WorkProjectCard: React.FC<WorkProjectCardProps> = ({
  project,
  onPlayVideo,
  onClickDetails,
}) => {
  return (
    <div className="group relative rounded-xl overflow-hidden bg-brand-charcoal border border-brand-border/30 hover:border-brand-gold/50 shadow-xl transition-all duration-500 flex flex-col">
      {/* Visual Thumbnail Media Area */}
      <div 
        className="relative aspect-[16/10] overflow-hidden cursor-pointer"
        onClick={() => {
          if (project.videoUrl && onPlayVideo) {
            onPlayVideo(project);
          } else if (onClickDetails) {
            onClickDetails(project);
          }
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Ambient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-black/30 group-hover:via-black/20 transition-all duration-300" />

        {/* Category Pill Tag */}
        <div className="absolute top-4 left-4 z-10">
          <span className="text-[10px] tracking-widest uppercase font-semibold font-sans px-3 py-1 rounded-full bg-brand-dark/80 backdrop-blur-md text-brand-gold border border-brand-gold/30">
            {project.category}
          </span>
        </div>

        {/* Center Video Play Button (if video exists) */}
        {project.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onPlayVideo) onPlayVideo(project);
              }}
              aria-label={`Play film for ${project.title}`}
              className="w-14 h-14 rounded-full bg-brand-gold text-brand-dark flex items-center justify-center shadow-2xl transition-all duration-300 transform group-hover:scale-110 active:scale-95 cursor-pointer"
            >
              <Play className="w-5 h-5 ml-1 fill-current" />
            </button>
          </div>
        )}
      </div>

      {/* Project Metadata Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-4 text-xs text-brand-muted mb-2 font-sans">
            <span className="inline-flex items-center gap-1 text-brand-gold">
              <MapPin className="w-3.5 h-3.5" />
              {project.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {project.date}
            </span>
          </div>

          <h3 
            onClick={() => onClickDetails && onClickDetails(project)}
            className="text-xl font-serif text-brand-ivory group-hover:text-brand-gold transition-colors duration-300 font-medium cursor-pointer"
          >
            {project.title}
          </h3>
        </div>

        {/* Services Chips */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
          {project.servicesProvided.map((service, index) => (
            <span
              key={index}
              className="text-[10px] font-sans text-brand-cream/70 bg-white/5 px-2 py-0.5 rounded"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkProjectCard;
