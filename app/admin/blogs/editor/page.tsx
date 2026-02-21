"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Save, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { Blog } from "@/lib/db";

export default function BlogEditor() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("id");

    const [loading, setLoading] = useState(!!editId);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<Partial<Blog>>({
        title: "",
        slug: "",
        excerpt: "",
        content: "# Subtitle\n\nStart writing your amazing article here...",
        tag: "General",
        published: false,
    });

    useEffect(() => {
        if (editId) {
            // Fetch existing blog data
            fetch(`/api/blogs?admin=true`)
                .then((res) => res.json())
                .then((data: Blog[]) => {
                    const blog = data.find((b) => b.id === editId);
                    if (blog) setFormData(blog);
                })
                .finally(() => setLoading(false));
        }
    }, [editId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const togglePublish = () => {
        setFormData((prev) => ({ ...prev, published: !prev.published }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/blogs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // @ts-ignore
                body: JSON.stringify({ ...formData }),
            });
            if (res.ok) {
                router.push("/admin/blogs");
                router.refresh();
            } else {
                console.error("Save failed", await res.text());
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-center text-muted-foreground">Loading editor...</div>;

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-20">
            <div className="flex items-center justify-between gap-4 border-b border-border pb-6 sticky top-0 bg-background/80 backdrop-blur-md z-10 pt-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blogs" className="p-2 border border-border rounded-full hover:bg-muted transition-colors">
                        <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{editId ? "Edit Post" : "Create New Post"}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={togglePublish}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium border transition-colors ${formData.published ? 'bg-green-500/10 text-green-700 border-green-200' : 'bg-muted text-muted-foreground border-border'
                            }`}
                    >
                        {formData.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        {formData.published ? "Published" : "Draft"}
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={saving || !formData.title || !formData.content}
                        className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-sm"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Post
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="md:col-span-2 space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-semibold">Post Title <span className="text-red-500">*</span></label>
                        <input
                            id="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. 5 Benefits of Learning Tajweed..."
                            className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="content" className="text-sm font-semibold flex justify-between">
                            <span>Body Content (Markdown) <span className="text-red-500">*</span></span>
                            <span className="text-xs text-muted-foreground font-normal">Supports # headings, **bold**, lists</span>
                        </label>
                        <textarea
                            id="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Write your article here..."
                            className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none min-h-[500px] font-mono text-sm leading-relaxed resize-y"
                        />
                    </div>
                </div>

                {/* Sidebar Settings Column */}
                <div className="space-y-6">
                    <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                        <h3 className="font-semibold border-b border-border pb-2 mb-4">Post Settings</h3>

                        <div className="space-y-2">
                            <label htmlFor="slug" className="text-sm font-medium text-muted-foreground">URL Slug</label>
                            <input
                                id="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                placeholder="auto-generated-if-empty"
                                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="tag" className="text-sm font-medium text-muted-foreground">Category Tag</label>
                            <select
                                id="tag"
                                value={formData.tag}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none"
                            >
                                <option value="General">General</option>
                                <option value="Beginners">Beginners</option>
                                <option value="Tajweed">Tajweed</option>
                                <option value="Parents & Kids">Parents & Kids</option>
                                <option value="Updates">Updates</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="excerpt" className="text-sm font-medium text-muted-foreground">Short Excerpt (SEO)</label>
                            <textarea
                                id="excerpt"
                                value={formData.excerpt}
                                onChange={handleChange}
                                placeholder="A short summary for the blog card..."
                                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none min-h-[100px] resize-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
