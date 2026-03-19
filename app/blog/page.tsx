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
        <div className="flex flex-col items-center" style={{ background: '#060A09' }}>
            <section className="w-full text-center relative z-10" style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-balance mb-6 mt-8" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
                        Learn Quran Online <br />
                        <span className="italic text-glow" style={{ color: '#C9A84C' }}>Simple Guides for Everyone</span>
                    </h1>
                    <p className="max-w-2xl mx-auto" style={{ fontSize: '1.125rem', color: '#A8B8B0', lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif" }}>
                        Practical articles to help beginners, parents, and new Muslims understand Quran recitation in a simple way. No complicated terms.
                    </p>
                </motion.div>
            </section>

            <section className="w-full relative z-10" style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem)' }}>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="mx-auto max-w-[1280px]"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[400px]">
                        {loading ? (
                            <div className="col-span-full flex justify-center items-center" style={{ color: '#A8B8B0' }}>Loading articles...</div>
                        ) : blogs.length === 0 ? (
                            <div className="col-span-full flex justify-center items-center" style={{ color: '#A8B8B0' }}>No articles published yet. Check back soon!</div>
                        ) : (
                            blogs.map((blog) => (
                                <motion.div key={blog.slug} variants={fadeUp} whileHover={{ y: -8 }}>
                                    <Link href={`/blog/${blog.slug}`} className="group flex flex-col h-full overflow-hidden transition-all duration-500" style={{ borderRadius: '20px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)' }}>
                                        <div className="h-48 p-6 flex items-start" style={{ background: '#0D1612' }}>
                                            <span className="badge-gold">
                                                {blog.tag}
                                            </span>
                                        </div>
                                        <div className="p-6 flex flex-col flex-1">
                                            <h2 style={{ fontSize: '1.25rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 500, color: '#EEE8D5' }} className="mb-3 leading-snug">
                                                {blog.title}
                                            </h2>
                                            <p style={{ fontSize: '0.875rem', color: '#A8B8B0', fontFamily: "'DM Sans', sans-serif" }} className="mb-6 flex-1">
                                                {blog.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between pt-4 mt-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', fontSize: '0.75rem', color: '#A8B8B0' }}>
                                                <div className="flex items-center gap-4">
                                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(blog.date).toLocaleDateString()}</span>
                                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {blog.readTime}</span>
                                                </div>
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
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, #1A1200, #3D2800)' }} />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto max-w-[800px] relative z-10"
                >
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#EEE8D5' }} className="mb-6">Ready to Improve Your Recitation?</h2>
                    <p className="mb-8" style={{ color: '#A8B8B0', fontSize: '1.125rem', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.75 }}>Join structured online Quran classes with qualified teachers. Book your free trial session today and start learning with confidence.</p>
                    <Link href="/contact" className="rounded-full btn-glow transition-all hover:scale-105 inline-block" style={{ padding: '0.8rem 2rem', background: '#C9A84C', color: '#060A09', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
                        Book Free Trial Class
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
