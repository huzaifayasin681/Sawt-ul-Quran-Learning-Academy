"use client";

import { useEffect, useState } from "react";
import { Users, FileText, BookOpen, Clock } from "lucide-react";

export default function AdminDashboard() {
    const [stats, setStats] = useState({ leads: 0, newLeads: 0, blogs: 0, courses: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                // Fetch all data in parallel
                const responses = await Promise.all([
                    fetch("/api/leads"),
                    fetch("/api/blogs?admin=true"),
                    fetch("/api/courses")
                ]);

                // Check if all responses are OK
                const results = await Promise.all(responses.map(async (res) => {
                    if (!res.ok) return [];
                    const data = await res.json();
                    return Array.isArray(data) ? data : [];
                }));

                const [leadsRes, blogsRes, coursesRes] = results;

                setStats({
                    leads: leadsRes.length || 0,
                    newLeads: leadsRes.filter((l: any) => l.status === "new").length || 0,
                    blogs: blogsRes.length || 0,
                    courses: coursesRes.length || 0,
                });
            } catch (error) {
                console.error("Dashboard stats fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchStats();
    }, []);

    if (isLoading) {
        return <div className="flex h-[50vh] items-center justify-center text-muted-foreground">Loading dashboard data...</div>
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Overview Dashboard</h1>
                <p className="text-muted-foreground mt-2">Welcome back to the Noor Ul Quran administration panel.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                            <h3 className="text-3xl font-bold mt-1">{stats.leads}</h3>
                        </div>
                        <Users className="w-8 h-8 text-primary/80" />
                    </div>
                    <p className="text-xs text-muted-foreground">Students from contact & quiz</p>
                </div>

                <div className="bg-primary/10 border-primary/20 p-6 rounded-2xl border shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm font-medium text-primary">New Enquiries</p>
                            <h3 className="text-3xl font-bold mt-1 text-primary">{stats.newLeads}</h3>
                        </div>
                        <Clock className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-xs text-primary/80">Require immediate follow-up</p>
                </div>

                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Blogs</p>
                            <h3 className="text-3xl font-bold mt-1">{stats.blogs}</h3>
                        </div>
                        <FileText className="w-8 h-8 text-secondary-foreground/80" />
                    </div>
                    <p className="text-xs text-muted-foreground">Published & drafts</p>
                </div>

                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
                            <h3 className="text-3xl font-bold mt-1">{stats.courses}</h3>
                        </div>
                        <BookOpen className="w-8 h-8 text-accent-foreground/80" />
                    </div>
                    <p className="text-xs text-muted-foreground">Curriculum tracks online</p>
                </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between shadow-sm">
                <div className="space-y-2 mb-6 md:mb-0">
                    <h2 className="text-xl font-bold">Quick Actions</h2>
                    <p className="text-sm text-muted-foreground">Jump directly to management pages.</p>
                </div>
                <div className="flex gap-4">
                    <a href="/admin/leads" className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition">View Leads</a>
                    <a href="/admin/blogs/editor" className="px-5 py-2.5 bg-secondary text-secondary-foreground border border-border rounded-full text-sm font-semibold hover:bg-muted transition">Write Post</a>
                </div>
            </div>
        </div>
    );
}
