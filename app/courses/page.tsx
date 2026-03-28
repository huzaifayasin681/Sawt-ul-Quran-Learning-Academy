"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { BookOpen, CheckCircle2, ChevronRight, PlayCircle, GraduationCap, Award, Users, Sparkles, ArrowRight, Star } from "lucide-react";
import { motion, Variants, AnimatePresence, useInView } from "framer-motion";
import { Course } from "@/lib/db";

/* ═══════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════ */

const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const slideIn: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

/* ═══════════════════════════════════════════════════════
   ICON MAP
   ═══════════════════════════════════════════════════════ */

const iconMap: Record<string, React.ReactElement> = {
    "BookOpen": <BookOpen />,
    "PlayCircle": <PlayCircle />,
    "GraduationCap": <GraduationCap />,
    "Award": <Award />
};

/* ═══════════════════════════════════════════════════════
   GRADIENT MAPPING — maps course colors to cinematic gradients
   ═══════════════════════════════════════════════════════ */

const courseGradients = [
    { bg: "from-emerald-500/10 to-transparent", accent: "var(--primary)" },
    { bg: "from-primary/10 to-transparent", accent: "var(--primary)" },
    { bg: "from-amber-500/10 to-transparent", accent: "var(--primary)" },
];

/* ═══════════════════════════════════════════════════════
   ANIMATED COURSE CARD
   ═══════════════════════════════════════════════════════ */

