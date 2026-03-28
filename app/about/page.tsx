"use client";

import { BookOpen, Star, Shield, Users, Award, CheckCircle, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Teacher } from "@/lib/db";

/* ═══════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════ */

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
};

const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

/* ═══════════════════════════════════════════════════════
   NABAWAI SLIDESHOW COMPONENT
   ═══════════════════════════════════════════════════════ */

const NABAWAI_IMAGES = [
    {
        url: "/masjid/1.png",
        title: "Al-Masjid an-Nabawi",
        caption: "The second holiest site in Islam, a symbol of spiritual peace."
    },
    {
        url: "/masjid/2.png",
        title: "The Prophet's Mosque",
        caption: "A center of learning and guidance for centuries."
    },
    {
        url: "/masjid/3.png",
        title: "Peace in Madinah",
        caption: "Strengthen your connection with the tradition of the scholars."
    }
];

function NabawiSlideshow() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % NABAWAI_IMAGES.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full py-24 overflow-hidden bg-background">
            <div className="max-w-[1440px] mx-auto px-4 md:px-10">
                <div className="relative aspect-[18/9] rounded-[3.5rem] overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,0,0,0.3)] border border-primary/20 bg-card">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, scale: 1.15, x: 20 }}
                            animate={{ opacity: 1, scale: 1.05, x: 0 }}
                            exit={{ opacity: 0, scale: 1.0, x: -20 }}
                            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0"
                        >
                            <motion.div
                                className="absolute inset-0 w-full h-full"
                                animate={{
                                    scale: [1.05, 1.15],
                                    x: [0, -20]
                                }}
                                transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                            >
                                <Image
                                    src={NABAWAI_IMAGES[current].url}
                                    alt={NABAWAI_IMAGES[current].title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>

                            {/* Sophisticated Gradient Mask */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

                            {/* Decorative Corner Ornaments */}
                            <div className="absolute top-10 left-10 w-24 h-24 border-t border-l border-primary/30 rounded-tl-3xl pointer-events-none" />
                            <div className="absolute bottom-10 right-10 w-24 h-24 border-b border-r border-primary/30 rounded-br-3xl pointer-events-none" />

                            {/* Content */}
                            <div className="absolute bottom-12 left-12 md:bottom-20 md:left-20 max-w-xl z-10">
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6, duration: 1 }}
                                    className="badge-gold mb-6 border-primary/30 text-white"
                                    style={{ background: 'rgba(212, 175, 55, 0.15)' }}
                                >
                                    Experience Madinah
                                </motion.div>
                                <motion.h3
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, duration: 1 }}
                                    className="text-white text-3xl md:text-5xl lg:text-6xl font-serif mb-4 leading-tight glow-text"
                                    style={{ fontWeight: 300 }}
                                >
                                    {NABAWAI_IMAGES[current].title}
                                </motion.h3>
                                <motion.div
                                    initial={{ opacity: 0, scaleX: 0 }}
                                    animate={{ opacity: 1, scaleX: 1 }}
                                    transition={{ delay: 1, duration: 1 }}
                                    className="w-24 h-px bg-primary/60 mb-6 origin-left"
                                />
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.2, duration: 1 }}
                                    className="text-white/80 text-lg md:text-xl italic font-serif leading-relaxed max-w-lg"
                                >
                                    {NABAWAI_IMAGES[current].caption}
                                </motion.p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Progress dots at the BOTTOM for better reach */}
                    <div className="absolute bottom-12 right-12 flex items-center gap-4 z-20">
                        <div className="flex gap-2">
                            {NABAWAI_IMAGES.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`h-1.5 rounded-full transition-all duration-700 ${i === current ? 'w-12 bg-primary' : 'w-3 bg-white/20 hover:bg-white/40'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Navigation buttons */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-8 md:left-12 flex flex-col gap-4 z-20">
                        <button
                            onClick={() => setCurrent(prev => (prev - 1 + NABAWAI_IMAGES.length) % NABAWAI_IMAGES.length)}
                            className="p-4 rounded-full bg-black/20 hover:bg-primary/20 backdrop-blur-xl border border-white/10 text-white transition-all hover:scale-110 active:scale-95 group"
                        >
                            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => setCurrent(prev => (prev + 1) % NABAWAI_IMAGES.length)}
                            className="p-4 rounded-full bg-black/20 hover:bg-primary/20 backdrop-blur-xl border border-white/10 text-white transition-all hover:scale-110 active:scale-95 group"
                        >
                            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function AboutPage() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    useEffect(() => {
        fetch("/api/teachers")
            .then(res => res.json())
            .then((data: Teacher[]) => {
                setTeachers(data.filter(t => t.isActive));
            })
            .catch(console.error);
    }, []);

    return (
        <div className="min-h-screen bg-background" style={{ transition: 'background-color 0.5s ease' }}>
            {/* ════════ HERO SECTION ════════ */}
            <section className="relative overflow-hidden" style={{ padding: 'clamp(5rem, 12vw, 10rem) clamp(1.5rem, 5vw, 5rem)' }}>
                {/* Background Glows */}
                <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] blur-[120px] rounded-full pointer-events-none opacity-20" style={{ background: 'var(--color-gold-glow)' }} />
                <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] blur-[150px] rounded-full pointer-events-none opacity-10" style={{ background: 'var(--color-emerald)' }} />

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="relative z-10 mx-auto max-w-[1280px] text-center space-y-8"
                >
                    <motion.div variants={fadeUp} className="badge-gold inline-flex items-center gap-2 mx-auto">
                        Who We Are
                    </motion.div>
                    <motion.h1 variants={fadeUp} className="text-balance mx-auto max-w-4xl" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
                        Illuminating Hearts with the <span className="italic text-glow" style={{ color: 'var(--primary)' }}>Light of the Quran</span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="mx-auto max-w-2xl" style={{ fontSize: '1.25rem', color: 'var(--muted-foreground)', lineHeight: 1.75, fontFamily: "var(--font-body)" }}>
                        Sawt ul Quran Learning Academy is dedicated to providing high-quality, accessible, and comprehensive Quranic education to students of all ages worldwide.
                    </motion.p>
                </motion.div>
            </section>

            {/* Nabawi Slideshow */}
            <NabawiSlideshow />

            {/* ════════ INTRO VIDEO SECTION ════════ */}
            <section style={{ padding: '0 clamp(1.5rem, 5vw, 5rem) 6rem' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mx-auto max-w-4xl"
                >
                    <div className="group relative aspect-video rounded-3xl overflow-hidden glass border-primary/10" style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.1), 0 0 40px rgba(201,168,76,0.05)' }}>
                        {/* YouTube Embed Optimized for Performance & UX */}
                        <iframe
                            className="absolute inset-0 w-full h-full grayscale-[0.2] contrast-[1.1] transition-all duration-700 group-hover:grayscale-0"
                            src="https://www.youtube-nocookie.com/embed/hiwWe4CxZMI?autoplay=0&mute=1&rel=0&modestbranding=1&controls=1"
                            title="Sawt ul Quran Learning Academy Academy Intro"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                        ></iframe>

                        {/* Decorative inner border */}
                        <div className="absolute inset-0 border border-primary/5 pointer-events-none rounded-3xl" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 text-center"
                    >
                        <p className="eyebrow">Journey Inside Our Academy</p>
                    </motion.div>
                </motion.div>
            </section>

            {/* ════════ MISSION SECTION ════════ */}
            <section className="relative overflow-hidden" style={{ padding: '10rem clamp(1.5rem, 5vw, 5rem)', background: 'var(--secondary)' }}>
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_bottom_left,var(--color-gold-glow),transparent_70%)] opacity-30 pointer-events-none" />

                <div className="relative z-10 mx-auto max-w-[1280px]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        staggerChildren: 0.12,
                                        delayChildren: 0.1
                                    }
                                }
                            }}
                            className="space-y-10"
                        >
                            <div className="space-y-6">
                                <motion.div variants={fadeUp} className="badge-gold inline-flex items-center gap-2">
                                    Our Vision & Purpose
                                </motion.div>
                                <motion.h2
                                    variants={fadeUp}
                                    style={{
                                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                        fontFamily: "var(--font-heading)",
                                        fontWeight: 300,
                                        color: 'var(--foreground)',
                                        lineHeight: 1.1,
                                        letterSpacing: '-0.02em'
                                    }}
                                >
                                    Our <span className="text-primary italic">Mission</span>
                                </motion.h2>
                                <motion.div
                                    variants={fadeUp}
                                    className="w-20 h-1 bg-primary/30 rounded-full"
                                />
                            </div>

                            <div className="space-y-6">
                                <motion.p
                                    variants={fadeUp}
                                    style={{
                                        fontSize: '1.25rem',
                                        color: 'var(--foreground)',
                                        opacity: 0.9,
                                        lineHeight: 1.8,
                                        fontFamily: "var(--font-body)",
                                        maxWidth: '600px'
                                    }}
                                >
                                    To empower individuals with the knowledge and deep understanding of the Holy Quran, fostering a global community rooted in Islamic values, proper Tajweed, and spiritual growth.
                                </motion.p>
                                <motion.p
                                    variants={fadeUp}
                                    style={{
                                        fontSize: '1.125rem',
                                        color: 'var(--muted-foreground)',
                                        lineHeight: 1.75,
                                        fontFamily: "var(--font-body)",
                                        maxWidth: '540px'
                                    }}
                                >
                                    With highly qualified instructors and a structured curriculum, we ensure that every student receives personalized attention to excel in their recitation and comprehension. We believe that learning the Quran should be a transformative journey that illuminates the soul.
                                </motion.p>
                            </div>

                            <motion.div variants={fadeUp} className="pt-4">
                                <Link
                                    href="/courses"
                                    className="inline-flex items-center gap-2 text-primary font-semibold group hover:gap-3 transition-all"
                                >
                                    Discover our curriculum
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: 30 }}
                            whileInView={{ opacity: 1, scale: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="relative group lg:ml-auto"
                        >
                            {/* Decorative Frame */}
                            <div className="absolute -inset-8 border border-primary/10 rounded-[3rem] transition-all duration-1000 group-hover:border-primary/30 group-hover:scale-[1.02]" />
                            <div className="absolute -inset-4 border border-primary/20 rounded-[2.5rem] transition-all duration-700 delay-100 group-hover:rotate-1 group-hover:scale-[1.01]" />

                            <div className="relative glass p-4 rounded-[2rem] overflow-hidden shadow-2xl" style={{ background: 'var(--card)' }}>
                                <div className="relative aspect-square rounded-[1.5rem] flex items-center justify-center p-16 transition-transform duration-1000 group-hover:scale-105 shadow-inner" style={{ background: 'var(--card)', border: '1px solid var(--primary)', borderRadius: '1.5rem' }}>
                                    {/* Rotating geometric bg */}
                                    <div className="absolute inset-0 opacity-[0.03] animate-spin-slow" style={{ backgroundImage: 'url("/patterns/islamic-geometric.svg")', backgroundSize: 'cover' }} />

                                    <BookOpen className="w-full h-full max-w-[180px] relative z-10" style={{ color: 'var(--primary)', opacity: 0.9, filter: 'drop-shadow(0 0 20px rgba(90, 72, 19, 0.2))' }} />

                                    {/* Floating particles (simulated with CSS for performance) */}
                                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                        {[...Array(8)].map((_, i) => (
                                            <div key={i} className="absolute w-1.5 h-1.5 bg-primary/40 rounded-full animate-pulse"
                                                style={{
                                                    top: `${15 + Math.random() * 70}%`,
                                                    left: `${15 + Math.random() * 70}%`,
                                                    animationDelay: `${i * 0.4}s`,
                                                    animationDuration: `${2 + Math.random() * 2}s`
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Floating Stats or Label */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-6 -right-6 glass px-6 py-4 border-primary/20 shadow-xl"
                                style={{ borderRadius: '1.5rem', background: 'var(--card)' }}
                            >
                                <p className="text-secondary-foreground font-serif italic text-lg">Knowledge is Light</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ════════ FOUNDER SECTION ════════ */}
            <section style={{ padding: '10rem clamp(1.5rem, 5vw, 5rem)', position: 'relative', overflow: 'hidden' }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[150px] rounded-full pointer-events-none opacity-[0.08]" style={{ background: 'var(--primary)' }} />

                <div className="mx-auto max-w-[1280px]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="order-2 lg:order-1 space-y-10"
                        >
                            <div className="space-y-4">
                                <p className="eyebrow">Our Founder</p>
                                <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: 'var(--foreground)', fontWeight: 300 }}>Ustad Ibrahim</h2>
                                <div className="flex items-center gap-3 text-primary" style={{ fontFamily: "var(--font-heading)", fontSize: '1.5rem', fontStyle: 'italic' }}>
                                    <Award className="w-6 h-6" style={{ color: 'var(--primary)' }} />
                                    Ijazah Certified Teacher (Masjid Al-Nabawi)
                                </div>
                                <div className="w-20 h-px bg-primary/30" />
                            </div>

                            <div className="space-y-6" style={{ color: 'var(--muted-foreground)', fontSize: '1.125rem', lineHeight: 1.8, fontFamily: "var(--font-body)" }}>
                                <p>
                                    I am honored to hold an Ijazah directly connected to scholars of Masjid al-Nabawi in Madinah. This means my teaching is rooted in authentic tradition, precision, and responsibility.
                                </p>
                                <p>
                                    For the past 8 years, I have helped students across different countries strengthen both their recitation and their love for the Quran.
                                </p>

                                <motion.div
                                    whileInView={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    className="flex items-start gap-4 p-8 glass border-primary/20"
                                    style={{ background: 'var(--color-gold-glow)', borderRadius: '24px' }}
                                >
                                    <CheckCircle className="w-6 h-6 shrink-0 mt-1" style={{ color: 'var(--primary)' }} />
                                    <p className="text-foreground italic font-serif" style={{ fontSize: '1.1rem' }}>
                                        "Learning the Quran should never feel heavy or boring. My goal is to break complex Tajweed rules into easy, practical steps that build both skill and spiritual connection."
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="order-1 lg:order-2"
                        >
                            <div className="relative group mx-auto max-w-[420px]">
                                {/* Multi-layered decorative frame */}
                                <div className="absolute -inset-6 border border-primary/10 rounded-[2.5rem] transition-all duration-1000 group-hover:border-primary/30" />
                                <div className="absolute -inset-3 border border-primary/20 rounded-[2rem] transition-all duration-700 delay-100 group-hover:rotate-2 group-hover:scale-105" />

                                <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden glass flex items-center justify-center p-4" style={{ background: 'var(--card)' }}>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-50" />

                                    <div className="relative z-10 text-center p-10 space-y-8 w-full h-full flex flex-col items-center justify-center border border-white/5 rounded-[1.2rem]">
                                        <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:bg-primary/20 group-hover:shadow-[0_0_40px_rgba(201,168,76,0.2)]">
                                            <Award className="w-10 h-10 text-primary" />
                                        </div>

                                        <div className="space-y-3">
                                            <p className="text-[10px] tracking-[0.3em] uppercase text-primary/60 font-bold">Authenticated by scholars of</p>
                                            <h3 className="font-serif text-3xl text-primary glow-text" style={{ fontWeight: 300 }}>Masjid Al-Nabawi</h3>
                                            <div className="w-12 h-px bg-primary/40 mx-auto transition-all duration-700 group-hover:w-24" />
                                            <p className="text-primary/50 text-xs mt-2 italic">The Noble City of Madinah</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ════════ OTHER TEACHERS SECTION ════════ */}
            {teachers.length > 0 && (
                <section style={{ padding: '8rem clamp(1.5rem, 5vw, 5rem)', background: 'var(--secondary)' }}>
                    <div className="mx-auto max-w-[1280px]">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            className="text-center space-y-4 mb-16"
                        >
                            <p className="eyebrow">Our Experts</p>
                            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: 'var(--foreground)', fontWeight: 300 }}>Our Dedicated Teachers</h2>
                            <p className="max-w-2xl mx-auto text-muted-foreground">Learn from highly qualified instructors who share a passion for teaching the Book of Allah.</p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {teachers.map((teacher, i) => (
                                <motion.div
                                    key={teacher.id || i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group relative glass p-8 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-primary/30"
                                    style={{ background: 'var(--card)' }}
                                >
                                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden mb-6 border border-primary/10">
                                        <Image
                                            src={teacher.imagePath || "/placeholder.jpg"}
                                            alt={teacher.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-1">{teacher.name}</h3>
                                    <p className="text-primary text-sm font-medium mb-4">{teacher.role}</p>
                                    <p className="text-muted-foreground text-sm line-clamp-3 mb-6">{teacher.bio}</p>

                                    <div className="space-y-3">
                                        {teacher.qualifications && teacher.qualifications.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {teacher.qualifications.slice(0, 2).map((q, j) => (
                                                    <span key={j} className="badge-gold text-[10px]">{q}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Hover info */}
                                    <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-100 transition-opacity">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ════════ WHY CHOOSE US ════════ */}
            <section style={{ padding: '8rem clamp(1.5rem, 5vw, 5rem)', background: 'var(--background)', position: 'relative' }}>
                <div className="mx-auto max-w-[1280px] space-y-20">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="text-center space-y-6"
                    >
                        <p className="eyebrow">Excellence</p>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)' }}>
                            Why Choose <span className="italic" style={{ color: 'var(--primary)' }}>Us?</span>
                        </h2>
                        <p className="mx-auto max-w-2xl" style={{ color: 'var(--muted-foreground)', fontFamily: "var(--font-body)", fontSize: '1.125rem', lineHeight: 1.8 }}>
                            We combine traditional teaching methods with modern technology to deliver an exceptional learning experience that resonates with the soul.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-3 gap-10"
                    >
                        {[
                            { icon: Star, title: "Expert Tutors", desc: "Learn from certified teachers who possess deep mastery of Tajweed and Islamic sciences." },
                            { icon: Shield, title: "Structured Quality", desc: "A well-organized curriculum tailored to student needs, ensuring consistent progress tracking." },
                            { icon: Users, title: "Global Community", desc: "Join hundreds of students worldwide in our shared goal of preserving and internalizing the Quran." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                                }}
                                whileHover={{ y: -12 }}
                                className="group p-10 rounded-[2rem] space-y-6 transition-all duration-500 glass border-primary/10 hover:border-primary/30"
                                style={{ background: 'var(--card)' }}
                            >
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ background: 'var(--color-gold-glow)' }}>
                                    <item.icon className="w-8 h-8" style={{ color: 'var(--primary)' }} />
                                </div>
                                <h3 style={{ fontSize: '1.75rem', fontFamily: "var(--font-heading)", color: 'var(--foreground)', fontWeight: 400 }}>{item.title}</h3>
                                <p style={{ color: 'var(--muted-foreground)', fontFamily: "var(--font-body)", fontSize: '1rem', lineHeight: 1.7 }}>
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

