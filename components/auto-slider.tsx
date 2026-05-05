"use client";

import { useEffect, useRef, useState, useCallback, ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   AUTO-SLIDER CAROUSEL COMPONENT
   A horizontal scrolling slider with auto-play,
   manual navigation arrows, and smooth drag-to-scroll.
   ═══════════════════════════════════════════════════════ */

interface AutoSliderProps {
  children: ReactNode[];
  /** Time between auto-scroll in ms (default: 4000) */
  autoPlayInterval?: number;
  /** Card width on desktop in px (default: 320) */
  cardWidth?: number;
  /** Gap between cards in px (default: 24) */
  gap?: number;
  /** Whether to auto-play (default: true) */
  autoPlay?: boolean;
  /** Whether to show navigation arrows (default: true) */
  showArrows?: boolean;
  /** Whether to show dot indicators (default: true) */
  showDots?: boolean;
  /** Custom class for the slider container */
  className?: string;
  /** Whether to pause auto-play on hover (default: true) */
  pauseOnHover?: boolean;
}

export default function AutoSlider({
  children,
  autoPlayInterval = 4000,
  cardWidth = 320,
  gap = 24,
  autoPlay = true,
  showArrows = true,
  showDots = true,
  className = "",
  pauseOnHover = true,
}: AutoSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const totalItems = children.length;

  // Calculate how many items are visible
  const getVisibleCount = useCallback(() => {
    if (!scrollRef.current) return 1;
    const containerWidth = scrollRef.current.clientWidth;
    return Math.max(1, Math.floor((containerWidth + gap) / (cardWidth + gap)));
  }, [cardWidth, gap]);

  const maxIndex = Math.max(0, totalItems - getVisibleCount());

  // Scroll to a specific index
  const scrollToIndex = useCallback(
    (index: number) => {
      if (!scrollRef.current) return;
      const clampedIndex = Math.max(0, Math.min(index, maxIndex));
      setCurrentIndex(clampedIndex);
      scrollRef.current.scrollTo({
        left: clampedIndex * (cardWidth + gap),
        behavior: "smooth",
      });
    },
    [cardWidth, gap, maxIndex]
  );

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev >= maxIndex ? 0 : prev + 1;
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            left: next * (cardWidth + gap),
            behavior: "smooth",
          });
        }
        return next;
      });
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, isPaused, autoPlayInterval, cardWidth, gap, maxIndex]);

  // Sync current index with scroll position
  const handleScroll = useCallback(() => {
    if (!scrollRef.current || isDragging) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    setCurrentIndex(Math.max(0, Math.min(newIndex, maxIndex)));
  }, [cardWidth, gap, maxIndex, isDragging]);

  // Mouse/touch drag
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setScrollStart(scrollRef.current?.scrollLeft || 0);
    setIsPaused(true);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging || !scrollRef.current) return;
    const diff = startX - clientX;
    scrollRef.current.scrollLeft = scrollStart + diff;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    handleScroll();
    // Resume auto-play after drag
    setTimeout(() => setIsPaused(false), 5000);
  };

  const goNext = () => {
    scrollToIndex(currentIndex >= maxIndex ? 0 : currentIndex + 1);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  const goPrev = () => {
    scrollToIndex(currentIndex <= 0 ? maxIndex : currentIndex - 1);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  return (
    <div
      className={`relative group/slider ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => {
        pauseOnHover && setIsPaused(false);
        setIsDragging(false);
      }}
    >
      {/* ── Scroll container ── */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{
          gap: `${gap}px`,
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
        }}
        onScroll={handleScroll}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        {children.map((child, i) => (
          <motion.div
            key={i}
            className="flex-shrink-0 snap-start"
            style={{ width: cardWidth }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {child}
          </motion.div>
        ))}
        {/* End padding so last card can fully center */}
        <div className="flex-shrink-0" style={{ width: gap }} />
      </div>

      {/* ── Left gradient fade ── */}
      <div
        className="absolute left-0 top-0 bottom-0 w-12 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          background: "linear-gradient(to right, var(--background), transparent)",
          opacity: currentIndex > 0 ? 1 : 0,
        }}
      />

      {/* ── Right gradient fade ── */}
      <div
        className="absolute right-0 top-0 bottom-0 w-12 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          background: "linear-gradient(to left, var(--background), transparent)",
          opacity: currentIndex < maxIndex ? 1 : 0,
        }}
      />

      {/* ── Navigation arrows ── */}
      {showArrows && totalItems > getVisibleCount() && (
        <>
          <button
            onClick={goPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover/slider:opacity-100 hover:scale-110 active:scale-95"
            style={{
              background: "var(--card)",
              border: "1px solid var(--color-border-accent)",
              color: "var(--primary)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 0 10px rgba(212,168,83,0.1)",
              backdropFilter: "blur(10px)",
            }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover/slider:opacity-100 hover:scale-110 active:scale-95"
            style={{
              background: "var(--card)",
              border: "1px solid var(--color-border-accent)",
              color: "var(--primary)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 0 10px rgba(212,168,83,0.1)",
              backdropFilter: "blur(10px)",
            }}
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* ── Dot indicators ── */}
      {showDots && totalItems > getVisibleCount() && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                scrollToIndex(i);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 8000);
              }}
              className="relative p-1"
              aria-label={`Go to slide ${i + 1}`}
            >
              <motion.div
                className="rounded-full transition-colors duration-500"
                animate={{
                  width: i === currentIndex ? 24 : 8,
                  height: 8,
                  backgroundColor:
                    i === currentIndex
                      ? "var(--primary)"
                      : "var(--muted)",
                  opacity: i === currentIndex ? 1 : 0.5,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </button>
          ))}

          {/* Auto-play progress */}
          {autoPlay && !isPaused && (
            <div className="ml-3 w-8 h-1 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "var(--primary)" }}
                key={currentIndex}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   INFINITE MARQUEE SLIDER
   A continuously moving marquee for teacher cards, etc.
   Like a ticker tape that never stops.
   ═══════════════════════════════════════════════════════ */

interface MarqueeSliderProps {
  children: ReactNode[];
  /** Speed in seconds for one full cycle (default: 30) */
  speed?: number;
  /** Direction: "left" or "right" (default: "left") */
  direction?: "left" | "right";
  /** Whether to pause on hover (default: true) */
  pauseOnHover?: boolean;
  /** Gap between items in px (default: 32) */
  gap?: number;
  /** Custom class */
  className?: string;
}

export function MarqueeSlider({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  gap = 32,
  className = "",
}: MarqueeSliderProps) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        padding: "20px 0",
      }}
    >
      {/* ── Gradient Mask Fades ── */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />

      <div
        className="marquee-active"
        style={{
          gap: `${gap}px`,
          "--marquee-duration": `${speed}s`,
          "--marquee-direction": direction === "right" ? "reverse" : "normal",
          "--marquee-pause": pauseOnHover ? "paused" : "running",
        } as React.CSSProperties}
      >
        {/* Triple the items for a perfect infinite loop without gaps */}
        {[...children, ...children, ...children].map((child, i) => (
          <div key={i} className="flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
