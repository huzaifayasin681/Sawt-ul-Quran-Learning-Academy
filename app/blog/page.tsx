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
        <div className="flex flex-col items-center">
            <section className="w-full py-20 px-4 text-center bg-muted/30 border-b border-border">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 mt-8">
                        Learn Quran Online <br />
                        <span className="text-primary italic font-serif">Simple Guides for Everyone</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Practical articles to help beginners, parents, and new Muslims understand Quran recitation in a simple way. No complicated terms.
                    </p>
                </motion.div>
            </section>

            <section className="w-full py-20 px-4">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="container mx-auto max-w-5xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[400px]">
                        {loading ? (
                            <div className="col-span-full flex justify-center items-center text-muted-foreground">Loading articles...</div>
                        ) : blogs.length === 0 ? (
                            <div className="col-span-full flex justify-center items-center text-muted-foreground">No articles published yet. Check back soon!</div>
                        ) : (
                            blogs.map((blog) => (
                                <motion.div key={blog.slug} variants={fadeUp} whileHover={{ y: -8 }}>
                                    <Link href={`/blog/${blog.slug}`} className="group flex flex-col h-full bg-card glass border border-border rounded-3xl overflow-hidden hover:border-primary/50 transition-colors shadow-sm hover:shadow-lg">
                                        <div className="h-48 bg-secondary/50 p-6 flex items-start">
                                            <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold text-primary-foreground">
                                                {blog.tag}
                                            </span>
                                        </div>
                                        <div className="p-6 flex flex-col flex-1">
                                            <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
                                                {blog.title}
                                            </h2>
                                            <p className="text-muted-foreground text-sm mb-6 flex-1">
                                                {blog.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border mt-auto">
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

            <section className="w-full py-24 px-4 bg-primary text-primary-foreground text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="container mx-auto max-w-3xl"
                >
                    <h2 className="text-3xl font-bold mb-6">Ready to Improve Your Recitation?</h2>
                    <p className="mb-8 text-primary-foreground/80 text-lg">Join structured online Quran classes with qualified teachers. Book your free trial session today and start learning with confidence.</p>
                    <Link href="/contact" className="px-8 py-4 bg-background text-foreground hover:bg-muted font-bold rounded-full transition-transform hover:scale-105 shadow-xl inline-block">
                        Book Free Trial Class
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
