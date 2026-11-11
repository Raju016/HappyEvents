import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './DepthCarousel.css';

export interface DepthCarouselCard {
  id: string;
  image: string;
  category: string;
  title: string;
  description: string;
  alt?: string;
}

interface DepthCarouselProps {
  cards: DepthCarouselCard[];
  onCardClick?: (card: DepthCarouselCard) => void;
  className?: string;
}

interface Keyframe {
  x: number;
  z: number;
  rotY: number;
  scale: number;
  opacity: number;
  blur: number;
}

// Reference depth keyframes at integer card-distances from the active card.
// Values between these are linearly interpolated for continuous motion.
const KEYFRAMES: Keyframe[] = [
  { x: 0, z: 0, rotY: 0, scale: 1, opacity: 1, blur: 0 },
  { x: 230, z: -110, rotY: 32, scale: 0.88, opacity: 0.82, blur: 0 },
  { x: 400, z: -260, rotY: 68, scale: 0.68, opacity: 0.42, blur: 4 },
  { x: 480, z: -360, rotY: 85, scale: 0.52, opacity: 0.14, blur: 9 },
];
// Synthetic terminal keyframe — anything beyond this fades out of the render window.
const EDGE_KEYFRAME: Keyframe = { x: 560, z: -420, rotY: 87, scale: 0.4, opacity: 0, blur: 13 };

const MAX_RENDER_DISTANCE = 4.3;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpKeyframe(a: Keyframe, b: Keyframe, t: number): Keyframe {
  return {
    x: lerp(a.x, b.x, t),
    z: lerp(a.z, b.z, t),
    rotY: lerp(a.rotY, b.rotY, t),
    scale: lerp(a.scale, b.scale, t),
    opacity: lerp(a.opacity, b.opacity, t),
    blur: lerp(a.blur, b.blur, t),
  };
}

function getKeyframeForDistance(absDistance: number): Keyframe {
  const capped = Math.min(absDistance, MAX_RENDER_DISTANCE);
  const lowerIndex = Math.min(Math.floor(capped), KEYFRAMES.length - 1);
  const kfA = KEYFRAMES[lowerIndex];
  const kfB = lowerIndex < KEYFRAMES.length - 1 ? KEYFRAMES[lowerIndex + 1] : EDGE_KEYFRAME;
  const segmentLength = lowerIndex < KEYFRAMES.length - 1 ? 1 : MAX_RENDER_DISTANCE - (KEYFRAMES.length - 1);
  const frac = segmentLength > 0 ? (capped - lowerIndex) / segmentLength : 0;
  return lerpKeyframe(kfA, kfB, Math.min(frac, 1));
}

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

