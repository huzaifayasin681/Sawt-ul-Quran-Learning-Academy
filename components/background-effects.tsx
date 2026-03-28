"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

/* ═══════════════════════════════════════════════════════
   STARDUST PARTICLE SYSTEM
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
        }> = [];

        const isDark = resolvedTheme === "dark";

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            particles = [];
            const count = Math.min(Math.floor(window.innerWidth / 15), 100);
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * (isDark ? 2.5 : 1.8) + 0.3,
                    speed: Math.random() * 0.25 + 0.05,
                    opacity: isDark ? (Math.random() * 0.5 + 0.2) : (Math.random() * 0.3 + 0.1),
                    twinkle: Math.random() * Math.PI * 2,
                    twinkleSpeed: Math.random() * 0.02 + 0.005,
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.y -= p.speed;
                p.twinkle += p.twinkleSpeed;
                const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.twinkle));

                if (p.y < -10) {
                    p.y = canvas.height + 10;
                    p.x = Math.random() * canvas.width;
                }

                // Dynamic Color based on theme
                // Light mode: Sepia/Amber ink spots
                // Dark mode: Luminous gold stardust
                const colorBase = isDark ? "212, 175, 55" : "90, 72, 19";

                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
                gradient.addColorStop(0, `rgba(${colorBase}, ${alpha})`);
                gradient.addColorStop(0.5, `rgba(${colorBase}, ${alpha * 0.4})`);
                gradient.addColorStop(1, `rgba(${colorBase}, 0)`);

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                if (isDark) {
                    // Core point for sparkle in dark mode
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 230, 160, ${alpha * 1.2})`;
                    ctx.fill();
                }
            });

            animationId = requestAnimationFrame(animate);
        };

        resize();
        createParticles();
        animate();

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
            className="fixed inset-0 z-[1] pointer-events-none transition-opacity duration-1000"
            style={{
                mixBlendMode: resolvedTheme === "dark" ? "screen" : "multiply",
                opacity: resolvedTheme === "dark" ? 0.7 : 0.4
            }}
        />
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
        }, 3000);
        return () => {
            setMounted(false);
            clearInterval(interval);
        };
    }, []);

    const rotations = [0, 60, 120, 180];
    const scales = [1, 1.05, 0.95, 1.02];

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background">
            {/* Pattern Layer 1 - Large */}
            <motion.div
                className="absolute top-1/2 left-1/2 w-[140vmax] h-[140vmax]"
                animate={{
                    rotate: rotations[phase],
                    scale: scales[phase],
                    x: "-50%",
                    y: "-50%",
                }}
                transition={{ duration: 3, ease: [0.4, 0, 0.2, 1] }}
            >
                <svg viewBox="0 0 800 800" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="islamicPattern1" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path
                                d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.5"
                                className="text-primary/4"
                            />
                            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-primary/2" />
                        </pattern>
                    </defs>
                    <rect width="800" height="800" fill="url(#islamicPattern1)" />
                </svg>
            </motion.div>

            {/* Pattern Layer 2 - Subtle Counter rotation */}
            <motion.div
                className="absolute top-1/2 left-1/2 w-[110vmax] h-[110vmax]"
                animate={{
                    rotate: -rotations[phase] * 0.5,
                    scale: scales[(phase + 2) % 4],
                    x: "-50%",
                    y: "-50%",
                }}
                transition={{ duration: 3.5, ease: [0.4, 0, 0.2, 1] }}
            >
                <svg viewBox="0 0 600 600" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="islamicPattern2" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                            <polygon
                                points="40,5 70,22 70,58 40,75 10,58 10,22"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.4"
                                className="text-primary/2.5"
                            />
                        </pattern>
                    </defs>
                    <rect width="600" height="600" fill="url(#islamicPattern2)" />
                </svg>
            </motion.div>

            {/* Ambient depth gradient overlay */}
            <div className="absolute inset-0"
                style={{
                    background: resolvedTheme === "dark"
                        ? "radial-gradient(circle at 50% -20%, rgba(212,175,55,0.08) 0%, transparent 60%)"
                        : "radial-gradient(circle at 50% -20%, rgba(90, 72, 19, 0.03) 0%, transparent 50%)"
                }}
            />
        </div>
    );
}
