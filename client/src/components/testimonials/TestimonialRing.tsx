import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import './TestimonialRing.css';

export interface TestimonialRingItem {
  id: string;
  customerName: string;
  role?: string;
  customerPhoto: string;
  rating: number;
  reviewText: string;
  eventTitle: string;
}

interface TestimonialRingProps {
  reviews: TestimonialRingItem[];
  className?: string;
}

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const DRAG_SENSITIVITY = 0.32; // degrees per pixel dragged
const FRICTION_PER_SEC = 0.0025; // exponential velocity decay
const AUTO_ROTATE_INTERVAL = 5200;
const AUTO_RESUME_DELAY = 3200;

function normalizeAngle(deg: number) {
  let a = deg % 360;
  if (a > 180) a -= 360;
  if (a < -180) a += 360;
  return a;
}

// Shortest signed path from `current` to the nearest equivalent of `target`.
function shortestTarget(current: number, target: number) {
  const diff = normalizeAngle(target - current);
  return current + diff;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export const TestimonialRing: React.FC<TestimonialRingProps> = ({
  reviews,
  className = '',
}) => {
  const count = reviews.length;
  const angleStep = 360 / count;

  const [rotationDeg, setRotationDeg] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMomentumActive, setIsMomentumActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [autoPaused, setAutoPaused] = useState(false);
  const [tiltDeg, setTiltDeg] = useState(0);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  const stageRef = useRef<HTMLDivElement>(null);
  const pointerStartX = useRef(0);
  const dragStartRotation = useRef(0);
  const lastPointerX = useRef(0);
  const lastPointerT = useRef(0);
  const velocityRef = useRef(0); // degrees per ms
  const totalDragDistance = useRef(0);
  const momentumRafRef = useRef<number | null>(null);
  const lastWheelTime = useRef(0);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Radius is sized so each card's width fits within its own slice of the
  // ring's circumference (with ~20% margin for visible gaps between cards) —
  // card width must stay comfortably under radius * angleStep(rad) * 0.8,
  // otherwise neighboring cards overlap instead of showing gaps between them.
  const radius = isMobile ? 320 : 460;
  const cardWidth = isMobile ? 160 : 230;
  const cardHeight = isMobile ? 240 : 340;

  const activeIndex = useMemo(() => {
    const raw = Math.round(-rotationDeg / angleStep);
    return ((raw % count) + count) % count;
  }, [rotationDeg, angleStep, count]);

  useEffect(() => {
    setLiveAnnouncement(
      `Showing testimonial ${activeIndex + 1} of ${count}: ${reviews[activeIndex]?.customerName}`
    );
  }, [activeIndex, count, reviews]);

  const clearMomentum = useCallback(() => {
    if (momentumRafRef.current !== null) {
      cancelAnimationFrame(momentumRafRef.current);
      momentumRafRef.current = null;
    }
    setIsMomentumActive(false);
  }, []);

  const snapToNearest = useCallback(
    (fromRotation: number) => {
      const nearestIndex = ((Math.round(-fromRotation / angleStep) % count) + count) % count;
      const target = shortestTarget(fromRotation, -nearestIndex * angleStep);
      setIsMomentumActive(false);
      setRotationDeg(target);
    },
    [angleStep, count]
  );

  const runMomentum = useCallback(() => {
    setIsMomentumActive(true);
    let lastT = performance.now();

    const step = (t: number) => {
      const dt = t - lastT;
      lastT = t;
      const vel = velocityRef.current;

      if (Math.abs(vel) < 0.012 || dt <= 0) {
        setRotationDeg((r) => {
          snapToNearest(r);
          return r;
        });
        momentumRafRef.current = null;
        return;
      }

      setRotationDeg((r) => r + vel * dt);
      velocityRef.current = vel * Math.pow(FRICTION_PER_SEC, dt / 1000);
      momentumRafRef.current = requestAnimationFrame(step);
    };

    momentumRafRef.current = requestAnimationFrame(step);
  }, [snapToNearest]);

  // ---------- Auto-rotate ----------
  const pauseAuto = useCallback(() => {
    setAutoPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  const scheduleResume = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setAutoPaused(false), AUTO_RESUME_DELAY);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      if (autoPaused || isDragging || isMomentumActive) return;
      setRotationDeg((r) => shortestTarget(r, r - angleStep));
    }, AUTO_ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, [autoPaused, isDragging, isMomentumActive, angleStep, reducedMotion]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      if (momentumRafRef.current !== null) cancelAnimationFrame(momentumRafRef.current);
    };
  }, []);

  // ---------- Pointer / drag handling ----------
  const handlePointerDown = (e: React.PointerEvent) => {
    if (reducedMotion) return;
    clearMomentum();
    pauseAuto();
    setIsDragging(true);
    pointerStartX.current = e.clientX;
    dragStartRotation.current = rotationDeg;
    lastPointerX.current = e.clientX;
    lastPointerT.current = performance.now();
    velocityRef.current = 0;
    totalDragDistance.current = 0;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const now = performance.now();
    const deltaFromStart = e.clientX - pointerStartX.current;
    totalDragDistance.current = Math.abs(deltaFromStart);

    const dt = now - lastPointerT.current;
    if (dt > 0) {
      velocityRef.current = ((e.clientX - lastPointerX.current) * DRAG_SENSITIVITY) / dt;
    }
    lastPointerX.current = e.clientX;
    lastPointerT.current = now;

    setRotationDeg(dragStartRotation.current + deltaFromStart * DRAG_SENSITIVITY);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    scheduleResume();
    if (Math.abs(velocityRef.current) > 0.02) {
      runMomentum();
    } else {
      setRotationDeg((r) => {
        snapToNearest(r);
        return r;
      });
    }
  };

  // ---------- Wheel ----------
  const handleWheel = (e: React.WheelEvent) => {
    if (reducedMotion) return;
    const now = performance.now();
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 12) return;
    if (now - lastWheelTime.current < 420) return;
    e.preventDefault();
    lastWheelTime.current = now;
    pauseAuto();
    scheduleResume();
    clearMomentum();
    setRotationDeg((r) => shortestTarget(r, r + (delta > 0 ? -angleStep : angleStep)));
  };

  // ---------- Keyboard ----------
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    }
  };

  const goToIndex = useCallback(
    (index: number) => {
      clearMomentum();
      pauseAuto();
      scheduleResume();
      setRotationDeg((r) => shortestTarget(r, -index * angleStep));
    },
    [angleStep, clearMomentum, pauseAuto, scheduleResume]
  );

  const goNext = useCallback(
    () => goToIndex((activeIndex + 1) % count),
    [activeIndex, count, goToIndex]
  );
  const goPrev = useCallback(
    () => goToIndex((activeIndex - 1 + count) % count),
    [activeIndex, count, goToIndex]
  );

  const handleCardClick = (index: number) => {
    if (totalDragDistance.current > 8) return;
    if (index !== activeIndex) goToIndex(index);
  };

  // ---------- Subtle mouse parallax ----------
  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion || isDragging || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltDeg(Math.max(-4, Math.min(4, relY * -8)));
  };
  const handleMouseLeave = () => setTiltDeg(0);

  const transitionEnabled = !isDragging && !isMomentumActive;

  if (reducedMotion) {
    return (
      <div className={className}>
        <div className="ring-fallback px-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="w-72 rounded-2xl bg-brand-surface/80 border border-brand-gold/20 p-6 space-y-3"
            >
              <StarRow rating={review.rating} />
              <p className="text-sm text-brand-cream/85 font-sans font-light leading-relaxed line-clamp-5">
                &ldquo;{review.reviewText}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src={review.customerPhoto}
                  alt={review.customerName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm text-brand-ivory font-sans font-medium">
                    {review.customerName}
                  </p>
                  <p className="text-xs text-brand-gold font-sans">{review.eventTitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <RingControls
          onPrev={goPrev}
          onNext={goNext}
          activeIndex={activeIndex}
          count={count}
          onDotClick={goToIndex}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="sr-only" aria-live="polite">
        {liveAnnouncement}
      </p>

      <div
        ref={stageRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={(e) => {
          handlePointerUp();
          handleMouseLeave();
          if (e.pointerType === 'mouse') pauseAuto();
        }}
        onPointerCancel={handlePointerUp}
        onPointerEnter={() => pauseAuto()}
        onMouseMove={handleMouseMove}
        className="ring-stage relative w-full focus:outline-none"
        style={{ height: cardHeight + 60 }}
      >
        <div
          className="ring-wrapper"
          style={{
            transform: `rotateX(${tiltDeg}deg)`,
            transition: 'transform 400ms ease-out',
          }}
        >
          <div
            style={{
              transformStyle: 'preserve-3d',
              width: '100%',
              height: '100%',
              position: 'relative',
              transform: `rotateY(${rotationDeg}deg)`,
              transition: transitionEnabled ? `transform 700ms ${EASE}` : 'none',
            }}
          >
            {reviews.map((review, index) => {
              const baseAngle = index * angleStep;
              const effective = normalizeAngle(baseAngle + rotationDeg);
              const absAngle = Math.abs(effective);
              const isActive = absAngle < angleStep / 2;
              const t = Math.min(absAngle / 180, 1);

              const opacity = lerp(1, 0.4, t);
              const blurPx = lerp(0, 2.4, t);
              const overlayAlpha = lerp(0.1, 0.62, t);

              return (
                <div
                  key={review.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${count}: ${review.customerName}, ${review.eventTitle}`}
                  aria-hidden={!isActive}
                  onClick={() => handleCardClick(index)}
                  className={`ring-card ${isDragging ? 'is-dragging' : ''} ${
                    isActive ? 'is-active' : ''
                  }`}
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    transform: `translate(-50%, 0) rotateY(${baseAngle}deg) translateZ(${radius}px)${
                      isActive ? ' scale(1.1)' : ''
                    }`,
                    opacity,
                    filter: blurPx > 0.05 ? `blur(${blurPx}px)` : 'none',
                    transition: transitionEnabled
                      ? `opacity 700ms ${EASE}, filter 700ms ${EASE}`
                      : 'none',
                  }}
                >
                  <div
                    className={`relative w-full h-full rounded-2xl overflow-hidden backdrop-blur-sm bg-brand-surface/70 border flex flex-col p-5 md:p-6 ${
                      isActive
                        ? 'border-brand-gold/50 shadow-[0_0_55px_-8px_rgba(201,164,92,0.35),0_30px_60px_-20px_rgba(0,0,0,0.8)]'
                        : 'border-brand-border/40 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.6)]'
                    }`}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: `rgba(10,10,10,${overlayAlpha})` }}
                    />
                    <div className="relative z-10 flex flex-col h-full">
                      <StarRow rating={review.rating} />
                      <p className="mt-3 text-xs md:text-sm text-brand-cream/90 font-sans font-light leading-relaxed line-clamp-4 flex-1">
                        &ldquo;{review.reviewText}&rdquo;
                      </p>
                      <div className="flex items-center gap-2.5 pt-4 mt-auto border-t border-white/5">
                        <img
                          src={review.customerPhoto}
                          alt={review.customerName}
                          className="w-9 h-9 rounded-full object-cover border border-brand-gold/30"
                          draggable={false}
                        />
                        <div className="min-w-0">
                          <p className="text-sm text-brand-ivory font-sans font-medium truncate">
                            {review.customerName}
                          </p>
                          <p className="text-xs text-brand-gold font-sans truncate">
                            {review.eventTitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <RingControls
        onPrev={goPrev}
        onNext={goNext}
        activeIndex={activeIndex}
        count={count}
        onDotClick={goToIndex}
      />
    </div>
  );
};

const StarRow: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${
          i < rating ? 'fill-brand-gold text-brand-gold' : 'text-neutral-700'
        }`}
      />
    ))}
  </div>
);

const RingControls: React.FC<{
  onPrev: () => void;
  onNext: () => void;
  activeIndex: number;
  count: number;
  onDotClick: (index: number) => void;
}> = ({ onPrev, onNext, activeIndex, count, onDotClick }) => (
  <div className="flex flex-col items-center gap-5 mt-10">
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous testimonial"
        className="w-11 h-11 rounded-full border border-brand-gold/40 text-brand-ivory hover:bg-brand-gold hover:text-brand-dark flex items-center justify-center transition-colors duration-300 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <span className="text-[11px] uppercase tracking-widest text-brand-muted font-sans">
        Drag to rotate · Scroll · or use arrows
      </span>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next testimonial"
        className="w-11 h-11 rounded-full border border-brand-gold/40 text-brand-ivory hover:bg-brand-gold hover:text-brand-dark flex items-center justify-center transition-colors duration-300 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>

    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onDotClick(i)}
          aria-label={`Go to testimonial ${i + 1}`}
          aria-current={i === activeIndex}
          className={`rounded-full transition-all duration-300 cursor-pointer ${
            i === activeIndex
              ? 'w-6 h-1.5 bg-brand-gold'
              : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
          }`}
        />
      ))}
    </div>
  </div>
);

export default TestimonialRing;
