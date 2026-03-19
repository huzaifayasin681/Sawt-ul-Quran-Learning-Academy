"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   STARDUST PARTICLE SYSTEM
   ═══════════════════════════════════════════════════════ */

export function StardustParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let particles: Array<{
            x: number; y: number; size: number; speed: number;
            opacity: number; twinkle: number; twinkleSpeed: number;
        }> = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            particles = [];
            const count = Math.min(Math.floor(window.innerWidth / 12), 120);
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2.5 + 0.5,
                    speed: Math.random() * 0.3 + 0.05,
                    opacity: Math.random() * 0.6 + 0.1,
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
                const alpha = p.opacity * (0.5 + 0.5 * Math.sin(p.twinkle));

                if (p.y < -10) {
                    p.y = canvas.height + 10;
                    p.x = Math.random() * canvas.width;
                }

                // Golden stardust glow
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
                gradient.addColorStop(0, `rgba(212, 168, 83, ${alpha})`);
                gradient.addColorStop(0.5, `rgba(212, 168, 83, ${alpha * 0.3})`);
                gradient.addColorStop(1, `rgba(212, 168, 83, 0)`);

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Core bright point
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(232, 200, 117, ${alpha * 1.5})`;
                ctx.fill();
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
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[1] pointer-events-none"
            style={{ mixBlendMode: "screen" }}
        />
    );
}

/* ═══════════════════════════════════════════════════════
   3D ISLAMIC GEOMETRIC PATTERN
   ═══════════════════════════════════════════════════════ */

export function IslamicGeometricPattern() {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPhase(prev => (prev + 1) % 4);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const rotations = [0, 60, 120, 180];
    const scales = [1, 1.05, 0.95, 1.02];

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
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
                <svg viewBox="0 0 800 800" className="w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="islamicPattern1" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            {/* 8-pointed star geometric */}
                            <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
                            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-primary" />
                            <rect x="30" y="30" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-primary" transform="rotate(45 50 50)" />
                            {/* Connecting lines */}
                            <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.15" className="text-primary" />
                            <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.15" className="text-primary" />
                            <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.1" className="text-primary" />
                            <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.1" className="text-primary" />
                        </pattern>
                    </defs>
                    <rect width="800" height="800" fill="url(#islamicPattern1)" />
                </svg>
            </motion.div>

            {/* Pattern Layer 2 - Counter rotation */}
            <motion.div
                className="absolute top-1/2 left-1/2 w-[120vmax] h-[120vmax]"
                animate={{
                    rotate: -rotations[phase] * 0.7,
                    scale: scales[(phase + 2) % 4],
                    x: "-50%",
                    y: "-50%",
                }}
                transition={{ duration: 3.5, ease: [0.4, 0, 0.2, 1] }}
            >
                <svg viewBox="0 0 600 600" className="w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="islamicPattern2" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                            {/* Hexagonal pattern */}
                            <polygon points="40,5 70,22 70,58 40,75 10,58 10,22" fill="none" stroke="currentColor" strokeWidth="0.4" className="text-accent" />
                            <polygon points="40,15 58,26 58,54 40,65 22,54 22,26" fill="none" stroke="currentColor" strokeWidth="0.25" className="text-accent" />
                            <circle cx="40" cy="40" r="5" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-accent" />
                        </pattern>
                    </defs>
                    <rect width="600" height="600" fill="url(#islamicPattern2)" />
                </svg>
            </motion.div>

            {/* Ambient depth gradient overlay */}
            <div className="absolute inset-0"
                style={{
                    background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,168,83,0.03) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 20% 80%, rgba(14,16,37,0.8) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(14,16,37,0.8) 0%, transparent 60%)
          `
                }}
            />
        </div>
    );
}
