"use client";

import { BookOpen, Star, Shield, Users } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen" style={{ background: '#060A09' }}>
            {/* Hero Section */}
            <section style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem)' }}>
                <div className="mx-auto max-w-[1280px] text-center space-y-6">
                    <div className="badge-gold inline-flex items-center gap-2 mx-auto">
                        Who We Are
                    </div>
                    <h1 className="text-balance mx-auto max-w-4xl" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
                        Illuminating Hearts with the <span className="italic text-glow" style={{ color: '#C9A84C' }}>Light of the Quran</span>
                    </h1>
                    <p className="mx-auto max-w-2xl" style={{ fontSize: '1.25rem', color: '#A8B8B0', lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif" }}>
                        Noor ul Quran is dedicated to providing high-quality, accessible, and comprehensive Quranic education to students of all ages worldwide.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section style={{ padding: '4rem clamp(1.5rem, 5vw, 5rem)' }}>
                <div className="mx-auto max-w-[1280px]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        <div className="space-y-8">
                            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5', lineHeight: 1.15 }}>
                                Our Mission
                            </h2>
                            <p style={{ fontSize: '1.125rem', color: '#A8B8B0', lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif" }}>
                                To empower individuals with the knowledge and deep understanding of the Holy Quran, fostering a global community rooted in Islamic values, proper Tajweed, and spiritual growth. We believe that learning the Quran should be a transformative journey, not just a routine.
                            </p>
                            <p style={{ fontSize: '1.125rem', color: '#A8B8B0', lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif" }}>
                                With highly qualified instructors and a structured curriculum, we ensure that every student receives personalized attention to excel in their recitation and comprehension.
                            </p>
                        </div>
                        <div className="glass p-8 md:p-12" style={{ borderRadius: '24px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)' }}>
                            <div className="aspect-square rounded-2xl flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.1)' }}>
                                <BookOpen className="w-32 h-32" style={{ color: '#C9A84C', opacity: 0.8 }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section style={{ padding: '8rem clamp(1.5rem, 5vw, 5rem)', background: '#0D1612' }}>
                <div className="mx-auto max-w-[1280px] space-y-16">
                    <div className="text-center space-y-4">
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5' }}>
                            Why Choose <span className="italic" style={{ color: '#C9A84C' }}>Us?</span>
                        </h2>
                        <p className="mx-auto max-w-2xl" style={{ color: '#A8B8B0', fontFamily: "'DM Sans', sans-serif", fontSize: '1.125rem' }}>
                            We combine traditional teaching methods with modern technology to deliver an exceptional learning experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl space-y-4 transition-transform hover:-translate-y-2" style={{ background: '#060A09', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(201,168,76,0.15)' }}>
                                <Star className="w-6 h-6" style={{ color: '#C9A84C' }} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontFamily: "'Cormorant Garamond', serif", color: '#EEE8D5', fontWeight: 500 }}>Expert Tutors</h3>
                            <p style={{ color: '#A8B8B0', fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', lineHeight: 1.6 }}>
                                Learn from certified teachers who possess deep mastery of Tajweed and Islamic sciences.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl space-y-4 transition-transform hover:-translate-y-2" style={{ background: '#060A09', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(201,168,76,0.15)' }}>
                                <Shield className="w-6 h-6" style={{ color: '#C9A84C' }} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontFamily: "'Cormorant Garamond', serif", color: '#EEE8D5', fontWeight: 500 }}>Structured Quality</h3>
                            <p style={{ color: '#A8B8B0', fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', lineHeight: 1.6 }}>
                                A well-organized curriculum tailored to student needs, ensuring consistent progress tracking.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl space-y-4 transition-transform hover:-translate-y-2" style={{ background: '#060A09', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(201,168,76,0.15)' }}>
                                <Users className="w-6 h-6" style={{ color: '#C9A84C' }} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontFamily: "'Cormorant Garamond', serif", color: '#EEE8D5', fontWeight: 500 }}>Global Community</h3>
                            <p style={{ color: '#A8B8B0', fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', lineHeight: 1.6 }}>
                                Join hundreds of students worldwide in our shared goal of preserving and internalizing the Quran.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
