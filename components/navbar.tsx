"use client";

import Link from "next/link";
import { Menu, X, BookOpen, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./theme-toggle";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Track scroll to add blur/bg on scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // check initial state
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Courses", href: "/courses" },
        { name: "Quiz", href: "/quiz" },
        { name: "Blog", href: "/blog" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full">
            {/* Navbar with dynamic blur on scroll */}
            <motion.div
                className="transition-all duration-500"
                animate={{
                    backdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
                }}
                style={{
                    background: scrolled
                        ? "rgba(6, 10, 9, 0.6)"
                        : "transparent",
                    borderBottom: scrolled
                        ? "1px solid rgba(255, 255, 255, 0.07)"
                        : "1px solid transparent",
                    boxShadow: scrolled
                        ? "0 4px 30px rgba(0, 0, 0, 0.3)"
                        : "none",
                    WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
                    transition: "background 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease",
                }}
            >
                <div className={`container mx-auto max-w-[1280px] px-6 md:px-10 flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-14' : 'h-[70px]'}`}>
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="relative">
                            <BookOpen className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" style={{ color: '#C9A84C' }} />
                            <div className="absolute inset-0 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'rgba(201,168,76,0.2)' }} />
                        </div>
                        <span className="text-xl tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: '#C9A84C', backgroundImage: 'linear-gradient(110deg, #C9A84C 40%, #EEE8D5 50%, #C9A84C 60%)', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'logoShimmer 4s linear infinite' }}>
                            Noor ul Quran
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full"
                                style={{ color: '#A8B8B0', fontFamily: "'DM Sans', sans-serif" }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A84C')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = '#A8B8B0')}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="w-[1px] h-6 mx-2" style={{ background: 'rgba(255,255,255,0.07)' }} />

                        <ThemeToggle />

                        <Link
                            href="/contact"
                            className="ml-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2"
                            style={{ border: '1px solid rgba(201,168,76,0.25)', color: '#C9A84C', fontFamily: "'DM Sans', sans-serif" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = '#060A09'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A84C'; }}
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            Free Trial
                        </Link>
                    </nav>

                    {/* Mobile Toggle */}
                    <div className="flex md:hidden items-center gap-3">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 -mr-2 transition-colors"
                            style={{ color: '#A8B8B0' }}
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Mobile Nav Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="md:hidden fixed inset-0 top-14 z-50"
                        style={{
                            background: "rgba(6, 10, 9, 0.97)",
                            backdropFilter: "blur(24px)",
                        }}
                    >
                        <div className="p-6 flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-lg font-medium px-4 py-4 rounded-2xl transition-all duration-300"
                                    style={{ color: '#A8B8B0', fontFamily: "'DM Sans', sans-serif" }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/contact"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center px-4 py-4 rounded-2xl font-semibold mt-4 btn-glow"
                                style={{ background: '#C9A84C', color: '#060A09', fontFamily: "'DM Sans', sans-serif" }}
                            >
                                Book Free Trial
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
