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
    { bg: "from-emerald-500/8 to-emerald-500/0", border: "", icon: "", glow: "", accent: "#C9A84C" },
    { bg: "from-primary/8 to-primary/0", border: "", icon: "", glow: "", accent: "#C9A84C" },
    { bg: "from-amber-500/8 to-amber-500/0", border: "", icon: "", glow: "", accent: "#C9A84C" },
    { bg: "from-emerald-600/8 to-emerald-600/0", border: "", icon: "", glow: "", accent: "#C9A84C" },
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
            <div className={`relative flex flex-col lg:flex-row ${!isEven ? 'lg:flex-row-reverse' : ''} items-stretch overflow-hidden transition-all duration-700 card-accent-top`} style={{ borderRadius: '20px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)' }}>

                {/* ── Content Side ── */}
                <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
                    {/* Step indicator */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-7xl font-black text-foreground/[0.04] select-none absolute top-4 right-4 lg:top-8 lg:right-8">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="icon-container transition-all duration-500 group-hover:scale-110">
                            {React.cloneElement(iconMap[course.iconName] || <BookOpen />, {
                                className: 'w-5 h-5',
                                style: { color: '#C9A84C' }
                            } as any)}
                        </div>
                        <span className="eyebrow">
                            Level {index + 1}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5', letterSpacing: '-0.01em' }} className="mb-3">{course.title}</h2>
                    <p style={{ fontSize: '1rem', color: '#A8B8B0', lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif" }} className="mb-8 max-w-lg">{course.subtitle}</p>

                    {/* Features grid */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                        {course.features.map((feature, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                                className="flex items-start gap-3 group/feature"
                            >
                                <CheckCircle2 className="w-4.5 h-4.5 shrink-0 mt-0.5 transition-transform duration-300 group-hover/feature:scale-110" style={{ color: '#C9A84C' }} />
                                <span style={{ color: '#EEE8D5', fontSize: '0.875rem', fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>{feature}</span>
                            </motion.li>
                        ))}
                    </ul>

                    {/* CTA button */}
                    <div>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2.5 rounded-full transition-all duration-500 btn-glow group/btn"
                            style={{ padding: '0.7rem 1.8rem', background: '#C9A84C', color: '#060A09', fontWeight: 600, fontSize: '0.875rem', fontFamily: "'DM Sans', sans-serif" }}
                        >
                            Start This Course
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* ── Visual Side ── */}
                <div className={`w-full lg:w-2/5 min-h-[240px] lg:min-h-[400px] flex items-center justify-center relative overflow-hidden bg-gradient-to-br ${gradient.bg}`}>
                    {/* Ambient glow */}
                    <div className="absolute inset-0">
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] ${gradient.glow} rounded-full blur-[80px]`} />
                    </div>

                    {/* Geometric decorations */}
                    <div className="absolute top-6 right-6 w-20 h-20 border border-primary/5 rounded-2xl rotate-12 transition-transform duration-700 group-hover:rotate-[24deg]" />
                    <div className="absolute bottom-8 left-8 w-16 h-16 border border-primary/5 rounded-xl -rotate-6 transition-transform duration-700 group-hover:rotate-6" />

                    {/* Main icon */}
                    <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                        className="relative z-10"
                    >
                        {React.cloneElement(iconMap[course.iconName] || <BookOpen />, {
                            className: 'w-28 h-28 md:w-36 md:h-36 opacity-60 group-hover:opacity-80 transition-opacity duration-500',
                            style: { color: '#C9A84C' }
                        } as any)}
                    </motion.div>

                    {/* Inner shimmer */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.02) 50%, transparent 70%)",
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
    const [activeTab, setActiveTab] = useState<"all" | "beginner" | "advanced">("all");

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
        <div className="flex flex-col items-center relative overflow-hidden" style={{ background: '#060A09' }}>

            {/* ── Ambient background glows ── */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <motion.div
                    className="absolute top-[5%] left-[5%] w-[500px] h-[500px] rounded-full blur-[140px]"
                    style={{ background: 'rgba(201,168,76,0.05)' }}
                    animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-[40%] right-[5%] w-[400px] h-[400px] rounded-full blur-[120px]"
                    style={{ background: 'rgba(13,79,60,0.1)' }}
                    animate={{ x: [0, -40, 0], y: [0, -50, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* ═══════ HERO HEADER ═══════ */}
            <section className="w-full pt-24 pb-20 text-center relative z-10" style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem) clamp(3rem, 6vw, 5rem)' }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] blur-[150px] rounded-full pointer-events-none" style={{ background: 'rgba(13,79,60,0.1)' }} />

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="mx-auto max-w-[1280px] relative z-10"
                >
                    <motion.div variants={fadeUp} className="badge-gold inline-flex items-center gap-2 backdrop-blur-md mb-8" style={{ padding: '0.4rem 1rem' }}>
                        <Sparkles className="h-3.5 w-3.5" style={{ color: '#C9A84C' }} />
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase' as const, fontWeight: 500 }}>Structured Learning Paths</span>
                    </motion.div>

                    <motion.h1 variants={fadeUp} className="text-balance mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
                        Our Comprehensive
                        <span className="block text-glow" style={{ color: '#C9A84C' }}>Curriculums</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} className="max-w-2xl mx-auto" style={{ fontSize: '1.125rem', color: '#A8B8B0', lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif" }}>
                        Tailored learning tracks designed for absolute beginners to advanced reciters. Find your level and start improving today.
                    </motion.p>

                    {/* Quick stats */}
                    <motion.div variants={fadeUp} className="flex items-center justify-center gap-8 mt-10" style={{ fontSize: '0.875rem', color: '#A8B8B0' }}>
                        {[
                            { icon: BookOpen, label: "4 Levels" },
                            { icon: Users, label: "1-on-1 & Group" },
                            { icon: Star, label: "5★ Rated" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <item.icon className="w-4 h-4" style={{ color: '#C9A84C' }} />
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Decorative divider */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.15), transparent)' }} />
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
            <section className="w-full relative z-10 overflow-hidden" style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem)', background: '#0D4F3C' }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={stagger}
                    className="mx-auto max-w-[1280px] relative z-10"
                >
                    <motion.div variants={fadeUp} className="text-center mb-16 space-y-4">
                        <p className="eyebrow">Flexibility</p>
                        <h2 className="heading-divider" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5', letterSpacing: '-0.01em' }}>Class Options</h2>
                        <p className="mt-6" style={{ fontSize: '1.125rem', color: '#A8B8B0', fontFamily: "'DM Sans', sans-serif" }}>Choose the learning format that works best for you.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: Users,
                                title: "One-to-One Classes",
                                desc: "Personalized attention. Flexible timing. Faster progress.",
                                features: ["Dedicated teacher focus", "Pick your preferred schedule", "Customized pace"],
                                gradient: "from-primary/8 to-transparent",
                                iconBg: "bg-primary/10",
                                iconColor: "text-primary",
                            },
                            {
                                icon: Users,
                                title: "Group Classes",
                                desc: "Interactive learning. Affordable option. Healthy motivation.",
                                features: ["Peer learning & competition", "Structured curriculum", "Community support"],
                                gradient: "from-accent/8 to-transparent",
                                iconBg: "bg-accent/10",
                                iconColor: "text-accent",
                            },
                        ].map((option, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                whileHover={{ y: -8 }}
                                className="group relative p-10 md:p-12 transition-all duration-500 overflow-hidden card-accent-top"
                                style={{ borderRadius: '20px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)' }}
                            >
                                <div className="relative z-10">
                                    <div className="icon-container mb-6 transition-transform duration-500 group-hover:scale-110" style={{ width: '64px', height: '64px', borderRadius: '16px' }}>
                                        <option.icon className="w-8 h-8" style={{ color: '#C9A84C' }} />
                                    </div>

                                    <h3 style={{ fontSize: '1.5rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5' }} className="mb-3">{option.title}</h3>
                                    <p style={{ color: '#A8B8B0', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.75 }} className="mb-6">{option.desc}</p>

                                    <ul className="space-y-3">
                                        {option.features.map((feature, j) => (
                                            <li key={j} className="flex items-center gap-3" style={{ fontSize: '0.875rem', fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
                                                <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#C9A84C' }} />
                                                <span style={{ color: '#EEE8D5' }}>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ═══════ FINAL CTA ═══════ */}
            <section className="w-full text-center relative z-10" style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem)' }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] blur-[150px] rounded-full pointer-events-none" style={{ background: 'rgba(201,168,76,0.06)' }} />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl mx-auto relative z-10"
                >
                    <div className="relative overflow-hidden" style={{ padding: 'clamp(3rem, 6vw, 5rem)', borderRadius: '24px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(201,168,76,0.25)' }}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px]" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)' }} />

                        <GraduationCap className="w-10 h-10 mx-auto mb-6" style={{ color: 'rgba(201,168,76,0.3)' }} />
                        <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5' }} className="mb-4">Not sure which course is right?</h3>
                        <p className="mb-8 max-w-lg mx-auto" style={{ fontSize: '1.125rem', color: '#A8B8B0', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.75 }}>
                            Take our quick 3-minute quiz to find out exactly where you should start your Quran learning journey.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/quiz"
                                className="inline-flex items-center gap-2.5 rounded-full btn-glow transition-all duration-500 hover:scale-105"
                                style={{ padding: '0.8rem 2rem', background: '#C9A84C', color: '#060A09', fontWeight: 600, fontSize: '0.95rem', fontFamily: "'DM Sans', sans-serif" }}
                            >
                                <Sparkles className="w-5 h-5" />
                                Take the Level Quiz
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-full transition-all duration-500"
                                style={{ padding: '0.8rem 2rem', border: '1px solid rgba(201,168,76,0.25)', color: '#C9A84C', fontWeight: 600, fontSize: '0.95rem', fontFamily: "'DM Sans', sans-serif" }}
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
