import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
  pulseSpeed: number;
  pulseAngle: number;
  color: string;
}

interface FloatingGoldDustProps {
  particleCount?: number;
  className?: string;
}

export const FloatingGoldDust: React.FC<FloatingGoldDustProps> = ({
  particleCount = 38,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect user motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const goldShades = [
      'rgba(255, 235, 175, ',
      'rgba(201, 164, 92, ',
      'rgba(235, 200, 130, ',
      'rgba(255, 215, 0, ',
      'rgba(240, 210, 150, ',
    ];

    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const maxOpacity = 0.25 + Math.random() * 0.55;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + Math.random() * 2.8,
        speedY: 0.15 + Math.random() * 0.45,
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * maxOpacity,
        maxOpacity,
        pulseSpeed: 0.015 + Math.random() * 0.025,
        pulseAngle: Math.random() * Math.PI * 2,
        color: goldShades[Math.floor(Math.random() * goldShades.length)],
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speedY;
        p.x += Math.sin(p.pulseAngle) * 0.35 + p.speedX;
        p.pulseAngle += p.pulseSpeed;

        // Opacity pulsing
        p.opacity = (Math.sin(p.pulseAngle) * 0.5 + 0.5) * p.maxOpacity;

        // Reset if off-screen
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw soft glow circle
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `${p.color}${p.opacity})`);
        gradient.addColorStop(0.5, `${p.color}${p.opacity * 0.4})`);
        gradient.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Core bright spark
        ctx.beginPath();
        ctx.fillStyle = `${p.color}${Math.min(1, p.opacity * 1.5)})`;
        ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-[1] ${className}`}
      aria-hidden="true"
    />
  );
};

export default FloatingGoldDust;
