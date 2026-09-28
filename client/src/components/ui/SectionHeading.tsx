import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  theme?: 'dark' | 'light';
  className?: string;
  titleClassName?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  centered = true,
  theme = 'dark',
  className,
  titleClassName,
}) => {
  const isLight = theme === 'light';

  return (
    <div
      className={twMerge(
        clsx(
          'space-y-4 max-w-3xl mb-12 md:mb-16',
          centered ? 'mx-auto text-center' : 'text-left',
          className
        )
      )}
    >
      {eyebrow && (
        <div className="flex items-center gap-3 justify-center">
          {centered && <span className="w-8 h-[1px] bg-brand-gold/60"></span>}
          <span
            className={clsx(
              'text-[11px] md:text-xs uppercase font-semibold tracking-eyebrow font-sans',
              isLight ? 'text-brand-gold-dark' : 'text-brand-gold'
            )}
          >
            {eyebrow}
          </span>
          <span className="w-8 h-[1px] bg-brand-gold/60"></span>
        </div>
      )}

      <h2
        className={twMerge(
          clsx(
            'text-3xl md:text-5xl lg:text-5xl font-serif font-normal tracking-tight leading-[1.15]',
            isLight ? 'text-brand-dark' : 'text-brand-ivory',
            titleClassName
          )
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={clsx(
            'text-base md:text-lg font-light leading-relaxed max-w-2xl font-sans',
            centered && 'mx-auto',
            isLight ? 'text-neutral-600' : 'text-brand-cream/80'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
