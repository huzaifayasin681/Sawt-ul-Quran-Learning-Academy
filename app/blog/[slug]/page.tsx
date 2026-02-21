"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { Blog } from "@/lib/db";

// VERY basic markdown to HTML converter for client-side rendering
const parseMarkdown = (md: string) => {
    let html = md;
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 className="text-2xl font-bold mt-8 mb-4">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 className="text-3xl font-bold mt-10 mb-6">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 className="text-4xl font-bold mt-12 mb-6">$1</h1>');
    // Bold
    html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
    // Lists
    html = html.replace(/^\s*\n\*/gm, '<ul>\n*');
    html = html.replace(/^(\*.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2');
    html = html.replace(/^\*(.+)/gm, '<li className="ml-6 list-disc mb-2">$1</li>');
    // Paragraphs
    html = html.replace(/^\s*(\n)?(.+)/gm, function (m) {
        return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p className="text-lg text-muted-foreground leading-relaxed mb-6">' + m + '</p>';
    });
    return html;
};

export default function BlogPostPage() {
    const { slug } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/blogs")
            .then((res) => res.json())
            .then((data: Blog[]) => {
                const found = data.find(b => b.slug === slug);
                if (found) setBlog(found);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return <div className="min-h-screen pt-32 pb-20 flex justify-center items-center text-muted-foreground">Loading article...</div>;
    }

    if (!blog) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex flex-col justify-center items-center text-center px-4">
                <h1 className="text-4xl font-bold mb-4">Post not found</h1>
                <p className="text-muted-foreground mb-8">The article you are looking for does not exist or has been removed.</p>
                <Link href="/blog" className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition">
                    Return to Blog
                </Link>
            </div>
        );
    }

    return (
        <article className="min-h-screen pt-24 md:pt-32 pb-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
            >
                <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 text-sm font-medium">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            {blog.tag}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-4 h-4" /> {new Date(blog.date).toLocaleDateString()}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {blog.readTime}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-balance">
                        {blog.title}
                    </h1>

                    <p className="text-xl text-muted-foreground italic border-l-4 border-primary pl-4 py-2">
                        {blog.excerpt}
                    </p>
                </header>

                {/* Divider */}
                <div className="h-px bg-border w-full my-8" />

                {/* Content */}
                <div
                    className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(blog.content) }}
                />

                {/* Footer Actions */}
                <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <span className="font-semibold text-sm text-muted-foreground">Share this article:</span>
                        <button className="p-3 bg-card border border-border rounded-full hover:bg-muted hover:text-primary transition-colors group">
                            <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>

                    <Link href="/contact" className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-transform hover:scale-105 shadow-md">
                        Start Learning Quran Today
                    </Link>
                </div>
            </motion.div>
        </article>
    );
}
