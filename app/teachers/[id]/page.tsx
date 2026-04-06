"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, PlayCircle, BookOpen, GraduationCap, Globe, Clock, ChevronRight, Users } from "lucide-react";
import Link from "next/link";
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
                <div className="text-center space-y-4">
                    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
                    <p style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}>Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!teacher || !teacher.isActive) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background space-y-4">
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Teacher Not Found</h1>
                <p className="text-center max-w-md" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}>The instructor profile you are looking for does not exist or is currently unavailable.</p>
                <Link href="/" className="px-8 py-3 bg-primary text-primary-foreground rounded-full hover:scale-105 transition-all font-bold">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Mini Header */}
            <div className="w-full backdrop-blur-md sticky top-0 z-20" style={{ background: 'var(--color-bg-glass)', borderBottom: '1px solid var(--border)' }}>
                <div className="container mx-auto px-4 py-4 flex items-center">
                    <Link href="/" className="inline-flex items-center text-sm font-medium transition-colors group" style={{ color: 'var(--muted-foreground)' }}>
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl px-4 pt-12 md:pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Image & Quick Stats */}
                    <div className="lg:col-span-4 space-y-8">
                        <div
                            className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl"
                            style={{ background: 'var(--card)', border: '1px solid var(--color-border-subtle)' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                            {teacher.imagePath ? (
                                <img src={teacher.imagePath} alt={teacher.name} className="w-full h-full object-cover relative z-0" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center" style={{ background: 'var(--color-gold-glow)' }}>
                                    <Users className="w-24 h-24" style={{ color: 'var(--primary)' }} />
                                </div>
                            )}

                            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
                                <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-heading)" }}>{teacher.name}</h1>
                                <p className="font-medium" style={{ color: 'var(--primary)', fontFamily: "var(--font-body)" }}>{teacher.role}</p>
                            </div>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {teacher.experience && (
                                <div className="p-5 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm" style={{ background: 'var(--card)', border: '1px solid var(--color-border-subtle)' }}>
                                    <Clock className="w-6 h-6 mb-3" style={{ color: 'var(--primary)' }} />
                                    <span className="text-xl font-bold tracking-tight">{teacher.experience.split('–')[0]}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] mt-1" style={{ color: 'var(--muted-foreground)' }}>Experience</span>
                                </div>
                            )}
                            {teacher.languages && teacher.languages.length > 0 && (
                                <div className="p-5 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm" style={{ background: 'var(--card)', border: '1px solid var(--color-border-subtle)' }}>
                                    <Globe className="w-6 h-6 mb-3" style={{ color: 'var(--primary)' }} />
                                    <span className="text-sm font-bold leading-tight">{teacher.languages.join(", ")}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] mt-1" style={{ color: 'var(--muted-foreground)' }}>Languages</span>
                                </div>
                            )}
                        </div>

                        {/* Trial CTA */}
                        <div>
                            <Link href="/contact" className="w-full py-5 bg-primary text-primary-foreground font-bold rounded-[1.5rem] flex items-center justify-center gap-2 hover:scale-[1.03] transition-all shadow-xl shadow-primary/20" style={{ fontFamily: "var(--font-body)" }}>
                                Book Free Trial <ChevronRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Bio & Video */}
                    <div className="lg:col-span-8 space-y-16">

                        {/* Quote */}
                        {teacher.featuredQuote && (
                            <div className="pl-6 border-l-4 border-primary py-2">
                                <p className="text-2xl md:text-3xl italic leading-snug text-balance" style={{ fontFamily: "var(--font-heading)", color: 'var(--muted-foreground)' }}>
                                    &ldquo;{teacher.featuredQuote}&rdquo;
                                </p>
                            </div>
                        )}

                        {/* Bio */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3 pb-6" style={{ fontFamily: "var(--font-heading)", borderBottom: '1px solid var(--border)' }}>
                                <BookOpen className="w-6 h-6" style={{ color: 'var(--primary)' }} /> About The Instructor
                            </h2>
                            <div className="max-w-none" style={{ fontFamily: "var(--font-body)", fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--muted-foreground)' }}>
                                {teacher.bio.split('\n').map((paragraph, idx) => (
                                    <p key={idx} className="mb-4">{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        {/* Qualifications */}
                        {teacher.qualifications && teacher.qualifications.length > 0 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold flex items-center gap-3 pb-6" style={{ fontFamily: "var(--font-heading)", borderBottom: '1px solid var(--border)' }}>
                                    <GraduationCap className="w-6 h-6" style={{ color: 'var(--primary)' }} /> Qualifications
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {teacher.qualifications.map((qual, idx) => (
                                        <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl" style={{ background: 'var(--secondary)', border: '1px solid var(--color-border-subtle)' }}>
                                            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: 'var(--primary)' }} />
                                            <span className="font-medium text-sm" style={{ fontFamily: "var(--font-body)", color: 'var(--foreground)' }}>{qual}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Video Intro */}
                        {teacher.videoPath && (
                            <div className="space-y-6 pt-8">
                                <h2 className="text-2xl font-bold flex items-center gap-3 pb-6" style={{ fontFamily: "var(--font-heading)", borderBottom: '1px solid var(--border)' }}>
                                    <PlayCircle className="w-6 h-6" style={{ color: 'var(--primary)' }} /> Watch Introduction
                                </h2>
                                <div className="rounded-[2.5rem] overflow-hidden bg-black shadow-2xl border border-primary/10 aspect-video relative group">
                                    {teacher.videoPath.includes("youtube.com") || teacher.videoPath.includes("youtu.be") ? (
                                        <iframe
                                            src={teacher.videoPath.replace("watch?v=", "embed/").replace("youtu.be/", "www.youtube.com/embed/")}
                                            className="w-full h-full"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <video src={teacher.videoPath} className="w-full h-full object-cover outline-none" controls />
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
