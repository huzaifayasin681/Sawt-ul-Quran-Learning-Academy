"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, Edit2, Trash2, Search, Eye, EyeOff } from "lucide-react";
import { Blog } from "@/lib/db";

export default function BlogsManager() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            const res = await fetch("/api/blogs?admin=true");
            if (res.ok) {
                setBlogs(await res.json());
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (id: string, title: string) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            try {
                const res = await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
                if (res.ok) {
                    setBlogs((prev) => prev.filter((b) => b.id !== id));
                }
            } catch (err) {
                console.error("Failed to delete blog");
            }
        }
    };

    return (
        <div className="space-y-6 max-w-full overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Blog Articles</h1>
                    <p className="text-muted-foreground mt-1">Manage, write, and publish your content.</p>
                </div>
                <div className="flex gap-4 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="text" placeholder="Search blogs..." className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" />
                    </div>
                    <Link href="/admin/blogs/editor" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition shadow-sm whitespace-nowrap">
                        <Plus className="w-4 h-4" /> New Post
                    </Link>
                </div>
            </div>

            <div className="bg-card border border-border shadow-sm rounded-2xl overflow-hidden overflow-x-auto w-full">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground bg-muted/30 uppercase border-b border-border">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Title</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold">Date & Read Time</th>
                            <th className="px-6 py-4 font-semibold">Tag</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {loading ? (
                            <tr><td colSpan={5} className="text-center py-10 text-muted-foreground">Loading articles...</td></tr>
                        ) : blogs.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-10 text-muted-foreground">No blog posts found. Create your first one!</td></tr>
                        ) : (
                            blogs.map((blog) => (
                                <tr key={blog.id} className="hover:bg-muted/10 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-foreground text-base mb-1">{blog.title}</div>
                                        <div className="text-xs text-muted-foreground">{blog.slug}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {blog.published ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full"><Eye className="w-3 h-3" /> Published</span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-zinc-100 text-zinc-700 rounded-full"><EyeOff className="w-3 h-3" /> Draft</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                                        <div>{format(new Date(blog.date), "MMM d, yyyy")}</div>
                                        <div className="text-xs mt-1">{blog.readTime}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">{blog.tag}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/blogs/editor?id=${blog.id}`} className="p-2 text-muted-foreground hover:text-foreground bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                            <button onClick={() => handleDelete(blog.id, blog.title)} className="p-2 text-muted-foreground hover:text-red-600 bg-muted/50 rounded-lg hover:bg-red-50 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
