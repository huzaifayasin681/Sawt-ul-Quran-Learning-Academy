"use client";

import Link from "next/link";
import { ChevronRight, Star, PlayCircle, BookOpen, GraduationCap, Users, Video, Sparkles, Moon } from "lucide-react";
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

function AyatTypewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    const chars = text.split("");
    let i = 0;
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < chars.length) {
          const currentChar = chars[i];
          i++;
          setDisplayed(prev => prev + currentChar);
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, 60);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  return (
    <span className={`transition-opacity duration-500 ${done ? "opacity-100" : "opacity-90"}`}>
      {displayed}
      {!done && (
        <span className="inline-block w-[2px] h-[1em] bg-primary/60 ml-1 animate-pulse align-middle" />
      )}
    </span>
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
              <p className="text-primary/50 text-xs tracking-[0.3em] uppercase mb-3 font-medium">بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ</p>
              <div className="w-24 h-[1px] mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
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
                    className="text-primary/80 font-serif leading-[1.8]"
                    dir="rtl"
                    style={{
                      fontFamily: "'Amiri', serif",
                      fontSize: slide.arabic.length === 1 ? "1.8rem" : i === 0 ? "1.5rem" : "1.25rem",
                      opacity: 1 - (i * 0.12),
                    }}
                  >
                    <AyatTypewriter text={line} delay={i * 800} />
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
                <p className="text-foreground/40 text-sm leading-relaxed italic">
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
                <div className="w-20 h-[1px] mx-auto bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-3" />
                <p className="text-primary/35 text-[11px] tracking-[0.2em] uppercase font-medium">{slide.reference}</p>
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
    <p ref={ref} className="tabular-nums text-glow" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#C9A84C' }}>
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

  const testimonials = [
    { text: "My kids used to find Quran class boring, but now they are excited every day. Ibrahim's team is so engaging.", author: "Mother of 2 (UK)", rating: 5 },
    { text: "Starting from zero as an adult convert was intimidating, but they made Tajweed easy to understand without pressure.", author: "Newbie Adult Learner (US)", rating: 5 },
    { text: "The deep error correction in the advanced Tajweed level completely transformed my recitation fluency.", author: "Advanced Student (Canada)", rating: 5 },
    { text: "I love how the teachers focus on pronunciation. Best decision I made for my islamic studies.", author: "University Student (Australia)", rating: 5 },
  ];

  return (
    <div className="flex flex-col items-center overflow-hidden" style={{ background: '#060A09' }}>

      {/* ════════ HERO SECTION — SPLIT LAYOUT ════════ */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden" style={{ padding: '0' }}>
        {/* Cinematic ambient glows */}
        <div className="absolute top-[15%] left-[30%] w-[600px] h-[400px] blur-[150px] rounded-full pointer-events-none" style={{ background: 'rgba(201,168,76,0.06)' }} />
        <div className="absolute bottom-[15%] left-[10%] w-[400px] h-[300px] blur-[120px] rounded-full pointer-events-none" style={{ background: 'rgba(13,79,60,0.15)' }} />
        <div className="absolute top-[25%] right-[15%] w-[350px] h-[250px] blur-[100px] rounded-full pointer-events-none" style={{ background: 'rgba(201,168,76,0.04)' }} />
        {/* Radial gradient spotlight */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(13,79,60,0.25), transparent)' }} />

        {/* ── Split container: text left, mushaf right ── */}
        <div className="relative z-10 mx-auto max-w-[1280px] w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16" style={{ paddingTop: 'clamp(1rem, 3vw, 3rem)', paddingBottom: 'clamp(1rem, 3vw, 3rem)' }}>

          {/* ── LEFT: Content ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex-1 space-y-8 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 badge-gold backdrop-blur-md" style={{ padding: '0.4rem 1rem' }}>
              <Sparkles className="h-3.5 w-3.5" style={{ color: '#C9A84C' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase' as const, fontWeight: 500 }}>Trusted by families across 15+ countries</span>
            </motion.div>

            {/* Main heading */}
            <motion.h1 variants={fadeUp} className="text-balance" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
              <span className="block">From <span className="text-glow italic" style={{ color: '#C9A84C' }}>Qaida</span> to <span className="text-glow italic" style={{ color: '#C9A84C' }}>Quran</span></span>
              <span className="block mt-3" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)', fontFamily: "'DM Sans', sans-serif", fontWeight: 400, color: '#A8B8B0' }}>
                <TypewriterText text="step-by-step with proper guidance." />
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p variants={fadeUp} className="max-w-xl mx-auto lg:mx-0 text-balance" style={{ fontSize: '1rem', lineHeight: 1.75, color: '#A8B8B0', fontFamily: "'DM Sans', sans-serif" }}>
              Online Quran classes for kids and adults. Structured courses, qualified teachers, personal feedback, and a learning system built on tradition and excellence.
            </motion.p>

            {/* CTA Buttons with inner glow */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto rounded-full flex items-center justify-center gap-2 btn-glow"
                style={{ padding: '0.8rem 2rem', background: '#C9A84C', color: '#060A09', fontWeight: 600, fontSize: '0.95rem', fontFamily: "'DM Sans', sans-serif", boxShadow: '0 0 20px rgba(201,168,76,0.25)' }}
              >
                Free Trial Class
                <ChevronRight className="h-5 w-5" />
              </Link>
              <Link
                href="/courses"
                className="w-full sm:w-auto rounded-full flex items-center justify-center gap-2 transition-all duration-500 backdrop-blur-md"
                style={{ padding: '0.8rem 2rem', background: 'transparent', border: '1px solid rgba(201,168,76,0.25)', color: '#C9A84C', fontWeight: 600, fontSize: '0.95rem', fontFamily: "'DM Sans', sans-serif" }}
              >
                <BookOpen className="h-5 w-5" style={{ color: '#C9A84C' }} />
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

      {/* ════════ ANIMATED STATS BAR ════════ */}
      <section className="relative w-full z-10" style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0', background: '#060A09', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="mx-auto max-w-[1280px] px-6 md:px-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { target: 8, suffix: "+", label: "Years Teaching", delay: 0 },
              { target: 1000, suffix: "+", label: "Students Taught", delay: 0.2 },
              { target: 15, suffix: "+", label: "Countries", delay: 0.4 },
              { target: 5, suffix: "★", label: "Average Rating", delay: 0.6 },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUp} className="space-y-2" style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                <AnimatedCounter target={stat.target} suffix={stat.suffix} delay={stat.delay} />
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: '#A8B8B0', textTransform: 'uppercase' as const, letterSpacing: '0.08em', fontWeight: 500 }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ════════ TESTIMONIALS MARQUEE ════════ */}
      <section className="relative w-full overflow-hidden z-10 section-dark" style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 5rem)' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="relative mx-auto max-w-[1280px]"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="eyebrow mb-4">Testimonials</p>
            <h2 className="heading-divider text-balance" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5', letterSpacing: '-0.01em' }}>Real Results, Real Trust</h2>
            <p className="mt-6" style={{ color: '#A8B8B0', fontSize: '1.125rem', fontFamily: "'DM Sans', sans-serif" }}>Hear from our students and parents worldwide.</p>
          </motion.div>

          <div className="relative flex overflow-x-hidden w-full max-w-6xl mx-auto py-4">
            <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #060A09, transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #060A09, transparent)' }} />

            <motion.div
              className="flex gap-6 whitespace-nowrap px-4 relative z-[5]"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
            >
              {[...testimonials, ...testimonials].map((testimonial, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden w-[380px] shrink-0 whitespace-normal transition-all duration-500 card-accent-top"
                  style={{ padding: '2.5rem', borderRadius: '24px', background: '#0D1612', border: '1px solid rgba(255,255,255,0.07)', animation: 'breathingBorder 4s ease-in-out infinite' }}
                >
                  {/* Decorative quotation mark */}
                  <div className="absolute top-4 left-6 pointer-events-none select-none" style={{ fontSize: '6rem', fontFamily: "'Cormorant Garamond', serif", color: '#C9A84C', opacity: 0.15, lineHeight: 1 }}>{"\u201C"}</div>
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'rgba(201,168,76,0.05)' }} />

                  <div className="flex gap-1 mb-4 relative z-10">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="h-4 w-4" style={{ fill: '#C9A84C', color: '#C9A84C' }} />
                    ))}
                  </div>
                  <p className="flex-1 italic leading-relaxed mb-4 relative z-10" style={{ fontSize: '0.95rem', color: '#EEE8D5', fontFamily: "'DM Sans', sans-serif" }}>"{testimonial.text}"</p>
                  <div className="relative z-10" style={{ fontWeight: 500, fontSize: '0.875rem', color: '#C9A84C', fontFamily: "'DM Sans', sans-serif" }}>{testimonial.author}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ════════ COURSES — CINEMATIC BENTO LAYOUT ════════ */}
      <section className="w-full overflow-hidden relative z-10" style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 5rem)', background: '#0D4F3C' }}>

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
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5', letterSpacing: '-0.01em' }}
            >
              Structured Learning for All Ages
            </motion.h2>
            <motion.p variants={fadeUp} className="max-w-2xl mx-auto mt-6" style={{ fontSize: '1.125rem', color: '#A8B8B0', lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif" }}>
              Whether you are a complete beginner or an advanced student perfecting your Makharij, we have a specialized path.
            </motion.p>
          </motion.div>

          {/* ── Course Level Cards — 3 columns ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: BookOpen,
                step: "01",
                title: "Qaida Basics",
                desc: "Start from zero with Arabic letters, Harakat, and foundational pronunciation. Perfect for absolute beginners of any age.",
                features: ["Arabic Alphabet", "Basic Harakat", "Letter Connections", "Pronunciation Drills"],
                gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
                borderHover: "hover:border-emerald-500/30",
                iconBg: "bg-emerald-500/10",
                iconColor: "text-emerald-600 dark:text-emerald-400",
              },
              {
                icon: PlayCircle,
                step: "02",
                title: "Nazra Practice",
                desc: "Build real fluency by reading directly from the Mushaf. Focus on speed, accuracy, and self-correction skills.",
                features: ["Mushaf Reading", "Fluency Building", "Error Correction", "Speed Training"],
                gradient: "from-primary/10 via-primary/5 to-transparent",
                borderHover: "hover:border-primary/30",
                iconBg: "bg-primary/10",
                iconColor: "text-primary",
                featured: true,
              },
              {
                icon: GraduationCap,
                step: "03",
                title: "Tajweed & Advanced",
                desc: "Master the rules of Tajweed, articulation points (Makharij), and beautiful recitation with Ijazah-certified guidance.",
                features: ["Tajweed Rules", "Makharij Mastery", "Qira'at Styles", "Ijazah Prep"],
                gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
                borderHover: "hover:border-amber-500/30",
                iconBg: "bg-amber-500/10",
                iconColor: "text-amber-600 dark:text-amber-400",
              },
            ].map((course, i) => (
              <motion.div
                key={i}
                variants={cardHover}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden transition-all duration-500 card-accent-top ${course.featured ? 'md:scale-105 md:-my-4' : ''}`}
                style={{ borderRadius: '20px', padding: '2rem', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: course.featured ? '1px solid rgba(201,168,76,0.25)' : '1px solid rgba(255,255,255,0.07)', boxShadow: course.featured ? '0 0 60px rgba(201,168,76,0.08)' : 'none' }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                {/* Featured badge */}
                {course.featured && (
                  <div className="absolute top-4 right-4 badge-gold">
                    Most Popular
                  </div>
                )}

                <div className="relative z-10 space-y-6">
                  {/* Step number + Icon */}
                  <div className="flex items-center gap-4">
                    <div className="icon-container transition-all duration-500 group-hover:scale-110">
                      <course.icon className="w-6 h-6" style={{ color: '#C9A84C' }} />
                    </div>
                    <span className="text-5xl font-black text-foreground/5 group-hover:text-foreground/10 transition-colors duration-500 select-none">
                      {course.step}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 500, color: '#EEE8D5' }} className="mb-3">{course.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: '#A8B8B0', lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif" }}>{course.desc}</p>
                  </div>

                  {/* Feature chips */}
                  <div className="flex flex-wrap gap-2">
                    {course.features.map((feature, j) => (
                      <span
                        key={j}
                        className="badge-gold"
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
              { emoji: "👦", label: "Kids", desc: "Fun & engaging", color: "border-emerald-500/15 hover:border-emerald-500/30" },
              { emoji: "🧑", label: "Teens", desc: "Guided growth", color: "border-primary/15 hover:border-primary/30" },
              { emoji: "🧕", label: "Adults", desc: "Flexible hours", color: "border-amber-500/15 hover:border-amber-500/30" },
              { emoji: "👥", label: "1-on-1 & Group", desc: "Your choice", color: "border-purple-500/15 hover:border-purple-500/30" },
            ].map((age, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="group text-center p-5 transition-all duration-500 cursor-default"
                style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)', borderRadius: '16px' }}
              >
                <span className="text-3xl block mb-2">{age.emoji}</span>
                <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '0.875rem', color: '#EEE8D5' }}>{age.label}</h4>
                <p style={{ fontSize: '0.75rem', color: '#A8B8B0', fontFamily: "'DM Sans', sans-serif" }} className="mt-1">{age.desc}</p>
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

      {/* ════════ ABOUT IBRAHIM ════════ */}
      <section className="w-full relative z-10 overflow-hidden section-dark" style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 5rem)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] blur-[150px] rounded-full pointer-events-none" style={{ background: 'rgba(13,79,60,0.12)' }} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-[1280px] text-center space-y-14 relative z-10"
        >
          <motion.div variants={fadeUp} className="space-y-4">
            <p className="eyebrow">About</p>
            <h2 className="heading-divider" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5', letterSpacing: '-0.01em' }}>About Ibrahim</h2>
            <p className="italic mt-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', color: 'rgba(201,168,76,0.8)' }}>Certified with Ijazah from Masjid Nabawi</p>
          </motion.div>

          <motion.div variants={fadeUp} className="max-w-3xl mx-auto space-y-6" style={{ fontSize: '1rem', lineHeight: 1.75, color: '#A8B8B0', fontFamily: "'DM Sans', sans-serif" }}>
            <p>
              I am honored to hold an Ijazah (a high-level teaching certification) directly connected to scholars of Masjid al-Nabawi in Madinah. This means my teaching is rooted in authentic tradition, precision, and responsibility.
            </p>
            <p>
              For the past 8 years, I have taught students of all ages across different countries through online classes. From young children learning their first letters to adults improving their Tajweed, I have helped students strengthen both their recitation and their love for the Quran.
            </p>
            <p style={{ fontWeight: 500, color: '#EEE8D5' }}>
              We believe learning the Quran should never feel heavy or boring. We break complex Tajweed rules into easy, practical steps.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex justify-center">
            <Link href="/contact" className="rounded-full transition-all duration-500" style={{ padding: '0.8rem 2rem', border: '1px solid rgba(201,168,76,0.25)', color: '#C9A84C', fontWeight: 600, fontSize: '0.95rem', fontFamily: "'DM Sans', sans-serif" }}>
              Start Learning Today
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════ TEACHERS SECTION ════════ */}
      <section className="w-full relative z-10" style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 5rem)', background: '#0D4F3C' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-[1280px] relative z-10"
        >
          <motion.div variants={fadeUp} className="text-center mb-16 space-y-4">
            <p className="eyebrow">Our Team</p>
            <h2 className="heading-divider" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5', letterSpacing: '-0.01em' }}>Our Dedicated Teachers</h2>
            <p className="mt-6" style={{ fontSize: '1.125rem', color: '#A8B8B0', fontFamily: "'DM Sans', sans-serif" }}>Learn from highly qualified instructors who are passionate about the Quran.</p>
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
                    <h3 style={{ fontSize: '1.25rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 500, color: '#EEE8D5' }}>{teacher.name}</h3>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#C9A84C', fontFamily: "'DM Sans', sans-serif" }} className="mb-3">{teacher.role}</p>
                    <p style={{ fontSize: '0.875rem', color: '#A8B8B0', fontFamily: "'DM Sans', sans-serif" }} className="line-clamp-3 mb-4">{teacher.bio}</p>
                    <Link href={`/teachers/${teacher.id}`} className="inline-block mt-2 transition-colors group/link" style={{ fontWeight: 600, color: '#C9A84C', fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem' }}>
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
              <motion.div variants={cardHover} whileHover={{ y: -5 }} className="p-8 text-center space-y-4 transition-all duration-500 card-accent-top" style={{ borderRadius: '20px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(201,168,76,0.1)' }}>
                  <Users className="w-10 h-10" style={{ color: '#C9A84C' }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5' }}>Male Teachers</h3>
                <p style={{ color: '#A8B8B0', fontFamily: "'DM Sans', sans-serif" }}>Expert Qaris available for brothers and young boys. Focus on strong Arabic articulation.</p>
              </motion.div>
              <motion.div variants={cardHover} whileHover={{ y: -5 }} className="p-8 text-center space-y-4 transition-all duration-500 card-accent-top" style={{ borderRadius: '20px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(201,168,76,0.1)' }}>
                  <Users className="w-10 h-10" style={{ color: '#C9A84C' }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5' }}>Female Teachers</h3>
                <p style={{ color: '#A8B8B0', fontFamily: "'DM Sans', sans-serif" }}>Qualified female instructors for sisters and young girls, providing a supportive environment.</p>
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
      <section className="w-full relative z-10 overflow-hidden" style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 5rem)' }}>
        {/* CTA Banner with gold gradient bg */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, #1A1200, #3D2800)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] blur-[200px] rounded-full pointer-events-none" style={{ background: 'rgba(201,168,76,0.08)' }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-[1000px] relative z-10"
        >
          <div className="text-center relative overflow-hidden" style={{ padding: 'clamp(3rem, 6vw, 5rem)', borderRadius: '24px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(201,168,76,0.25)' }}>
            {/* Inner ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[2px]" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.5), transparent)' }} />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px]" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)' }} />

            <div className="relative z-10 space-y-8">
              <Moon className="w-12 h-12 mx-auto mb-4" style={{ color: 'rgba(201,168,76,0.4)' }} />
              <h2 className="text-glow" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5', letterSpacing: '-0.01em' }}>Ready to Improve Your Recitation?</h2>
              <p className="max-w-2xl mx-auto" style={{ color: '#A8B8B0', fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.75 }}>
                Join structured online Quran classes with qualified teachers. Book your free trial session today and start learning with confidence.
              </p>
              <div className="flex justify-center pt-4">
                <Link href="/contact" className="rounded-full btn-glow transition-all duration-500 hover:scale-105" style={{ padding: '0.8rem 2.5rem', background: '#C9A84C', color: '#060A09', fontWeight: 600, fontSize: '0.95rem', fontFamily: "'DM Sans', sans-serif", boxShadow: '0 0 20px rgba(201,168,76,0.25)' }}>
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
