import React, { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Play, Sparkles } from 'lucide-react';
import { WorkProjectData } from '@/data/mockData';
import Button from '@/components/ui/Button';
import { Link } from 'react-router-dom';

interface ProjectGalleryModalProps {
  isOpen: boolean;
  project: WorkProjectData | null;
  onClose: () => void;
  onPlayVideo?: (project: WorkProjectData) => void;
}

export const ProjectGalleryModal: React.FC<ProjectGalleryModalProps> = ({
  isOpen,
  project,
  onClose,
  onPlayVideo,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Collect all gallery images for this project
  const images = React.useMemo(() => {
    if (!project) return [];
    if (project.galleryImages && project.galleryImages.length > 0) {
      return project.galleryImages;
    }
    return [project.image];
  }, [project]);

  // Reset index when project changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  // Keyboard controls: Escape to close, Left/Right arrows to navigate
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    },
    [isOpen, images.length, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !project) return null;

  const currentImage = images[activeImageIndex] || project.image;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-brand-surface rounded-2xl border border-brand-gold/30 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-brand-dark/80">
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-widest uppercase font-semibold font-sans px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/40">
              {project.category}
            </span>
            <h2
              id="gallery-title"
              className="text-lg md:text-xl font-serif text-brand-ivory truncate max-w-md sm:max-w-xl"
            >
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-brand-muted hover:text-brand-ivory hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close project gallery"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto flex flex-col md:flex-row">
          {/* Main Visual Image Display with Nav Buttons */}
          <div className="relative flex-1 bg-black/60 flex items-center justify-center min-h-[320px] md:min-h-[460px] overflow-hidden group">
            <img
              src={currentImage}
              alt={`${project.title} - photograph ${activeImageIndex + 1}`}
              className="max-h-[60vh] md:max-h-[68vh] w-auto max-w-full object-contain transition-all duration-300"
            />

            {/* Previous Button */}
            {images.length > 1 && (
              <button
                onClick={() =>
                  setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-brand-gold hover:text-brand-dark text-brand-ivory transition-all duration-200 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next Button */}
            {images.length > 1 && (
              <button
                onClick={() =>
                  setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-brand-gold hover:text-brand-dark text-brand-ivory transition-all duration-200 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Image Counter Badge */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-4 px-2.5 py-1 rounded bg-black/70 text-[11px] font-mono text-brand-ivory tracking-wider border border-white/10">
                {activeImageIndex + 1} / {images.length}
              </div>
            )}
          </div>

          {/* Project Details Sidebar */}
          <div className="w-full md:w-80 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 bg-brand-surface/95 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs text-brand-muted font-sans">
                  <span className="inline-flex items-center gap-1 text-brand-gold">
                    <MapPin className="w-3.5 h-3.5" />
                    {project.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {project.date}
                  </span>
                </div>
                {project.guestCount && (
                  <p className="text-xs text-brand-muted font-sans">
                    Attendance: <span className="text-brand-ivory font-medium">{project.guestCount}+ Guests</span>
                  </p>
                )}
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-brand-gold font-sans font-semibold mb-2">
                  Scope & Services
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.servicesProvided.map((service, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-sans text-brand-ivory/85 bg-white/5 border border-white/5 px-2.5 py-1 rounded"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Gallery Thumbnails (if multiple images) */}
              {images.length > 1 && (
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-brand-gold font-sans font-semibold mb-2">
                    Event Gallery
                  </h4>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                          idx === activeImageIndex
                            ? 'border-brand-gold scale-105 shadow-md shadow-brand-gold/20'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-4 border-t border-white/10">
              {project.videoUrl && onPlayVideo && (
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    onClose();
                    onPlayVideo(project);
                  }}
                  className="mb-2"
                >
                  <Play className="w-3.5 h-3.5 mr-2" />
                  <span>Watch Event Film</span>
                </Button>
              )}
              <Link to="/plan-your-event" onClick={onClose} className="block w-full">
                <Button variant="primary" size="sm" fullWidth>
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  <span>Inquire About This Design</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectGalleryModal;
