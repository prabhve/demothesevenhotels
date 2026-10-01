import { useEffect, useRef, useState, useMemo } from 'react';

export interface RevealOnScrollOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  once?: boolean;
}

/**
 * Reusable RevealOnScroll hook using IntersectionObserver for subtle, elegant fade-in-up animations.
 * Designed for premium editorial & luxury hotel landing page sections.
 */
export function useRevealOnScroll<T extends HTMLElement = HTMLDivElement>(
  options: RevealOnScrollOptions = {}
) {
  const {
    threshold = 0.12,
    rootMargin = '0px 0px -40px 0px',
    delay = 0,
    duration = 900,
    distance = 24,
    direction = 'up',
    once = true,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef<T | null>(null);

  // Respect system prefers-reduced-motion accessibility setting
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && targetRef.current) {
              observer.unobserve(targetRef.current);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentEl = targetRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [threshold, rootMargin, once, prefersReducedMotion]);

  // Compute transform based on scroll reveal direction
  const getTransform = () => {
    if (prefersReducedMotion || isVisible) {
      return 'translate3d(0, 0, 0)';
    }

    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'left':
        return `translate3d(${distance}px, 0, 0)`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'none':
        return 'translate3d(0, 0, 0)';
      default:
        return `translate3d(0, ${distance}px, 0)`;
    }
  };

  const style: React.CSSProperties = {
    transitionProperty: 'opacity, transform',
    transitionDuration: prefersReducedMotion ? '0ms' : `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transform: getTransform(),
    opacity: isVisible ? 1 : 0,
    willChange: isVisible ? 'auto' : 'transform, opacity',
  };

  return {
    ref: targetRef,
    isVisible,
    style,
    className: `transition-all duration-${duration}`,
  };
}
