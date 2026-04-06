"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Blog } from "@/lib/db";

const parseMarkdown = (md: string) => {
    let html = md;
    html = html.replace(/^### (.*$)/gim, '<h3 style="font-size:1.5rem;font-weight:700;margin:2rem 0 1rem">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 style="font-size:1.875rem;font-weight:700;margin:2.5rem 0 1.5rem">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 style="font-size:2.25rem;font-weight:700;margin:3rem 0 1.5rem">$1</h1>');
    html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/^\s*\n\*/gm, '<ul>\n*');
    html = html.replace(/^(\*.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2');
    html = html.replace(/^\*(.+)/gm, '<li style="margin-left:1.5rem;list-style:disc;margin-bottom:0.5rem">$1</li>');
    html = html.replace(/^\s*(\n)?(.+)/gm, function (m) {
        return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p style="font-size:1.125rem;line-height:1.8;margin-bottom:1.5rem;color:var(--muted-foreground)">' + m + '</p>';
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
        return (
            <div className="min-h-screen flex justify-center items-center" style={{ color: 'var(--muted-foreground)' }}>
                <div className="text-center space-y-4">
                    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
                    <p style={{ fontFamily: 'var(--font-body)' }}>Loading article...</p>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
                <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Post not found</h1>
                <p className="mb-8" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}>The article you are looking for does not exist or has been removed.</p>
                <Link href="/blog" className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition">
                    Return to Blog
                </Link>
            </div>
        );
    }

    return (
        <article className="min-h-screen pb-20 px-4" style={{ paddingTop: 'clamp(2rem, 4vw, 4rem)' }}>
            <div className="max-w-3xl mx-auto">
                <Link href="/blog" className="inline-flex items-center hover:text-primary transition-colors mb-8 text-sm font-medium" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: 'var(--color-gold-glow)', color: 'var(--primary)' }}>
                            {blog.tag}
                        </span>
                        <span className="text-sm flex items-center gap-1" style={{ color: 'var(--muted-foreground)' }}>
                            <Calendar className="w-4 h-4" /> {new Date(blog.date).toLocaleDateString()}
                        </span>
                        <span className="text-sm flex items-center gap-1" style={{ color: 'var(--muted-foreground)' }}>
                            <Clock className="w-4 h-4" /> {blog.readTime}
                        </span>
                    </div>

                    <h1 className="tracking-tight mb-6 leading-tight text-balance" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-heading)', fontWeight: 300, color: 'var(--foreground)' }}>
                        {blog.title}
                    </h1>

                    <p className="text-xl italic border-l-4 border-primary pl-4 py-2" style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-body)' }}>
                        {blog.excerpt}
                    </p>
                </header>

                {/* Divider */}
                <div className="h-px w-full my-8" style={{ background: 'var(--border)' }} />

                {/* Content */}
                <div
                    className="max-w-none"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--foreground)' }}
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(blog.content) }}
                />

                {/* Footer Actions */}
                <div className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6" style={{ borderTop: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-4">
                        <span className="font-semibold text-sm" style={{ color: 'var(--muted-foreground)' }}>Share this article:</span>
                        <button className="p-3 border rounded-full hover:text-primary transition-colors" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>

                    <Link href="/contact" className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-transform hover:scale-105 shadow-md" style={{ fontFamily: 'var(--font-body)' }}>
                        Start Learning Quran Today
                    </Link>
                </div>
            </div>
        </article>
    );
}
