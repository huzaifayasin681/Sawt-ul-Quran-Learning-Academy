import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-card text-card-foreground">
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">

                    <div className="md:col-span-1 space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <BookOpen className="h-6 w-6 text-primary" />
                            <span className="font-serif text-lg font-bold">Noor ul Quran</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            From Qaida to Quran, step-by-step with proper guidance. Online Quran classes built on tradition and excellence.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/courses" className="hover:text-primary transition-colors">Courses</Link></li>
                            <li><Link href="/quiz" className="hover:text-primary transition-colors">Assess Your Level</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Our Courses</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/courses#qaida" className="hover:text-primary transition-colors">Qaida Basics</Link></li>
                            <li><Link href="/courses#nazra" className="hover:text-primary transition-colors">Nazra Practice</Link></li>
                            <li><Link href="/courses#tajweed" className="hover:text-primary transition-colors">Tajweed Essentials</Link></li>
                            <li><Link href="/courses#advanced" className="hover:text-primary transition-colors">Tajweed + Nazra Focus</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Contact</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Book a Trial</Link></li>
                            <li>Email: info@noorulquran.academy</li>
                        </ul>
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} Noor ul Quran by Ibrahim. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
