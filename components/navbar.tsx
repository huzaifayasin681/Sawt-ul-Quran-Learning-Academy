"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";

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
        <header className="fixed top-0 z-50 w-full transition-all duration-500">
            {/* Navbar with dynamic blur on scroll */}
            <motion.div
                className="w-full"
                animate={{
                    backdropFilter: "blur(16px)",
                    background: scrolled ? "var(--color-bg-glass)" : "rgba(0,0,0,0)",
                    borderBottom: scrolled ? "1px solid var(--color-border-subtle)" : "1px solid rgba(0,0,0,0)",
                    boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.05)" : "none",
                }}
                transition={{ duration: 0.5 }}
            >
                <div className={`container mx-auto max-w-[1280px] px-6 md:px-10 flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 md:w-11 md:h-11 transition-all duration-500">
                            <Image
                                src="/logo.jpeg"
                                alt="Sawt ul Quran Learning Academy"
                                width={44}
                                height={44}
                                className="object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                                priority
                                unoptimized
                            />
                            <div className="absolute -inset-1 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" style={{ background: 'var(--color-gold-glow)' }} />
                        </div>
                        <span className="text-lg md:text-xl tracking-tight hidden sm:block" style={{ fontFamily: "var(--font-heading)", fontWeight: 400, color: 'var(--color-gold)', backgroundImage: 'linear-gradient(110deg, var(--color-gold) 40%, var(--foreground) 50%, var(--color-gold) 60%)', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'logoShimmer 4s linear infinite' }}>
                            Sawt ul Quran Learning Academy
                        </span>
                        <span className="text-xl sm:hidden font-serif text-primary">SQLA</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full hover:text-primary text-muted-foreground"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="w-[1px] h-6 mx-2 bg-border opacity-50" />

                        <div className="flex items-center gap-2">
                            <ThemeToggle />
                            <Link
                                href="/contact"
                                className="px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 border border-primary/25 text-primary hover:bg-primary hover:text-primary-foreground btn-glow"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                <Sparkles className="w-3.5 h-3.5" />
                                Free Trial
                            </Link>
                        </div>
                    </nav>

                    {/* Mobile Toggle */}
                    <div className="flex md:hidden items-center gap-3">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 -mr-2 transition-colors text-muted-foreground"
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
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden w-full overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl"
                    >
                        <div className="p-6 flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-lg font-medium px-4 py-3 rounded-xl transition-all duration-300 hover:bg-muted text-muted-foreground hover:text-primary"
                                    style={{ fontFamily: "var(--font-body)" }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/contact"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center px-4 py-4 rounded-xl font-semibold mt-4 bg-primary text-primary-foreground btn-glow"
                                style={{ fontFamily: "var(--font-body)" }}
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