export const DepthCarousel: React.FC<DepthCarouselProps> = ({
  cards,
  onCardClick,
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(cards.length / 2));
  const [dragOffsetPx, setDragOffsetPx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  const stageRef = useRef<HTMLDivElement>(null);
  const pointerStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const lastPointerX = useRef(0);
  const lastPointerT = useRef(0);
  const velocityRef = useRef(0);
  const totalDragDistance = useRef(0);
  const isHorizontalDrag = useRef<boolean | null>(null);
  const lastWheelTime = useRef(0);

  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 767px)');
    const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateMobile = () => setIsMobile(mqMobile.matches);
    const updateReduced = () => setReducedMotion(mqReduced.matches);

    updateMobile();
    updateReduced();

    mqMobile.addEventListener('change', updateMobile);
    mqReduced.addEventListener('change', updateReduced);
    return () => {
      mqMobile.removeEventListener('change', updateMobile);
      mqReduced.removeEventListener('change', updateReduced);
    };
  }, []);

  useEffect(() => {
    setLiveAnnouncement(`Showing ${activeIndex + 1} of ${cards.length}: ${cards[activeIndex]?.title}`);
  }, [activeIndex, cards]);

  const cardStepPx = isMobile ? 130 : 230;
  const mobileScale = isMobile ? 0.56 : 1;

  const clampIndex = useCallback(
    (idx: number) => Math.max(0, Math.min(cards.length - 1, idx)),
    [cards.length]
  );

  const goTo = useCallback(
    (idx: number) => {
      setActiveIndex(clampIndex(idx));
    },
    [clampIndex]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // ---------- Pointer / drag handling ----------
  const handlePointerDown = (e: React.PointerEvent) => {
    if (reducedMotion) return;
    setIsDragging(true);
    pointerStartX.current = e.clientX;
    dragStartOffset.current = dragOffsetPx;
    lastPointerX.current = e.clientX;
    lastPointerT.current = performance.now();
    velocityRef.current = 0;
    totalDragDistance.current = 0;
    isHorizontalDrag.current = null;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const now = performance.now();
    const deltaFromStart = e.clientX - pointerStartX.current;
    totalDragDistance.current = Math.abs(deltaFromStart);

    const dt = now - lastPointerT.current;
    if (dt > 0) {
      velocityRef.current = (e.clientX - lastPointerX.current) / dt;
    }
    lastPointerX.current = e.clientX;
    lastPointerT.current = now;

    // Sensitivity multiplier — slightly amplified so small drags feel responsive
    const SENSITIVITY = 1.35;
    setDragOffsetPx(dragStartOffset.current + deltaFromStart * SENSITIVITY);
  };

  const settleDrag = useCallback(() => {
    const MOMENTUM_FACTOR = 110;
    const rawSteps = -dragOffsetPx / cardStepPx;
    const momentumSteps = -(velocityRef.current * MOMENTUM_FACTOR) / cardStepPx;
    const indexDelta = Math.round(rawSteps + momentumSteps);

    setDragOffsetPx(0);
    if (indexDelta !== 0) {
      goTo(activeIndex + indexDelta);
    }
  }, [activeIndex, cardStepPx, dragOffsetPx, goTo]);

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    settleDrag();
  };

  // ---------- Wheel handling ----------
  const handleWheel = (e: React.WheelEvent) => {
    if (reducedMotion) return;
    const now = performance.now();
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 12) return;
    if (now - lastWheelTime.current < 420) return;
    e.preventDefault();
    lastWheelTime.current = now;
    if (delta > 0) goNext();
    else goPrev();
  };

  // ---------- Keyboard handling ----------
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    }
  };

  const handleCardClick = (card: DepthCarouselCard, index: number) => {
    if (totalDragDistance.current > 8) return; // was a drag, not a click
    if (index === activeIndex) {
      onCardClick?.(card);
    } else {
      goTo(index);
    }
  };

  // ---------- Render window (perf: skip cards far outside view) ----------
  const visibleEntries = useMemo(() => {
    return cards
      .map((card, index) => {
        const rawDistance = index - activeIndex - dragOffsetPx / cardStepPx;
        return { card, index, rawDistance, absDistance: Math.abs(rawDistance) };
      })
      .filter((entry) => entry.absDistance <= MAX_RENDER_DISTANCE);
  }, [cards, activeIndex, dragOffsetPx, cardStepPx]);

  if (reducedMotion) {
    return (
      <div className={className}>
        <div className="depth-carousel-fallback px-4">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => onCardClick?.(card)}
              className="w-64 text-left rounded-2xl overflow-hidden bg-brand-surface border border-brand-border/40"
              aria-label={`${card.category}: ${card.title}`}
            >
              <div className="relative h-72">
                <img
                  src={card.image}
                  alt={card.alt || `${card.title} — ${card.category} event`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-brand-gold font-sans">
                    {card.category}
                  </span>
                  <h3 className="text-lg font-serif text-brand-ivory">{card.title}</h3>
                  <p className="text-xs text-brand-cream/75 font-sans font-light line-clamp-3">
                    {card.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
        <CarouselControls
          onPrev={goPrev}
          onNext={goNext}
          disablePrev={activeIndex === 0}
          disableNext={activeIndex === cards.length - 1}
        />
      </div>
    );
  }

  const cardWidth = isMobile ? 220 : 320;
  const cardHeight = isMobile ? 300 : 420;

  return (
    <div className={className}>
      <p className="sr-only" aria-live="polite">
        {liveAnnouncement}
      </p>

      <div
        ref={stageRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="All Events"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="depth-carousel-stage relative w-full focus:outline-none"
        style={{ height: cardHeight + 40 }}
      >
        <div className="depth-carousel-track">
          {visibleEntries.map(({ card, index, rawDistance, absDistance }) => {
            const sign = rawDistance === 0 ? 0 : Math.sign(rawDistance);
            const kf = getKeyframeForDistance(absDistance);
            const translateX = sign * kf.x * (isMobile ? mobileScale : 1);
            const translateZ = kf.z * (isMobile ? mobileScale : 1);
            const rotateY = -sign * kf.rotY;
            const isActive = absDistance < 0.05;

            const transform = `translate(-50%, ${isActive ? -8 : 0}px) translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${kf.scale})`;

            return (
              <div
                key={card.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${cards.length}: ${card.title}`}
                aria-hidden={!isActive}
                onClick={() => handleCardClick(card, index)}
                className={`depth-carousel-card ${isDragging ? 'is-dragging' : ''} ${
                  isActive ? 'is-active' : ''
                }`}
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  transform,
                  opacity: kf.opacity,
                  filter: kf.blur > 0 ? `blur(${kf.blur}px)` : 'none',
                  zIndex: 100 - Math.round(absDistance * 10),
                  transition: isDragging
                    ? 'none'
                    : `transform 650ms ${EASE}, opacity 650ms ${EASE}, filter 650ms ${EASE}`,
                }}
              >
                <div
                  className={`relative w-full h-full rounded-2xl overflow-hidden bg-brand-charcoal border ${
                    isActive
                      ? 'border-brand-gold/50 shadow-[0_35px_70px_-20px_rgba(0,0,0,0.75)]'
                      : 'border-white/10 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.6)]'
                  }`}
                >
                  <img
                    src={card.image}
                    alt={card.alt || `${card.title} — ${card.category} event`}
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                    loading={isActive ? 'eager' : 'lazy'}
                  />
                  {/* Frosted-glass tint — strengthens as the card recedes */}
                  <div
                    className="absolute inset-0 backdrop-blur-[1px]"
                    style={{
                      background: `rgba(17,17,17,${Math.min(0.1 + absDistance * 0.18, 0.75)})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />

                  {isActive && (
                    <div className="absolute inset-3 rounded-xl border border-white/10 pointer-events-none" />
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 space-y-1.5">
                    <span className="text-[10px] uppercase tracking-widest text-brand-gold font-sans font-semibold">
                      {card.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif text-brand-ivory font-medium">
                      {card.title}
                    </h3>
                    <p className="text-xs text-brand-cream/75 font-sans font-light leading-relaxed line-clamp-2">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <CarouselControls
        onPrev={goPrev}
        onNext={goNext}
        disablePrev={activeIndex === 0}
        disableNext={activeIndex === cards.length - 1}
      />
    </div>
  );
};

const CarouselControls: React.FC<{
  onPrev: () => void;
  onNext: () => void;
  disablePrev: boolean;
  disableNext: boolean;
}> = ({ onPrev, onNext, disablePrev, disableNext }) => (
  <div className="flex items-center justify-center gap-4 mt-8">
    <button
      type="button"
      onClick={onPrev}
      disabled={disablePrev}
      aria-label="Previous event"
      className="w-11 h-11 rounded-full border border-brand-gold/40 text-brand-ivory hover:bg-brand-gold hover:text-brand-dark disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brand-ivory flex items-center justify-center transition-colors duration-300 cursor-pointer disabled:cursor-not-allowed"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
    <span className="text-[11px] uppercase tracking-widest text-brand-muted font-sans">
      Drag the cards or use the buttons
    </span>
    <button
      type="button"
      onClick={onNext}
      disabled={disableNext}
      aria-label="Next event"
      className="w-11 h-11 rounded-full border border-brand-gold/40 text-brand-ivory hover:bg-brand-gold hover:text-brand-dark disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brand-ivory flex items-center justify-center transition-colors duration-300 cursor-pointer disabled:cursor-not-allowed"
    >
      <ChevronRight className="w-5 h-5" />
    </button>
  </div>
);

export default DepthCarousel;
