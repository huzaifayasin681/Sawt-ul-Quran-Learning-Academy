"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Blog } from "@/lib/db";

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

export default function BlogPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/blogs")
            .then((res) => res.json())
            .then((data) => setBlogs(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);
    return (
        <div className="flex flex-col items-center bg-background min-h-screen">
            <section className="w-full text-center relative z-10" style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem)', borderBottom: '1px solid var(--border)' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-balance mb-6 mt-8" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                        Learn Quran Online <br />
                        <span className="italic text-glow" style={{ color: 'var(--primary)' }}>Simple Guides for Everyone</span>
                    </h1>
                    <p className="max-w-2xl mx-auto" style={{ fontSize: '1.25rem', color: 'var(--muted-foreground)', lineHeight: 1.8, fontFamily: "var(--font-body)" }}>
                        Practical articles to help beginners, parents, and new Muslims understand Quran recitation in a simple way. No complicated terms.
                    </p>
                </motion.div>
            </section>

            <section className="w-full relative z-10" style={{ padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem)' }}>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="mx-auto max-w-[1280px]"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[400px]">
                        {loading ? (
                            <div className="col-span-full flex justify-center items-center text-muted-foreground">Loading articles...</div>
                        ) : blogs.length === 0 ? (
                            <div className="col-span-full flex justify-center items-center text-muted-foreground">No articles published yet. Check back soon!</div>
                        ) : (
                            blogs.map((blog) => (
                                <motion.div key={blog.slug} variants={fadeUp} whileHover={{ y: -8 }}>
                                    <Link href={`/blog/${blog.slug}`} className="group flex flex-col h-full overflow-hidden transition-all duration-500 glass border-border active:scale-[0.98]" style={{ borderRadius: '24px', background: 'var(--card)' }}>
                                        <div className="h-48 p-6 flex items-start relative overflow-hidden" style={{ background: 'var(--secondary)' }}>
                                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <span className="badge-gold relative z-10">
                                                {blog.tag}
                                            </span>
                                        </div>
                                        <div className="p-8 flex flex-col flex-1">
                                            <h2 style={{ fontSize: '1.4rem', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)' }} className="mb-4 leading-tight group-hover:text-primary transition-colors">
                                                {blog.title}
                                            </h2>
                                            <p style={{ fontSize: '1rem', color: 'var(--muted-foreground)', fontFamily: "var(--font-body)", lineHeight: 1.6 }} className="mb-6 flex-1">
                                                {blog.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between pt-5 mt-auto" style={{ borderTop: '1px solid var(--border)', fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
                                                <div className="flex items-center gap-4 font-medium uppercase tracking-wider">
                                                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(blog.date).toLocaleDateString()}</span>
                                                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {blog.readTime}</span>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.div>
            </section>

            <section className="w-full text-center relative z-10 overflow-hidden" style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem)' }}>
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--secondary)', opacity: 0.5 }} />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto max-w-[800px] relative z-10"
                >
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontFamily: "var(--font-heading)", fontWeight: 300, color: 'var(--foreground)' }} className="mb-6 text-balance text-glow">Ready to Improve Your Recitation?</h2>
                    <p className="mb-10" style={{ color: 'var(--muted-foreground)', fontSize: '1.25rem', fontFamily: "var(--font-body)", lineHeight: 1.8 }}>Join structured online Quran classes with qualified teachers. Book your free trial session today and start learning with confidence.</p>
                    <Link href="/contact" className="rounded-full btn-glow transition-all hover:scale-105 inline-block text-lg shadow-xl" style={{ padding: '1rem 3rem', background: 'var(--primary)', color: 'var(--primary-foreground)', fontWeight: 600, fontFamily: "var(--font-body)" }}>
                        Book Free Trial Class
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
