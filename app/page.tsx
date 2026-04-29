"use client";

import Link from "next/link";
import { ChevronRight, Star, PlayCircle, BookOpen, Award, Users, Video, Sparkles, Moon, GraduationCap, Heart, X, CheckCircle } from "lucide-react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Teacher } from "@/lib/db";

/* ═══════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════ */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const cardHover: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};



/* ═══════════════════════════════════════════════════════
   AYAT SLIDER DATA
   ═══════════════════════════════════════════════════════ */

const AYAT_SLIDES = [
  {
    arabic: ["ٱقْرَأْ بِٱسْمِ رَبِّكَ ٱلَّذِى خَلَقَ", "خَلَقَ ٱلْإِنسَـٰنَ مِنْ عَلَقٍ", "ٱقْرَأْ وَرَبُّكَ ٱلْأَكْرَمُ"],
    translation: "Read in the name of your Lord who created — Created man from a clinging substance. Read, and your Lord is the Most Generous.",
    reference: "Surah Al-Alaq · 96:1-3",
    bgGradient: "linear-gradient(160deg, #16143a 0%, #0d0b22 50%, #100e28 100%)",
    glowColor: "rgba(212,168,83,0.08)",
    accentHue: "40",
  },
  {
    arabic: ["إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا", "فَإِذَا فَرَغْتَ فَٱنصَبْ", "وَإِلَىٰ رَبِّكَ فَٱرْغَب"],
    translation: "Indeed, with hardship comes ease. So when you have finished, then stand up for worship. And to your Lord direct your longing.",
    reference: "Surah Ash-Sharh · 94:6-8",
    bgGradient: "linear-gradient(160deg, #0f1a2e 0%, #0a0f1e 50%, #0d1528 100%)",
    glowColor: "rgba(100,180,255,0.06)",
    accentHue: "210",
  },
  {
    arabic: ["وَلَقَدْ يَسَّرْنَا ٱلْقُرْءَانَ لِلذِّكْرِ", "فَهَلْ مِن مُّدَّكِرٍ"],
    translation: "And We have certainly made the Quran easy for remembrance, so is there any who will remember?",
    reference: "Surah Al-Qamar · 54:17",
    bgGradient: "linear-gradient(160deg, #1a1230 0%, #0e0a22 50%, #14102a 100%)",
    glowColor: "rgba(180,130,255,0.06)",
    accentHue: "270",
  },
  {
    arabic: ["وَنُنَزِّلُ مِنَ ٱلْقُرْءَانِ", "مَا هُوَ شِفَآءٌ وَرَحْمَةٌ", "لِّلْمُؤْمِنِينَ"],
    translation: "And We send down of the Quran that which is a healing and a mercy for the believers.",
    reference: "Surah Al-Isra · 17:82",
    bgGradient: "linear-gradient(160deg, #0a1a1a 0%, #081412 50%, #0c1818 100%)",
    glowColor: "rgba(80,220,180,0.06)",
    accentHue: "160",
  },
  {
    arabic: ["ٱللَّهُ نُورُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ"],
    translation: "Allah is the Light of the heavens and the earth.",
    reference: "Surah An-Nur · 24:35",
    bgGradient: "linear-gradient(160deg, #1a1830 0%, #100e22 50%, #161228 100%)",
    glowColor: "rgba(232,200,117,0.08)",
    accentHue: "45",
  },
];

/* ═══════════════════════════════════════════════════════
   AYAT TYPEWRITER — Character-by-character Arabic reveal
   ═══════════════════════════════════════════════════════ */

function AyatLineReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const timeout = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span
      className="inline-block transition-all duration-[1200ms] ease-out"
      style={{
        opacity: visible ? 1 : 0,
        filter: visible ? 'blur(0px)' : 'blur(6px)',
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
      }}
    >
      {text}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   COURSE MICRO-ANIMATIONS
   ═══════════════════════════════════════════════════════ */

