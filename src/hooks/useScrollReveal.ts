import { useEffect, useRef, useState, useMemo } from 'react';

export interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -40px 0px',
    delay = 0,
    duration = 950,
    direction = 'up',
    distance = 28,
    once = true,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<T | null>(null);

  // Check if user prefers reduced motion
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
            if (once && domRef.current) {
              observer.unobserve(domRef.current);
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

    const currentEl = domRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [threshold, rootMargin, once, prefersReducedMotion]);

  const getTransform = () => {
    if (prefersReducedMotion || isVisible) {
      return 'translate3d(0, 0, 0) scale(1)';
    }

    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'left':
      case 'right':
        // Avoid horizontal translation on mobile/desktop as it expands scrollWidth and blows out the viewport
        return `translate3d(0, ${Math.min(distance, 16)}px, 0)`;
      case 'none':
        return 'translate3d(0, 0, 0) scale(0.98)';
      default:
        return `translate3d(0, ${distance}px, 0)`;
    }
  };

  const style: React.CSSProperties = {
    transitionProperty: 'opacity, transform',
    transitionDuration: prefersReducedMotion ? '0ms' : `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    transform: getTransform(),
    opacity: isVisible ? 1 : 0,
    willChange: isVisible ? 'auto' : 'transform, opacity',
  };

  return { ref: domRef, isVisible, style };
}
