"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import islamicLottieData from "@/lib/islamic-lottie-data";

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

/* ═══════════════════════════════════════════════════════
   ORNAMENTAL CORNER COMPONENT
   ═══════════════════════════════════════════════════════ */

function OrnamentalCorner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const rotations = { tl: "0deg", tr: "90deg", bl: "270deg", br: "180deg" };
  return (
    <motion.div
      className="absolute w-20 h-20 md:w-28 md:h-28"
      style={{
        top: position.startsWith("t") ? "8%" : "auto",
        bottom: position.startsWith("b") ? "8%" : "auto",
        left: position.endsWith("l") ? "8%" : "auto",
        right: position.endsWith("r") ? "8%" : "auto",
        transform: `rotate(${rotations[position]})`,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 0.3, scale: 1 }}
      transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5 5 L5 35 Q5 5 35 5"
          stroke="rgba(212,168,83,0.5)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M10 10 L10 28 Q10 10 28 10"
          stroke="rgba(212,168,83,0.3)"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="5" cy="5" r="2" fill="rgba(212,168,83,0.4)" />
        <path
          d="M5 5 L18 18"
          stroke="rgba(212,168,83,0.15)"
          strokeWidth="0.5"
          strokeDasharray="2 3"
        />
      </svg>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   FLOATING GOLDEN PARTICLES
   ═══════════════════════════════════════════════════════ */

function FloatingParticles() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    delay: Math.random() * 3,
    x: Math.random() * 100,
    size: 1 + Math.random() * 3,
    duration: 3 + Math.random() * 3,
  }));

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            bottom: "-5%",
            background: "radial-gradient(circle, rgba(212,168,83,0.7) 0%, transparent 70%)",
          }}
          initial={{ y: 0, opacity: 0, scale: 0 }}
          animate={{
            y: "-110vh",
            opacity: [0, 0.8, 0.6, 0],
            scale: [0.3, 1, 0.6],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN BISMILLAH SPLASH SCREEN
   ═══════════════════════════════════════════════════════ */

export default function BismillahSplash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");
  const [mounted, setMounted] = useState(false);

  // Mount detection
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation timeline
  useEffect(() => {
    if (!mounted) return;

    // Phase: enter -> hold -> exit
    const holdTimer = setTimeout(() => setPhase("hold"), 800);
    const exitTimer = setTimeout(() => setPhase("exit"), 4200);
    const completeTimer = setTimeout(() => onComplete(), 5200);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [mounted, onComplete]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 45%, #16130a 0%, #0d0b06 35%, #080705 70%, #050403 100%)",
        }}
      >
        {/* ── Background texture overlay ── */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        {/* ── Central radial glow ── */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: "min(80vw, 600px)",
            height: "min(80vw, 600px)",
            background:
              "radial-gradient(circle, rgba(212,168,83,0.08) 0%, rgba(201,162,74,0.03) 40%, transparent 70%)",
            borderRadius: "50%",
          }}
          animate={{
            scale: [0.8, 1.15, 1],
            opacity: [0, 0.6, 0.4],
          }}
          transition={{ duration: 3, ease: "easeOut" }}
        />

        {/* ── Concentric ring pulse ── */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none"
            style={{
              width: `${ring * 180}px`,
              height: `${ring * 180}px`,
              borderColor: `rgba(212,168,83,${0.08 / ring})`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: [0, 0.3, 0.1] }}
            transition={{
              duration: 2.5,
              delay: 0.3 + ring * 0.3,
              ease: "easeOut",
            }}
          />
        ))}

        {/* ── Ornamental corners ── */}
        <OrnamentalCorner position="tl" />
        <OrnamentalCorner position="tr" />
        <OrnamentalCorner position="bl" />
        <OrnamentalCorner position="br" />

        {/* ── Floating particles ── */}
        <FloatingParticles />

        {/* ── Main content ── */}
        <div className="relative z-10 flex flex-col items-center gap-6 px-4">

          {/* Lottie Islamic Icon Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Lottie glow backdrop */}
            <div
              className="absolute inset-0 -m-8 rounded-full blur-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(212,168,83,0.2) 0%, transparent 70%)",
              }}
            />

            <div className="w-32 h-32 md:w-40 md:h-40 relative z-10">
              <Lottie
                animationData={islamicLottieData}
                loop={true}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </motion.div>

          {/* ── Decorative divider ── */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <div
              className="w-12 md:w-20 h-[1px]"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(212,168,83,0.4))",
              }}
            />
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "rgba(212,168,83,0.5)" }}
              animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div
              className="w-12 md:w-20 h-[1px]"
              style={{
                background:
                  "linear-gradient(to left, transparent, rgba(212,168,83,0.4))",
              }}
            />
          </motion.div>

          {/* ── Bismillah Arabic Text ── */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1.5,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <h1
              className="leading-[1.6]"
              dir="rtl"
              style={{
                fontFamily: "'Amiri', serif",
                fontSize: "clamp(2rem, 6vw, 3.8rem)",
                color: "rgba(212,168,83,0.9)",
                textShadow:
                  "0 0 40px rgba(212,168,83,0.25), 0 0 80px rgba(212,168,83,0.1), 0 2px 4px rgba(0,0,0,0.3)",
                letterSpacing: "0.02em",
              }}
            >
              بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
            </h1>
          </motion.div>

          {/* ── English Translation ── */}
          <motion.p
            className="text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(0.85rem, 2vw, 1.15rem)",
              color: "rgba(212,168,83,0.45)",
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              fontWeight: 300,
            }}
          >
            In the Name of Allah, the Most Gracious, the Most Merciful
          </motion.p>

          {/* ── Academy Name ── */}
          <motion.div
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(0.7rem, 1.5vw, 0.85rem)",
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.3em",
                textTransform: "uppercase" as const,
              }}
            >
              Sawt ul Quran Learning Academy
            </p>
          </motion.div>

          {/* ── Animated loading bar ── */}
          <motion.div
            className="mt-8 relative overflow-hidden"
            style={{
              width: "120px",
              height: "2px",
              background: "rgba(212,168,83,0.1)",
              borderRadius: "2px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              style={{
                height: "100%",
                background:
                  "linear-gradient(to right, rgba(212,168,83,0.3), rgba(212,168,83,0.7), rgba(212,168,83,0.3))",
                borderRadius: "2px",
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* ── Bottom gradient fade ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(5,4,3,1) 0%, transparent 100%)",
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
