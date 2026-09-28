import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-sans tracking-wider uppercase font-medium transition-all duration-300 relative group overflow-hidden disabled:opacity-50 disabled:pointer-events-none rounded cursor-pointer';

  const sizeStyles = {
    sm: 'text-[11px] px-4 py-2 gap-1.5',
    md: 'text-xs px-6 py-3.5 gap-2',
    lg: 'text-sm px-8 py-4 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-brand-gold text-brand-dark hover:bg-brand-gold-light active:bg-brand-gold-dark shadow-lg shadow-brand-gold/15 border border-brand-gold',
    secondary:
      'bg-transparent text-brand-gold border border-brand-gold/60 hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold',
    dark:
      'bg-brand-surface text-brand-ivory border border-white/10 hover:border-brand-gold/50 hover:bg-brand-charcoal',
    ghost:
      'bg-transparent text-brand-ivory hover:text-brand-gold hover:bg-white/5',
  };

  return (
    <button
      className={twMerge(
        clsx(baseStyles, sizeStyles[size], variantStyles[variant], fullWidth && 'w-full', className)
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