const QaidaAnimation = () => (
  <div className="relative w-full h-32 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center overflow-hidden mb-6">
    <motion.div animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
    <BookOpen className="w-12 h-12 text-primary relative z-10" />
    <motion.div animate={{ x: [-2, 4, -2], y: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
       <Sparkles className="w-5 h-5 text-accent opacity-80 absolute -top-8 -right-8" />
    </motion.div>
  </div>
);

const GroupClassesAnimation = () => (
  <div className="relative w-full h-32 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center overflow-hidden mb-6">
    <div className="flex gap-3 relative z-10 items-end">
      <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}><Users className="w-8 h-8 text-primary/60" /></motion.div>
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.5, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}><Users className="w-12 h-12 text-primary" /></motion.div>
      <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}><Users className="w-8 h-8 text-primary/60" /></motion.div>
    </div>
  </div>
);

const QuranReadingAnimation = () => (
  <div className="relative w-full h-32 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center overflow-hidden mb-6">
    <Moon className="absolute w-24 h-24 text-primary/10 -top-4 -right-4 pointer-events-none" />
    <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
      <BookOpen className="w-12 h-12 text-primary relative z-10" />
    </motion.div>
    <motion.div animate={{ opacity: [0, 1, 0], y: [10, -10] }} transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
      <div className="w-1.5 h-1.5 rounded-full bg-accent blur-[1px] absolute -top-10 -right-4" />
    </motion.div>
  </div>
);

