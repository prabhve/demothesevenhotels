import React from 'react';
import { useScrollReveal, UseScrollRevealOptions } from '../hooks/useScrollReveal';

export interface ScrollRevealProps extends UseScrollRevealOptions {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  as: Component = 'div',
  delay = 0,
  duration = 950,
  direction = 'up',
  distance = 28,
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
  once = true,
}) => {
  const { ref, style } = useScrollReveal<HTMLDivElement>({
    delay,
    duration,
    direction,
    distance,
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

export interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerMs?: number;
  baseDelay?: number;
  duration?: number;
  distance?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const StaggerGroup: React.FC<StaggerGroupProps> = ({
  children,
  className = '',
  staggerMs = 120,
  baseDelay = 0,
  duration = 950,
  distance = 28,
  direction = 'up',
}) => {
  const childArray = React.Children.toArray(children);

  return (
    <div className={className}>
      {childArray.map((child, index) => (
        <ScrollReveal
          key={index}
          delay={baseDelay + index * staggerMs}
          duration={duration}
          distance={distance}
          direction={direction}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
};
