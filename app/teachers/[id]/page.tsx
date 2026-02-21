"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, PlayCircle, BookOpen, GraduationCap, Globe, Clock, ChevronRight, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Teacher } from "@/lib/db";

export default function TeacherProfile() {
    const { id } = useParams();
    const [teacher, setTeacher] = useState<Teacher | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/teachers")
            .then((res) => res.json())
            .then((data: Teacher[]) => {
                const found = data.find((t) => t.id === id);
                if (found) setTeacher(found);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-24 h-24 bg-muted rounded-full mb-4"></div>
                    <div className="h-6 w-48 bg-muted rounded-md mb-2"></div>
                    <div className="h-4 w-32 bg-muted rounded-md"></div>
                </div>
            </div>
        );
    }

    if (!teacher || !teacher.isActive) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background space-y-4">
                <h1 className="text-2xl font-bold">Teacher Not Found</h1>
                <p className="text-muted-foreground text-center max-w-md">The instructor profile you are looking for does not exist or is currently unavailable.</p>
                <Link href="/" className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Mini Header */}
            <div className="w-full bg-card border-b border-border sticky top-0 z-20">
                <div className="container mx-auto px-4 py-4 flex items-center">
                    <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl px-4 pt-12 md:pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Image & Quick Stats */}
                    <div className="lg:col-span-4 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                            className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-muted/30 border border-border flex items-center justify-center shadow-lg"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                            {teacher.imagePath ? (
                                <img src={teacher.imagePath} alt={teacher.name} className="w-full h-full object-cover relative z-0" />
                            ) : (
                                <Users className="w-24 h-24 text-primary relative z-0" />
                            )}

                            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                                <h1 className="text-3xl font-bold font-serif mb-1">{teacher.name}</h1>
                                <p className="text-white/80 font-medium">{teacher.role}</p>
                            </div>
                        </motion.div>

                        {/* Quick Stats Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {teacher.experience && (
                                <div className="bg-card border border-border p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                                    <Clock className="w-6 h-6 text-primary mb-2" />
                                    <span className="text-2xl font-bold tracking-tight">{teacher.experience}</span>
                                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">Experience</span>
                                </div>
                            )}
                            {teacher.languages && teacher.languages.length > 0 && (
                                <div className="bg-card border border-border p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                                    <Globe className="w-6 h-6 text-secondary-foreground mb-2" />
                                    <span className="text-sm font-bold leading-tight">{teacher.languages.join(", ")}</span>
                                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">Languages</span>
                                </div>
                            )}
                        </motion.div>

                        {/* Trial CTA */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                            <Link href="/contact" className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-xl shadow-primary/20">
                                Book a Trial with {teacher.name.split(" ")[0]} <ChevronRight className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Column: Bio & Video */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* Quote Sequence */}
                        {teacher.featuredQuote && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                                className="pl-6 border-l-4 border-primary py-2"
                            >
                                <p className="text-2xl md:text-3xl font-serif italic text-muted-foreground leading-snug text-balance">
                                    "{teacher.featuredQuote}"
                                </p>
                            </motion.div>
                        )}

                        {/* Bio */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="space-y-4">
                            <h2 className="text-2xl font-bold flex items-center gap-3 border-b border-border pb-4">
                                <BookOpen className="w-6 h-6 text-primary" /> About The Instructor
                            </h2>
                            <div className="prose prose-neutral dark:prose-invert max-w-none prose-p:leading-relaxed prose-lg text-muted-foreground">
                                {teacher.bio.split('\n').map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                        </motion.div>

                        {/* Qualifications Matrix */}
                        {teacher.qualifications && teacher.qualifications.length > 0 && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="space-y-4">
                                <h2 className="text-2xl font-bold flex items-center gap-3 border-b border-border pb-4">
                                    <GraduationCap className="w-6 h-6 text-secondary-foreground" /> Qualifications
                                </h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {teacher.qualifications.map((qual, idx) => (
                                        <li key={idx} className="flex items-start gap-3 bg-secondary/30 border border-border p-4 rounded-xl">
                                            <div className="w-2 h-2 rounded-full bg-secondary-foreground mt-2 shrink-0" />
                                            <span className="font-medium text-foreground">{qual}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}

                        {/* Video Intro */}
                        {teacher.videoPath && (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="space-y-4 pt-8">
                                <h2 className="text-2xl font-bold flex items-center gap-3 border-b border-border pb-4">
                                    <PlayCircle className="w-6 h-6 text-accent" /> Watch Introduction
                                </h2>
                                <div className="rounded-3xl overflow-hidden bg-black shadow-2xl border border-border aspect-video">
                                    {teacher.videoPath.includes("youtube.com") || teacher.videoPath.includes("youtu.be") ? (
                                        <iframe
                                            src={teacher.videoPath.replace("watch?v=", "embed/").replace("youtu.be/", "www.youtube.com/embed/")}
                                            className="w-full h-full"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <video src={teacher.videoPath} className="w-full h-full object-cover outline-none" controls poster={teacher.imagePath} />
                                    )}
                                </div>
                            </motion.div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
