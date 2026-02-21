"use client";

import Link from "next/link";
import { Menu, X, BookOpen } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Courses", href: "/courses" },
        { name: "Quiz", href: "/quiz" },
        { name: "Blog", href: "/blog" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full glass">
            <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <BookOpen className="h-7 w-7 text-primary" />
                    <span className="font-serif text-xl font-bold tracking-tight">Noor ul Quran</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <ThemeToggle />
                    <Link
                        href="/contact"
                        className="bg-accent text-accent-foreground hover:bg-accent/90 px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                        Free Trial
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <div className="flex md:hidden items-center gap-4">
                    <ThemeToggle />
                    <button onClick={() => setIsOpen(!isOpen)} className="p-2 -mr-2 text-foreground/80">
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden glass border-t absolute top-16 left-0 w-full p-4 flex flex-col gap-4 shadow-lg">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="block text-base font-medium px-2 py-2 rounded-md hover:bg-muted"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        onClick={() => setIsOpen(false)}
                        className="block w-full text-center bg-accent text-accent-foreground hover:bg-accent/90 px-4 py-3 rounded-xl font-bold mt-2 shadow-md"
                    >
                        Book Free Trial
                    </Link>
                </div>
            )}
        </header>
    );
}
