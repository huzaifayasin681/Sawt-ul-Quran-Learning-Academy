"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

/* ═══════════════════════════════════════════════════════
   STARDUST PARTICLE SYSTEM (Enhanced)
   ═══════════════════════════════════════════════════════ */

export function StardustParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let particles: Array<{
            x: number; y: number; size: number; speed: number;
            opacity: number; twinkle: number; twinkleSpeed: number;
            color: string;
        }> = [];

        const isDark = resolvedTheme === "dark";

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            particles = [];
            const count = Math.min(Math.floor(window.innerWidth / 22), 55);
            for (let i = 0; i < count; i++) {
                const colorBase = isDark ?
                    (Math.random() > 0.3 ? "212, 175, 55" : "168, 213, 186") :
                    (Math.random() > 0.3 ? "90, 72, 19" : "46, 125, 107");

                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * (isDark ? 1.5 : 1.0) + 0.3,
                    speed: Math.random() * 0.1 + 0.015,
                    opacity: isDark ? (Math.random() * 0.35 + 0.08) : (Math.random() * 0.15 + 0.04),
                    twinkle: Math.random() * Math.PI * 2,
                    twinkleSpeed: Math.random() * 0.012 + 0.004,
                    color: colorBase
                });
            }
        };

        let lastFrameTime = 0;
        const FPS_CAP = 28;

        const animate = (timestamp: number) => {
            animationId = requestAnimationFrame(animate);
            if (timestamp - lastFrameTime < 1000 / FPS_CAP) return;
            lastFrameTime = timestamp;

            if (document.hidden) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.y -= p.speed;
                p.twinkle += p.twinkleSpeed;
                const alpha = p.opacity * (0.5 + 0.5 * Math.sin(p.twinkle));

                if (p.y < -10) {
                    p.y = canvas.height + 10;
                    p.x = Math.random() * canvas.width;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
                ctx.fill();
            });
        };

        resize();
        createParticles();
        animationId = requestAnimationFrame(animate);

        window.addEventListener("resize", () => { resize(); createParticles(); });

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, [mounted, resolvedTheme]);

    if (!mounted) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-40 pointer-events-none transition-opacity duration-1000"
            style={{
                mixBlendMode: resolvedTheme === "dark" ? "screen" : "multiply",
                opacity: resolvedTheme === "dark" ? 0.6 : 0.3
            }}
        />
    );
}

/* ═══════════════════════════════════════════════════════
   AURA GLOW (Dynamic Spiritual Mist)
   ═══════════════════════════════════════════════════════ */

export function AuraGlow() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === "dark";

    return (
        <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
            {/* Emerald Mist Top Left */}
            <motion.div
                className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-20 dark:opacity-10"
                style={{ background: 'var(--primary)' }}
                animate={{
                    x: [0, 30, 0],
                    y: [0, 20, 0],
                    scale: [1, 1.05, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Gold Mist Bottom Right */}
            <motion.div
                className="absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-15 dark:opacity-[0.08]"
                style={{ background: 'var(--accent)' }}
                animate={{
                    x: [0, -30, 0],
                    y: [0, -25, 0],
                    scale: [1, 1.08, 1],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />
            {/* Central Soft Glow */}
            <div 
                className="absolute inset-0 opacity-20"
                style={{ 
                    background: isDark 
                        ? 'radial-gradient(circle at 50% 50%, rgba(168, 213, 186, 0.05) 0%, transparent 70%)' 
                        : 'radial-gradient(circle at 50% 50%, rgba(201, 162, 74, 0.03) 0%, transparent 70%)'
                }} 
            />
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   3D ISLAMIC GEOMETRIC PATTERN
   ═══════════════════════════════════════════════════════ */

export function IslamicGeometricPattern() {
    const { resolvedTheme } = useTheme();
    const [phase, setPhase] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setPhase(prev => (prev + 1) % 4);
        }, 5000); // Slower, more majestic transition
        return () => {
            setMounted(false);
            clearInterval(interval);
        };
    }, []);

    const rotations = [0, 90, 180, 270];
    const scales = [1, 1.02, 0.98, 1.01];

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden opacity-5 dark:opacity-[0.03]">
            {/* Pattern Layer 1 - Large */}
            <motion.div
                className="absolute top-1/2 left-1/2 w-[160vmax] h-[160vmax]"
                animate={{
                    rotate: rotations[phase],
                    scale: scales[phase],
                    x: "-50%",
                    y: "-50%",
                }}
                transition={{ duration: 5, ease: "easeInOut" }}
            >
                <svg viewBox="0 0 800 800" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="islamicPattern1" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                            <path
                                d="M60 10 L75 45 L110 60 L75 75 L60 110 L45 75 L10 60 L45 45 Z"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.3"
                                className="text-primary"
                            />
                            <circle cx="60" cy="60" r="20" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-primary/40" />
                        </pattern>
                    </defs>
                    <rect width="800" height="800" fill="url(#islamicPattern1)" />
                </svg>
            </motion.div>
        </div>
    );
}

