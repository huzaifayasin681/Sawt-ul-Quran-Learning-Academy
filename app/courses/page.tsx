"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, CheckCircle2, ChevronRight, PlayCircle, GraduationCap, Award, Users } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Course } from "@/lib/db";

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const BlobBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
            className="absolute top-[5%] left-[5%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-primary/10 rounded-full blur-[100px] md:blur-[140px]"
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute top-[30%] right-[2%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-accent/10 rounded-full blur-[100px] md:blur-[120px]"
            animate={{ x: [0, -40, 0], y: [0, -50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-secondary/20 rounded-full blur-[90px] md:blur-[150px]"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
    </div>
);

// Icon Map
const iconMap: Record<string, React.ReactElement> = {
    "BookOpen": <BookOpen />,
    "PlayCircle": <PlayCircle />,
    "GraduationCap": <GraduationCap />,
    "Award": <Award />
};

export default function Courses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/courses")
            .then(res => res.json())
            .then(data => {
                // Only show active courses on the public page
                setCourses(data.filter((c: Course) => c.isActive));
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);
    return (
        <div className="flex flex-col items-center relative overflow-hidden">
            <BlobBackground />

            {/* Header */}
            <section className="w-full py-20 px-4 text-center border-b border-border/50 relative z-10 glass">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="container mx-auto"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 mt-8 text-balance">
                        Our Comprehensive Curriculums
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Tailored learning tracks designed for absolute beginners to advanced reciters. Find your level and start improving today.
                    </p>
                </motion.div>
            </section>

            {/* Courses Alternating Layout List */}
            <section className="w-full py-24 px-4 relative z-10">
                <div className="container mx-auto max-w-6xl space-y-24">
                    {loading ? (
                        <div className="text-center py-20 text-muted-foreground">Loading specific curriculums...</div>
                    ) : courses.length === 0 ? (
                        <div className="text-center py-20 text-muted-foreground">No active courses found currently.</div>
                    ) : (
                        courses.map((course, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={course.id}
                                    id={course.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                    whileHover={{ scale: 1.02 }}
                                    className={`glass flex flex-col md:flex-row ${!isEven ? 'md:flex-row-reverse' : ''} items-stretch rounded-[2.5rem] border ${course.color.split(' ')[1]} overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group bg-card`}
                                >
                                    <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
                                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h2>
                                        <p className="text-lg text-muted-foreground mb-8 font-medium">{course.subtitle}</p>

                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                            {course.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${course.iconColor}`} />
                                                    <span className="text-foreground/90 font-medium">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div>
                                            <Link
                                                href="/contact"
                                                className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-transform hover:scale-105 shadow-md ${course.color.split(' ')[0]} border ${course.color.split(' ')[1]} hover:brightness-95`}
                                            >
                                                Start This Course <ChevronRight className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className={`w-full md:w-2/5 min-h-[300px] flex items-center justify-center relative overflow-hidden ${course.color.split(' ')[0]}`}>
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                                        <motion.div
                                            animate={{ y: [0, -15, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
                                        >
                                            {React.cloneElement(iconMap[course.iconName] || <BookOpen />, { className: `w-32 h-32 md:w-48 md:h-48 opacity-80 ${course.iconColor}` } as any)}
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </section>

            {/* Class Options */}
            <section className="w-full bg-secondary/30 py-24 px-4 border-y border-border relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="container mx-auto max-w-5xl text-center"
                >
                    <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight mb-16">Class Options</motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <motion.div variants={fadeUp} whileHover={{ y: -10 }} className="glass p-10 md:p-12 rounded-[3rem] shadow-lg border border-border group transition-all">
                            <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <Users className="w-12 h-12 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">One-to-One Classes</h3>
                            <p className="text-muted-foreground mb-8 text-lg">Personalized attention. Flexible timing. Faster progress.</p>
                            <ul className="text-left space-y-4 max-w-xs mx-auto">
                                <li className="flex gap-3 text-lg font-medium"><CheckCircle2 className="w-6 h-6 text-primary shrink-0" /> Dedicated focus</li>
                                <li className="flex gap-3 text-lg font-medium"><CheckCircle2 className="w-6 h-6 text-primary shrink-0" /> Pick your preferred days</li>
                            </ul>
                        </motion.div>

                        <motion.div variants={fadeUp} whileHover={{ y: -10 }} className="glass p-10 md:p-12 rounded-[3rem] shadow-lg border border-border group transition-all">
                            <div className="w-24 h-24 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <Users className="w-12 h-12 text-accent-foreground" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Group Classes</h3>
                            <p className="text-muted-foreground mb-8 text-lg">Interactive learning. Affordable option. Healthy motivation.</p>
                            <ul className="text-left space-y-4 max-w-xs mx-auto">
                                <li className="flex gap-3 text-lg font-medium"><CheckCircle2 className="w-6 h-6 text-accent-foreground shrink-0" /> Peer learning</li>
                                <li className="flex gap-3 text-lg font-medium"><CheckCircle2 className="w-6 h-6 text-accent-foreground shrink-0" /> Structured curriculum</li>
                            </ul>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Final CTA */}
            <section className="w-full py-24 px-4 text-center relative z-10 glass">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto"
                >
                    <h3 className="text-3xl font-bold mb-6">Not sure which course is right for you?</h3>
                    <p className="text-muted-foreground text-lg mb-10">Take our quick 3-minute quiz to find out exactly where you should start your reading journey.</p>
                    <Link
                        href="/quiz"
                        className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 rounded-full font-bold text-lg hover:bg-primary/90 transition-transform hover:scale-105 shadow-xl shadow-primary/20"
                    >
                        Take the Level Quiz
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