const AdvancedLearningAnimation = () => (
  <div className="relative w-full h-32 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center overflow-hidden mb-6">
    <GraduationCap className="w-12 h-12 text-primary relative z-10" />
    <motion.div animate={{ scale: [0.8, 1.2, 0.8], opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute right-6 top-6 z-20 pointer-events-none">
      <CheckCircle className="w-6 h-6 text-emerald-500" />
    </motion.div>
    <div className="absolute bottom-4 left-6 right-6 flex flex-col gap-1.5 opacity-40 pointer-events-none">
      <motion.div className="h-1 bg-primary rounded w-full" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.div className="h-1 bg-primary rounded w-3/4" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} />
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════
   QUIZ POPUP
   ═══════════════════════════════════════════════════════ */

function QuizPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md overflow-hidden"
            style={{
              borderRadius: '28px',
              background: 'var(--card)',
              border: '1px solid var(--color-border-accent)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.4), 0 0 60px rgba(201,168,76,0.15)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(to right, transparent, var(--primary), transparent)' }} />

            {/* Close button */}
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-primary/10"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-10 text-center space-y-6">
              {/* Icon */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center"
                style={{ background: 'var(--color-gold-glow)', border: '1px solid var(--color-border-accent)' }}
              >
                <Sparkles className="w-10 h-10" style={{ color: 'var(--primary)' }} />
              </motion.div>

              {/* Title */}
              <div className="space-y-2">
                <h3 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', fontWeight: 300, color: 'var(--foreground)' }}>
                  Discover Your <span className="italic" style={{ color: 'var(--primary)' }}>Quranic Level</span>
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
                  Take our quick 2-minute quiz to find out exactly where you should start your Quran learning journey.
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3 pt-2">
                <Link
                  href="/quiz"
                  onClick={() => setShow(false)}
                  className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 btn-glow transition-all hover:scale-[1.02]"
                  style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', fontFamily: 'var(--font-body)', fontSize: '1rem' }}
                >
                  <Sparkles className="w-5 h-5" />
                  Take the Level Quiz
                </Link>
                <button
                  onClick={() => setShow(false)}
                  className="text-sm font-medium transition-colors hover:text-primary"
                  style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   CINEMATIC AYAT SLIDER WITH DYNAMIC BACKGROUNDS
   ═══════════════════════════════════════════════════════ */

function AyatSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const slideCount = AYAT_SLIDES.length;

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slideCount);
    }, 7000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, slideCount]);

  const slide = AYAT_SLIDES[currentSlide];

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume autoplay after 15 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[420px] md:max-w-[500px] lg:max-w-[540px]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Dynamic ambient glow that shifts per slide ── */}
      <motion.div
        className="absolute -inset-12 rounded-3xl pointer-events-none"
        animate={{
          boxShadow: [
            `0 0 40px ${slide.glowColor}, 0 0 80px ${slide.glowColor}`,
            `0 0 60px ${slide.glowColor}, 0 0 120px ${slide.glowColor}, 0 0 180px ${slide.glowColor.replace(/[\d.]+\)$/, '0.03)')}`,
            `0 0 40px ${slide.glowColor}, 0 0 80px ${slide.glowColor}`,
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Mushaf Container ── */}
      <div className="relative" style={{ perspective: "1200px" }}>
        {/* Back page shadow layers */}
        <div className="absolute inset-3 bg-[#1a1528] rounded-2xl transform rotate-[2.5deg] opacity-20" />
        <div className="absolute inset-2 bg-[#151225] rounded-2xl transform rotate-[1.2deg] opacity-25" />

        {/* ── Main card with dynamic background ── */}
        <motion.div
          className="relative rounded-2xl border border-primary/20 overflow-hidden"
          animate={{ background: slide.bgGradient }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            animation: "pageFlutter 5s ease-in-out infinite",
          }}
        >
          {/* Decorative corner ornaments */}
          <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-primary/25 rounded-tl-xl" />
          <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-primary/25 rounded-tr-xl" />
          <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-primary/25 rounded-bl-xl" />
          <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-primary/25 rounded-br-xl" />

          {/* Inner border frame */}
          <div className="absolute inset-6 border border-primary/8 rounded-xl pointer-events-none" />

          {/* ── Animated content area ── */}
          <div className="p-8 md:p-12 flex flex-col items-center gap-5 min-h-[420px] md:min-h-[480px] justify-center relative">

            {/* Bismillah header — always visible */}
            <div className="text-center">
              <p className="text-[#C9A84C]/60 text-xs tracking-[0.3em] uppercase mb-3 font-medium">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</p>
              <div className="w-24 h-[1px] mx-auto bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
            </div>

            {/* ── Arabic verses with typewriter ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`arabic-${currentSlide}`}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-center space-y-3 py-4"
              >
                {slide.arabic.map((line, i) => (
                  <p
                    key={`${currentSlide}-${i}`}
                    className="text-[#C9A84C]/90 font-serif leading-[1.8]"
                    dir="rtl"
                    style={{
                      fontFamily: "'Amiri', serif",
                      fontSize: slide.arabic.length === 1 ? "1.8rem" : i === 0 ? "1.5rem" : "1.25rem",
                      opacity: 1 - (i * 0.12),
                    }}
                  >
                    <AyatLineReveal text={line} delay={i * 600} />
                  </p>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* ── English translation with fade ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`translation-${currentSlide}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
                className="text-center max-w-sm"
              >
                <p className="text-white/60 text-sm leading-relaxed italic">
                  "{slide.translation}"
                </p>
              </motion.div>
            </AnimatePresence>

            {/* ── Verse reference ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`ref-${currentSlide}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 2 }}
                className="text-center mt-2"
              >
                <div className="w-20 h-[1px] mx-auto bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent mb-3" />
                <p className="text-[#C9A84C]/40 text-[11px] tracking-[0.2em] uppercase font-medium">{slide.reference}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Slide indicators ── */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {AYAT_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className="group relative p-1"
                aria-label={`Go to verse ${i + 1}`}
              >
                <motion.div
                  className="rounded-full transition-colors duration-500"
                  animate={{
                    width: i === currentSlide ? 24 : 6,
                    height: 6,
                    backgroundColor: i === currentSlide
                      ? "rgba(212,168,83,0.7)"
                      : "rgba(212,168,83,0.2)",
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </button>
            ))}
          </div>

          {/* ── Progress bar for auto-advance ── */}
          {isAutoPlaying && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary/5 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40"
                key={`progress-${currentSlide}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 7, ease: "linear" }}
              />
            </div>
          )}

          {/* Shimmer overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(110deg, transparent 25%, rgba(212,168,83,0.025) 45%, transparent 65%)",
              backgroundSize: "250% 100%",
              animation: "shimmer 6s linear infinite",
            }}
          />
        </motion.div>
      </div>

      {/* ── Floating glow orbs that shift with slide ── */}
      <motion.div
        className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl pointer-events-none"
        animate={{
          backgroundColor: `hsla(${slide.accentHue}, 60%, 50%, 0.1)`,
        }}
        transition={{ duration: 1.5 }}
        style={{ animation: "float 6s ease-in-out infinite" }}
      />
      <motion.div
        className="absolute -bottom-6 -left-6 w-14 h-14 rounded-full blur-xl pointer-events-none"
        animate={{
          backgroundColor: `hsla(${slide.accentHue}, 50%, 60%, 0.08)`,
        }}
        transition={{ duration: 1.5 }}
        style={{ animation: "float 7s ease-in-out infinite 1s" }}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   TYPEWRITER TEXT
   ═══════════════════════════════════════════════════════ */

const TypewriterText = ({ text, className }: { text: string; className?: string }) => (
  <motion.span
    className={className}
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.035, delayChildren: 0.4 }
      }
    }}
  >
    {text.split("").map((char, i) => (
      <motion.span key={i} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
        {char}
      </motion.span>
    ))}
  </motion.span>
);

/* ═══════════════════════════════════════════════════════
   ANIMATED COUNTER — Counts up from 0 to target
   ═══════════════════════════════════════════════════════ */

function AnimatedCounter({ target, suffix, delay = 0 }: { target: number; suffix: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const timeout = setTimeout(() => {
      const duration = target > 100 ? 2000 : 1500;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(eased * target));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [hasStarted, target, delay]);

  return (
    <p ref={ref} className="tabular-nums text-glow" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--primary)' }}>
      {count}{suffix}
    </p>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN LANDING PAGE
   ═══════════════════════════════════════════════════════ */

export default function Home() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/teachers")
      .then(res => res.json())
      .then((data: Teacher[]) => {
        setTeachers(data.filter(t => t.isActive));
      })
      .catch(console.error);
  }, []);



  return (
    <div className="flex flex-col items-center overflow-hidden bg-background">

      {/* ── Quiz Popup ── */}
      <QuizPopup />

      {/* ════════ HERO SECTION — SPLIT LAYOUT ════════ */}
      <section className="relative w-full min-h-[100dvh] flex items-center overflow-hidden -mt-20" style={{ padding: '0' }}>
        {/* Cinematic ambient glows */}
        <div className="absolute top-[15%] left-[30%] w-[600px] h-[400px] blur-[150px] rounded-full pointer-events-none" style={{ background: 'rgba(201,168,76,0.06)' }} />
        <div className="absolute bottom-[15%] left-[10%] w-[400px] h-[300px] blur-[120px] rounded-full pointer-events-none" style={{ background: 'rgba(13,79,60,0.15)' }} />
        <div className="absolute top-[25%] right-[15%] w-[350px] h-[250px] blur-[100px] rounded-full pointer-events-none" style={{ background: 'rgba(201,168,76,0.04)' }} />
        {/* Radial gradient spotlight */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(13,79,60,0.25), transparent)' }} />

        {/* ── Split container: text left, mushaf right ── */}
        <div className="relative z-10 mx-auto max-w-[1280px] w-full px-5 md:px-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-16" style={{ paddingTop: 'clamp(5rem, 10vw, 3rem)', paddingBottom: 'clamp(2rem, 3vw, 3rem)' }}>

          {/* ── LEFT: Content ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex-1 space-y-8 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 badge-gold backdrop-blur-md" style={{ padding: '0.4rem 1rem' }}>
              <Sparkles className="h-3.5 w-3.5" style={{ color: 'var(--primary)' }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase' as const, fontWeight: 500 }}>Traditional Quranic Excellence for Modern Learners</span>
            </motion.div>

            {/* Main heading */}
            <motion.h1 variants={fadeUp} className="text-balance" style={{ fontSize: 'clamp(2.1rem, 5vw, 4rem)', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
              <span className="block italic" style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: 500 }}>Traditional Excellence</span>
              <span className="block">From <span className="text-glow italic" style={{ color: 'var(--primary)' }}>Qaida</span> to <span className="text-glow italic" style={{ color: 'var(--primary)' }}>Quran</span></span>
              <span className="block mt-4" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)', fontFamily: "var(--font-body)", fontWeight: 400, color: 'var(--muted-foreground)' }}>
                <TypewriterText text="step-by-step with proper guidance." />
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p variants={fadeUp} className="max-w-xl mx-auto lg:mx-0 text-balance" style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--muted-foreground)', fontFamily: "var(--font-body)" }}>
              Online Quran classes for kids and adults. Structured courses, qualified teachers, personal feedback, and a learning system built on tradition and excellence.
            </motion.p>

            {/* CTA Buttons with inner glow */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto rounded-full flex items-center justify-center gap-2 btn-glow"
                style={{ padding: '0.8rem 2rem', background: 'var(--primary)', color: 'var(--primary-foreground)', fontWeight: 600, fontSize: '0.95rem', fontFamily: "var(--font-body)", boxShadow: '0 0 20px rgba(201,168,76,0.25)' }}
              >
                Free Trial Class
                <ChevronRight className="h-5 w-5" />
              </Link>
              <Link
                href="/courses"
                className="w-full sm:w-auto rounded-full flex items-center justify-center gap-2 transition-all duration-500 backdrop-blur-md"
                style={{ padding: '0.8rem 2rem', background: 'transparent', border: '1px solid var(--color-border-accent)', color: 'var(--primary)', fontWeight: 600, fontSize: '0.95rem', fontFamily: "var(--font-body)" }}
              >
                <BookOpen className="h-5 w-5" style={{ color: 'var(--primary)' }} />
                Explore Courses
              </Link>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Ayat Slider ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full max-w-[540px]"
          >
            <AyatSlider />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary/50 rounded-full" />
          </div>
        </motion.div>
      </section>


      {/* ── VIDEO TESTIMONIALS ── */}
      <section className="relative w-full overflow-hidden z-10" style={{ padding: 'clamp(3rem, 6vw, 7rem) clamp(1rem, 4vw, 5rem)', background: 'var(--background)' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="relative mx-auto max-w-[1280px]"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="eyebrow mb-4">Student Stories</p>
            <h2 className="heading-divider text-balance" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)', letterSpacing: '-0.01em' }}>Hear From Our Learners</h2>
            <p className="mt-6 mx-auto max-w-2xl" style={{ color: 'var(--muted-foreground)', fontSize: '1.25rem', fontFamily: "var(--font-body)" }}>Real experiences from students who have transformed their recitation and understanding of the Quran with us.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              "IrBWcu2gR6c",
              "9ZxfGiOujvg",
              "nZ1K-GCBJRE",
              "yoeK7z6NDPU"
            ].map((videoId, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-[24px] aspect-[9/16] bg-black/5 transition-all duration-500 hover:scale-[1.02]"
                style={{ border: '1px solid var(--color-border-subtle)', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
              >
                <div className="absolute inset-0 bg-primary/5 pointer-events-none z-10 group-hover:bg-transparent transition-colors duration-500" />
                <iframe
                  className="absolute inset-0 w-full h-full object-cover"
                  src={`https://www.youtube.com/embed/${videoId}?loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`}
                  title={`Student Review ${i + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      {/* ── COURSES — CINEMATIC BENTO LAYOUT ── */}
      <section className="w-full overflow-hidden relative z-10" style={{ padding: 'clamp(3rem, 6vw, 7rem) clamp(1rem, 4vw, 5rem)', background: 'var(--secondary)' }}>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mx-auto max-w-[1280px] relative z-10"
        >
          {/* Section header */}
          <motion.div variants={stagger} className="text-center mb-16 space-y-4 overflow-hidden">
            <motion.p variants={fadeUp} className="eyebrow">Curriculum</motion.p>
            <motion.h2
              variants={{
                hidden: { opacity: 0, x: -100 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-balance heading-divider"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)', letterSpacing: '-0.01em' }}
            >
              Structured Learning for All Ages
            </motion.h2>
            <motion.p variants={fadeUp} className="max-w-2xl mx-auto mt-6" style={{ fontSize: '1.25rem', color: 'var(--muted-foreground)', lineHeight: 1.8, fontFamily: "var(--font-body)" }}>
              Whether you are a complete beginner or an advanced student perfecting your Makharij, we have a specialized path.
            </motion.p>
          </motion.div>

          {/* ── Course Level Cards — 4 columns ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                AnimComponent: QaidaAnimation,
                step: "01",
                title: "Qaida Basics",
                desc: "Start from zero and build a strong foundation with proper Tajweed.",
                features: ["Arabic Alphabet", "Harakat practice", "Letter Connections", "Pronunciation Drills"],
                gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
              },
              {
                AnimComponent: GroupClassesAnimation,
                step: "02",
                title: "Group Classes",
                desc: "Learn in a vibrant community environment. Motivation through shared learning.",
                features: ["Small Groups", "Peer Learning", "Interactive", "Consistent Schedule"],
                gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
              },
              {
                AnimComponent: QuranReadingAnimation,
                step: "03",
                title: "Quran Reading",
                desc: "Build real fluency and precision reading directly from the Mushaf.",
                features: ["Mushaf Reading", "Fluency Building", "Error Correction", "Tajweed Rules"],
                gradient: "from-primary/10 via-primary/5 to-transparent",
                featured: true,
              },
              {
                AnimComponent: AdvancedLearningAnimation,
                step: "04",
                title: "Advanced Learning",
                desc: "Deepen your understanding with Ijazah-certified guidance and advanced Tajweed.",
                features: ["Makharij Mastery", "Ijazah Prep", "Tafseer Basics", "Memorization"],
                gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
              },
            ].map((course, i) => (
              <motion.div
                key={i}
                variants={cardHover}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden transition-all duration-500 card-accent-top ${course.featured ? 'md:scale-105 md:-my-4' : ''}`}
                style={{ borderRadius: '24px', padding: '2rem', background: 'var(--card)', border: course.featured ? '1px solid var(--color-border-accent)' : '1px solid var(--color-border-subtle)', boxShadow: course.featured ? '0 0 60px rgba(201,168,76,0.08)' : 'none' }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                {/* Featured badge */}
                {course.featured && (
                  <div className="absolute top-4 right-4 badge-gold">
                    Most Popular
                  </div>
                )}

                <div className="relative z-10 space-y-4">
                  {/* Step number */}
                  <div className="flex justify-between items-center w-full">
                    <span className="text-5xl font-black text-foreground/5 group-hover:text-foreground/10 transition-colors duration-500 select-none">
                      {course.step}
                    </span>
                  </div>

                  {/* Micro-Animation */}
                  <course.AnimComponent />

                  {/* Title & Description */}
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontFamily: "var(--font-body)", fontWeight: 700, color: 'var(--foreground)' }} className="mb-3">{course.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', lineHeight: 1.75, fontFamily: "var(--font-body)" }}>{course.desc}</p>
                  </div>

                  {/* Feature chips */}
                  <div className="flex flex-wrap gap-2">
                    {course.features.map((feature, j) => (
                      <span
                        key={j}
                        className="badge-gold text-[10px]"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Age Group Row ── */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { icon: BookOpen, label: "Kids", desc: "Fun & engaging" },
              { icon: GraduationCap, label: "Teens", desc: "Guided growth" },
              { icon: Heart, label: "Adults", desc: "Flexible hours" },
              { icon: Users, label: "1-on-1 & Group", desc: "Your choice" },
            ].map((age, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="group text-center p-5 transition-all duration-500 cursor-default"
                style={{ border: '1px solid var(--color-border-subtle)', background: 'var(--color-bg-glass)', backdropFilter: 'blur(10px)', borderRadius: '16px' }}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110" style={{ background: 'var(--color-gold-glow)', border: '1px solid var(--color-border-accent)' }}>
                  <age.icon className="w-6 h-6" style={{ color: 'var(--primary)' }} />
                </div>
                <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '0.875rem', color: 'var(--foreground)' }}>{age.label}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', fontFamily: "'DM Sans', sans-serif" }} className="mt-1">{age.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* ── CTA ── */}
          <motion.div variants={fadeUp} className="text-center mt-14">
            <Link href="/courses" className="inline-flex items-center gap-2.5 rounded-full transition-all duration-500 group" style={{ padding: '0.8rem 2rem', border: '1px solid rgba(201,168,76,0.25)', color: '#C9A84C', fontWeight: 600, fontSize: '0.95rem', fontFamily: "'DM Sans', sans-serif" }}>
              View Full Curriculum
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── ABOUT SECTION — CINEMATIC DEPTH ── */}
      <section className="w-full relative overflow-hidden z-10" style={{ padding: 'clamp(3rem, 6vw, 7rem) clamp(1rem, 4vw, 5rem)', background: 'var(--background)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] blur-[150px] rounded-full pointer-events-none" style={{ background: 'rgba(13,79,60,0.12)' }} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-[1280px] text-center space-y-14 relative z-10"
        >
          <motion.div variants={fadeUp} className="text-center mb-16 space-y-4">
            <p className="eyebrow">The Instructor</p>
            <h2 className="heading-divider" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)', letterSpacing: '-0.01em' }}>About Ibrahim</h2>
            <p className="italic mt-4" style={{ fontFamily: "var(--font-heading)", fontSize: '1.5rem', color: 'var(--primary)' }}>Certified with Ijazah from Masjid Nabawi</p>
          </motion.div>

          <motion.div variants={fadeUp} className="max-w-3xl mx-auto space-y-6" style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--muted-foreground)', fontFamily: "var(--font-body)" }}>
            <p>
              I am honored to hold an Ijazah (a high-level teaching certification) directly connected to scholars of Masjid al-Nabawi in Madinah. This means my teaching is rooted in authentic tradition, precision, and responsibility.
            </p>
            <p>
              For the past 8 years, I have taught students of all ages across different countries through online classes. From young children learning their first letters to adults improving their Tajweed, I have helped students strengthen both their recitation and their love for the Quran.
            </p>
            <p style={{ fontWeight: 500, color: 'var(--foreground)' }}>
              We believe learning the Quran should never feel heavy or boring. We break complex Tajweed rules into easy, practical steps.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex justify-center">
            <Link href="/contact" className="rounded-full transition-all duration-500" style={{ padding: '0.8rem 2rem', border: '1px solid var(--color-border-accent)', color: 'var(--primary)', fontWeight: 600, fontSize: '0.95rem', fontFamily: "'DM Sans', sans-serif" }}>
              Start Learning Today
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── TEACHERS SECTION ── */}
      <section className="w-full relative z-10" style={{ padding: 'clamp(3rem, 6vw, 7rem) clamp(1rem, 4vw, 5rem)', background: 'var(--secondary)' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-[1280px] relative z-10"
        >
          <motion.div variants={fadeUp} className="text-center mb-16 space-y-4">
            <p className="eyebrow">Our Team</p>
            <h2 className="heading-divider" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)', letterSpacing: '-0.01em' }}>Our Dedicated Teachers</h2>
            <p className="mt-6" style={{ fontSize: '1.25rem', color: 'var(--muted-foreground)', fontFamily: "var(--font-body)" }}>Learn from highly qualified instructors who are passionate about the Quran.</p>
          </motion.div>

          {teachers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teachers.map((teacher, index) => (
                <motion.div
                  key={teacher.id || index}
                  variants={cardHover}
                  whileHover={{ y: -8 }}
                  className="group p-6 space-y-4 transition-all duration-500 relative overflow-hidden card-accent-top"
                  style={{ borderRadius: '20px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'rgba(201,168,76,0.05)' }} />

                  <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 overflow-hidden relative z-10" style={{ background: 'rgba(201,168,76,0.1)', border: '2px solid rgba(201,168,76,0.2)' }}>
                    {teacher.imagePath ? (
                      <img src={teacher.imagePath} alt={teacher.name} className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-10 h-10" style={{ color: '#C9A84C' }} />
                    )}
                  </div>
                  <div className="text-center relative z-10">
                    <h3 style={{ fontSize: '1.4rem', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)' }}>{teacher.name}</h3>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--primary)', fontFamily: "var(--font-body)", letterSpacing: '0.05em' }} className="mb-3 uppercase">{teacher.role}</p>
                    <p style={{ fontSize: '0.95rem', color: 'var(--muted-foreground)', fontFamily: "var(--font-body)", lineHeight: 1.6 }} className="line-clamp-3 mb-4">{teacher.bio}</p>
                    <Link href={`/teachers/${teacher.id}`} className="inline-block mt-2 transition-colors group/link" style={{ fontWeight: 600, color: 'var(--primary)', fontFamily: "var(--font-body)", fontSize: '0.9rem' }}>
                      View Full Profile <ChevronRight className="inline w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {teacher.videoPath && (
                    <div className="pt-4 border-t border-primary/10 mt-4 relative z-10">
                      {teacher.videoPath.includes("youtube.com") || teacher.videoPath.includes("youtu.be") ? (
                        <Link href={teacher.videoPath} target="_blank" className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary/10 text-primary rounded-xl text-sm font-semibold hover:bg-primary/20 transition-colors">
                          <Video className="w-4 h-4" /> Watch Intro
                        </Link>
                      ) : (
                        <button onClick={() => setActiveVideo(teacher.videoPath as string)} className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary/10 text-primary rounded-xl text-sm font-semibold hover:bg-primary/20 transition-colors">
                          <PlayCircle className="w-4 h-4" /> Play Intro Video
                        </button>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div variants={cardHover} whileHover={{ y: -5 }} className="p-10 text-center space-y-4 transition-all duration-500 card-accent-top" style={{ borderRadius: '24px', background: 'var(--card)', border: '1px solid var(--border)' }}>
                <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6" style={{ background: 'var(--color-gold-glow)' }}>
                  <Users className="w-10 h-10" style={{ color: 'var(--primary)' }} />
                </div>
                <h3 style={{ fontSize: '1.75rem', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)' }}>Male Teachers</h3>
                <p style={{ color: 'var(--muted-foreground)', fontFamily: "var(--font-body)", lineHeight: 1.7 }}>Expert Qaris available for brothers and young boys. Focus on strong Arabic articulation.</p>
              </motion.div>
              <motion.div variants={cardHover} whileHover={{ y: -5 }} className="p-10 text-center space-y-4 transition-all duration-500 card-accent-top" style={{ borderRadius: '24px', background: 'var(--card)', border: '1px solid var(--border)' }}>
                <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6" style={{ background: 'var(--color-gold-glow)' }}>
                  <Users className="w-10 h-10" style={{ color: 'var(--primary)' }} />
                </div>
                <h3 style={{ fontSize: '1.75rem', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)' }}>Female Teachers</h3>
                <p style={{ color: 'var(--muted-foreground)', fontFamily: "var(--font-body)", lineHeight: 1.7 }}>Qualified female instructors for sisters and young girls, providing a supportive environment.</p>
              </motion.div>
            </div>
          )}
        </motion.div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl bg-card rounded-2xl overflow-hidden shadow-2xl relative border border-primary/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setActiveVideo(null)} className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors">✕</button>
              <video src={activeVideo} className="w-full aspect-video outline-none" controls autoPlay />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════ FINAL CTA ════════ */}
      <section className="w-full relative z-10 overflow-hidden" style={{ padding: 'clamp(3rem, 6vw, 7rem) clamp(1rem, 4vw, 5rem)' }}>
        {/* CTA Banner background */}
        <div className="absolute inset-0 bg-secondary" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] blur-[200px] rounded-full pointer-events-none opacity-20" style={{ background: 'var(--primary)' }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-[1000px] relative z-10"
        >
          <div className="text-center relative overflow-hidden" style={{ padding: 'clamp(3rem, 6vw, 5rem)', borderRadius: '32px', background: 'var(--card)', backdropFilter: 'blur(20px)', border: '1px solid var(--color-border-accent)' }}>
            {/* Inner ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[2px]" style={{ background: 'linear-gradient(to right, transparent, var(--primary), transparent)' }} />

            <div className="relative z-10 space-y-8">
              <Moon className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--primary)', opacity: 0.4 }} />
              <h2 className="text-glow" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)', letterSpacing: '-0.01em' }}>Ready to Improve Your Recitation?</h2>
              <p className="max-w-2xl mx-auto" style={{ color: 'var(--muted-foreground)', fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', fontFamily: "var(--font-body)", lineHeight: 1.75 }}>
                Join structured online Quran classes at Sawt ul Quran Learning Academy with qualified teachers. Book your free trial session today.
              </p>
              <div className="flex justify-center pt-4">
                <Link href="/contact" className="rounded-full btn-glow transition-all duration-500 hover:scale-105" style={{ padding: '1rem 3rem', background: 'var(--primary)', color: 'var(--primary-foreground)', fontWeight: 700, fontSize: '1rem', fontFamily: "var(--font-body)", boxShadow: '0 0 30px rgba(201,168,76,0.3)' }}>
                  Book Your Free Trial
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
