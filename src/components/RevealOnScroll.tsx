import React from 'react';
import { useRevealOnScroll, RevealOnScrollOptions } from '../hooks/useRevealOnScroll';

export interface RevealOnScrollProps extends RevealOnScrollOptions {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Reusable RevealOnScroll Component using IntersectionObserver
 * Wraps landing page sections in a subtle, elegant fade-in-up animation.
 */
export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className = '',
  as: Component = 'div',
  delay = 0,
  duration = 900,
  distance = 24,
  direction = 'up',
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  once = true,
}) => {
  const { ref, style } = useRevealOnScroll<HTMLDivElement>({
    delay,
    duration,
    distance,
    direction,
    threshold,
    rootMargin,
    once,
  });

  return (
    <Component
      ref={ref}
      style={style}
      className={`transition-all ${className}`}
    >
      {children}
    </Component>
  );
};
