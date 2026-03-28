"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

export function Footer() {
    return (
        <footer
            className="relative z-10"
            style={{ background: '#0D1612', borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
            {/* Subtle top glow line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px]" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)' }} />

            <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">

                    {/* Brand column */}
                    <div className="md:col-span-1 space-y-5">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="relative w-9 h-9 md:w-11 md:h-11 overflow-hidden transition-all duration-500">
                                <Image
                                    src="/logo.jpeg"
                                    alt="Sawt ul Quran Learning Academy"
                                    width={44}
                                    height={44}
                                    className="object-contain rounded-xl transition-transform duration-500 group-hover:scale-110"
                                    unoptimized
                                />
                            </div>
                            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', fontWeight: 400, color: '#C9A84C' }}>Sawt ul Quran Learning Academy</span>
                        </Link>
                        <p style={{ fontSize: '0.875rem', color: '#A8B8B0', lineHeight: 1.7 }}>
                            From Qaida to Quran, step-by-step with proper guidance. Online Quran classes built on tradition and excellence.
                        </p>
                        {/* Decorative dots */}
                        <div className="flex gap-1.5">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(201,168,76,0.35)' }} />
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-5 eyebrow" style={{ fontSize: '0.75rem' }}>Quick Links</h3>
                        <ul className="space-y-3.5" style={{ fontSize: '0.875rem' }}>
                            {[
                                { name: "Home", href: "/" },
                                { name: "Courses", href: "/courses" },
                                { name: "Assess Your Level", href: "/quiz" },
                                { name: "Blog", href: "/blog" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="flex items-center gap-2 transition-colors duration-300" style={{ color: '#A8B8B0' }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A84C')}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = '#A8B8B0')}
                                    >
                                        <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(201,168,76,0.3)' }} />{link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Courses */}
                    <div>
                        <h3 className="mb-5 eyebrow" style={{ fontSize: '0.75rem' }}>Our Courses</h3>
                        <ul className="space-y-3.5" style={{ fontSize: '0.875rem' }}>
                            {[
                                { name: "Qaida Basics", href: "/courses#qaida" },
                                { name: "Nazra Practice", href: "/courses#nazra" },
                                { name: "Tajweed Essentials", href: "/courses#tajweed" },
                                { name: "Tajweed + Nazra Focus", href: "/courses#advanced" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="flex items-center gap-2 transition-colors duration-300" style={{ color: '#A8B8B0' }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A84C')}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = '#A8B8B0')}
                                    >
                                        <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(201,168,76,0.3)' }} />{link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-5 eyebrow" style={{ fontSize: '0.75rem' }}>Contact</h3>
                        <ul className="space-y-3.5" style={{ fontSize: '0.875rem' }}>
                            <li>
                                <Link href="/contact" className="flex items-center gap-2 transition-colors duration-300" style={{ color: '#A8B8B0' }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A84C')}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = '#A8B8B0')}
                                >
                                    <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(201,168,76,0.3)' }} />Book a Trial
                                </Link>
                            </li>
                            <li className="flex items-center gap-2" style={{ color: '#A8B8B0' }}>
                                <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(201,168,76,0.3)' }} />
                                <span>info@noorulquran.academy</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                >
                    <p style={{ fontSize: '0.75rem', color: '#A8B8B0' }}>
                        © {new Date().getFullYear()} Sawt ul Quran Learning Academy by Ibrahim. All rights reserved.
                    </p>
                    <p className="flex items-center gap-1.5" style={{ fontSize: '0.75rem', color: '#A8B8B0' }}>
                        Made with <Heart className="w-3 h-3" style={{ color: '#C9A84C', fill: '#C9A84C' }} /> for the Ummah
                    </p>
                </div>
            </div>
        </footer>
    );
}