function CourseCard({ course, index }: { course: Course; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const isEven = index % 2 === 0;
    const gradient = courseGradients[index % courseGradients.length];

    return (
        <motion.div
            ref={ref}
            id={course.id}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group"
        >
            <div className={`relative flex flex-col lg:flex-row ${!isEven ? 'lg:flex-row-reverse' : ''} items-stretch overflow-hidden transition-all duration-700 card-accent-top glass border-primary/10 shadow-2xl`} style={{ borderRadius: '24px', background: 'var(--card)' }}>

                {/* ── Content Side ── */}
                <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
                    {/* Step indicator */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-7xl font-black text-foreground/[0.03] select-none absolute top-4 right-4 lg:top-8 lg:right-8 group-hover:text-primary/5 transition-colors duration-700">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="icon-container transition-all duration-500 group-hover:scale-110" style={{ background: 'var(--color-gold-glow)' }}>
                            {React.cloneElement(iconMap[course.iconName] || <BookOpen />, {
                                className: 'w-5 h-5',
                                style: { color: 'var(--primary)' }
                            } as any)}
                        </div>
                        <span className="eyebrow">
                            Path {index + 1}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)', letterSpacing: '-0.01em' }} className="mb-4">{course.title}</h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--muted-foreground)', lineHeight: 1.8, fontFamily: "var(--font-body)" }} className="mb-8 max-w-lg">{course.subtitle}</p>

                    {/* Features grid */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                        {course.features.map((feature, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                                className="flex items-start gap-3 group/feature"
                            >
                                <div className="p-1 rounded-full bg-primary/10 shrink-0 mt-0.5 transition-colors group-hover/feature:bg-primary/20">
                                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
                                </div>
                                <span style={{ color: 'var(--foreground)', fontSize: '0.95rem', fontWeight: 500, fontFamily: "var(--font-body)" }}>{feature}</span>
                            </motion.li>
                        ))}
                    </ul>

                    {/* CTA button */}
                    <div>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2.5 rounded-full transition-all duration-500 btn-glow group/btn text-sm"
                            style={{ padding: '0.9rem 2.5rem', background: 'var(--primary)', color: 'var(--primary-foreground)', fontWeight: 700, fontFamily: "var(--font-body)" }}
                        >
                            Start Your Journey
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* ── Visual Side ── */}
                <div className={`w-full lg:w-2/5 min-h-[280px] lg:min-h-[450px] flex items-center justify-center relative overflow-hidden bg-gradient-to-br ${gradient.bg}`}>
                    {/* Ambient glow */}
                    <div className="absolute inset-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-primary/10 rounded-full blur-[100px]" />
                    </div>

                    {/* Geometric decorations */}
                    <div className="absolute top-8 right-8 w-24 h-24 border border-primary/10 rounded-3xl rotate-12 transition-transform duration-1000 group-hover:rotate-[30deg]" />
                    <div className="absolute bottom-10 left-10 w-20 h-20 border border-primary/10 rounded-2xl -rotate-6 transition-transform duration-1000 group-hover:rotate-6" />

                    {/* Main icon */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                        className="relative z-10"
                    >
                        {React.cloneElement(iconMap[course.iconName] || <BookOpen />, {
                            className: 'w-32 h-32 md:w-44 md:h-44 opacity-20 group-hover:opacity-40 transition-all duration-700 group-hover:scale-110',
                            style: { color: 'var(--primary)' }
                        } as any)}
                    </motion.div>

                    {/* Inner shimmer */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "linear-gradient(110deg, transparent 30%, var(--color-gold-glow) 50%, transparent 70%)",
                            backgroundSize: "200% 100%",
                            animation: "shimmer 8s linear infinite",
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════
   COURSES PAGE
   ═══════════════════════════════════════════════════════ */

export default function Courses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/courses")
            .then(res => res.json())
            .then(data => {
                setCourses(data.filter((c: Course) => c.isActive));
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="flex flex-col items-center relative overflow-hidden" style={{ background: 'var(--background)' }}>

            {/* ── Ambient background glows ── */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <motion.div
                    className="absolute top-[5%] left-[5%] w-[500px] h-[500px] rounded-full blur-[140px]"
                    style={{ background: 'var(--color-gold-glow)' }}
                    animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-[40%] right-[5%] w-[400px] h-[400px] rounded-full blur-[120px]"
                    style={{ background: 'var(--color-emerald)', opacity: 0.1 }}
                    animate={{ x: [0, -40, 0], y: [0, -50, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* ═══════ HERO HEADER ═══════ */}
            <section className="w-full pt-24 pb-20 text-center relative z-10" style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem) clamp(3rem, 6vw, 5rem)' }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] blur-[150px] rounded-full pointer-events-none" style={{ background: 'var(--color-emerald)', opacity: 0.1 }} />

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="mx-auto max-w-[1280px] relative z-10"
                >
                    <motion.div variants={fadeUp} className="badge-gold inline-flex items-center gap-2 backdrop-blur-md mb-8" style={{ padding: '0.4rem 1rem' }}>
                        <Sparkles className="h-3.5 w-3.5" style={{ color: 'var(--primary)' }} />
                        <span style={{ fontFamily: "var(--font-body)", fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase' as const, fontWeight: 500 }}>Find Your Level. Begin Your Quran Journey.</span>
                    </motion.div>

                    <motion.h1
                        variants={{
                            hidden: { opacity: 0, x: -100 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        className="text-balance mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
                        Find Your Level.
                        <span className="block text-glow" style={{ color: 'var(--primary)' }}>Begin Your Quran Journey.</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} className="max-w-2xl mx-auto" style={{ fontSize: '1.125rem', color: 'var(--muted-foreground)', lineHeight: 1.75, fontFamily: "var(--font-body)" }}>
                        Structured learning paths designed for absolute beginners to advanced reciters. Tailored to help you improve your recitation with proper Tajweed.
                    </motion.p>
                </motion.div>

                {/* Decorative divider */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, var(--color-border-accent), transparent)' }} />
            </section>

            {/* ═══════ COURSES LIST ═══════ */}
            <section className="w-full relative z-10" style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem)' }}>
                <div className="mx-auto max-w-[1280px] space-y-16">
                    {loading ? (
                        <div className="text-center py-20">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full mx-auto mb-4"
                            />
                            <p className="text-muted-foreground">Loading curriculums...</p>
                        </div>
                    ) : courses.length === 0 ? (
                        <div className="text-center py-20">
                            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" />
                            <p className="text-muted-foreground text-lg">No active courses available at the moment.</p>
                        </div>
                    ) : (
                        courses.map((course, index) => (
                            <CourseCard key={course.id} course={course} index={index} />
                        ))
                    )}
                </div>
            </section>

            {/* ═══════ CLASS OPTIONS ═══════ */}
            <section className="w-full relative z-10 overflow-hidden" style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem)', background: 'var(--secondary)' }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={stagger}
                    className="mx-auto max-w-[1280px] relative z-10"
                >
                    <motion.div variants={fadeUp} className="text-center mb-16 space-y-4">
                        <p className="eyebrow">Flexibility</p>
                        <h2 className="heading-divider" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)', letterSpacing: '-0.01em' }}>Class Options</h2>
                        <p className="mt-6" style={{ fontSize: '1.125rem', color: 'var(--muted-foreground)', fontFamily: "var(--font-body)" }}>Choose the learning format that works best for you.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* ── One-to-One Quran Class ── */}
                        <motion.div
                            variants={fadeUp}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative p-10 md:p-12 transition-all duration-500 overflow-hidden glass border-primary/30 shadow-[0_0_40px_rgba(201,168,76,0.1)]"
                            style={{ borderRadius: '24px', background: 'var(--card)' }}
                        >
                            <div className="absolute top-0 right-0 p-4">
                                <span className="badge-gold">Recommended</span>
                            </div>
                            <div className="relative z-10">
                                <div className="icon-container mb-6 transition-transform duration-500 group-hover:scale-110" style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--color-gold-glow)' }}>
                                    <Users className="w-8 h-8" style={{ color: 'var(--primary)' }} />
                                </div>

                                <h3 style={{ fontSize: '2rem', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)' }} className="mb-4">One-to-One Quran Class <br /><span className="italic text-primary">with Ustad Ibrahim</span></h3>

                                <ul className="space-y-4 mb-8">
                                    {[
                                        "Personalized daily sessions",
                                        "Ustad Ibrahim listens to your Surahs",
                                        "Immediate correction of errors",
                                        "Daily revision",
                                        "Implementation of all Tajweed rules",
                                        "Improve fluency and confidence in recitation"
                                    ].map((feature, j) => (
                                        <li key={j} className="flex items-center gap-3" style={{ fontSize: '1rem', fontWeight: 500, fontFamily: "var(--font-body)" }}>
                                            <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: 'var(--primary)' }} />
                                            <span style={{ color: 'var(--foreground)' }}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/contact" className="inline-flex w-full justify-center items-center gap-2.5 rounded-full py-4 bg-primary text-primary-foreground font-bold btn-glow transition-all">
                                    Enroll in Private Session
                                </Link>
                            </div>
                        </motion.div>

                        {/* ── Group Class ── */}
                        <motion.div
                            variants={fadeUp}
                            whileHover={{ y: -8 }}
                            className="group relative p-10 md:p-12 transition-all duration-500 overflow-hidden glass border-white/5"
                            style={{ borderRadius: '24px', background: 'var(--card)' }}
                        >
                            <div className="relative z-10">
                                <div className="icon-container mb-6 transition-transform duration-500 group-hover:scale-110" style={{ width: '64px', height: '64px', borderRadius: '16px' }}>
                                    <Users className="w-8 h-8" style={{ color: 'var(--primary)' }} />
                                </div>

                                <h3 style={{ fontSize: '1.75rem', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)' }} className="mb-4">Group Quran Learning <br /><span className="text-muted-foreground">with Ustad Ibrahim</span></h3>

                                <p style={{ color: 'var(--muted-foreground)', fontFamily: "var(--font-body)", lineHeight: 1.8 }} className="mb-8">
                                    Learn how to pronounce Arabic letters properly with Ustadh Ibrahim and memorize the Quran with him step by step, with full Tajweed guidance. <br /><br />
                                    Join as a group, start with your friends, grow together, and keep each other motivated—encouraging one another as you work toward memorizing your first Juz.
                                </p>

                                <ul className="space-y-4 mb-8">
                                    {[
                                        "Peer learning & competition",
                                        "Structured group curriculum",
                                        "Community support & motivation",
                                        "Grow together with friends"
                                    ].map((feature, j) => (
                                        <li key={j} className="flex items-center gap-3" style={{ fontSize: '1rem', fontWeight: 500, fontFamily: "var(--font-body)" }}>
                                            <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: 'var(--primary)' }} />
                                            <span style={{ color: 'var(--foreground)' }}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/contact" className="inline-flex w-full justify-center items-center gap-2.5 rounded-full py-4 border border-primary/30 text-primary font-bold hover:bg-primary/5 transition-all">
                                    Join a Group
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* ═══════ FINAL CTA ═══════ */}
            <section className="w-full text-center relative z-10" style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem)' }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] blur-[150px] rounded-full pointer-events-none" style={{ background: 'var(--color-gold-glow)' }} />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl mx-auto relative z-10"
                >
                    <div className="relative overflow-hidden glass" style={{ padding: 'clamp(3rem, 6vw, 5rem)', borderRadius: '24px', border: '1px solid var(--color-border-accent)' }}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px]" style={{ background: 'linear-gradient(to right, transparent, var(--color-border-accent), transparent)' }} />

                        <GraduationCap className="w-10 h-10 mx-auto mb-6 opacity-30" style={{ color: 'var(--primary)' }} />
                        <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)' }} className="mb-4">Not sure which course is right?</h3>
                        <p className="mb-8 max-w-lg mx-auto" style={{ fontSize: '1.125rem', color: 'var(--muted-foreground)', fontFamily: "var(--font-body)", lineHeight: 1.75 }}>
                            Take our quick 3-minute quiz to find out exactly where you should start your Quran learning journey.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/quiz"
                                className="inline-flex items-center gap-2.5 rounded-full btn-glow transition-all duration-500 hover:scale-105 text-sm"
                                style={{ padding: '0.8rem 2.2rem', background: 'var(--primary)', color: 'var(--primary-foreground)', fontWeight: 600, fontFamily: "var(--font-body)" }}
                            >
                                <Sparkles className="w-5 h-5" />
                                Take the Level Quiz
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-full transition-all duration-500 text-sm"
                                style={{ padding: '0.8rem 2.2rem', border: '1px solid var(--color-border-accent)', color: 'var(--primary)', fontWeight: 600, fontFamily: "var(--font-body)" }}
                            >
                                Book Free Trial
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
