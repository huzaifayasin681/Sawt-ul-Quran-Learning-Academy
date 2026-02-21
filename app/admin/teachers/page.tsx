"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Search, CheckCircle2, XCircle, UserCircle2 } from "lucide-react";
import { Teacher } from "@/lib/db";

export default function TeachersManager() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTeachers = async () => {
        try {
            const res = await fetch("/api/teachers");
            if (res.ok) {
                setTeachers(await res.json());
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    const handleDelete = async (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            try {
                const res = await fetch(`/api/teachers?id=${id}`, { method: "DELETE" });
                if (res.ok) {
                    setTeachers((prev) => prev.filter((t) => t.id !== id));
                }
            } catch (err) {
                console.error("Failed to delete teacher");
            }
        }
    };

    return (
        <div className="space-y-6 max-w-full overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Teachers Directory</h1>
                    <p className="text-muted-foreground mt-1">Manage instructor profiles, bios, and introductory videos.</p>
                </div>
                <div className="flex gap-4 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="text" placeholder="Search teachers..." className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" />
                    </div>
                    <Link href="/admin/teachers/editor" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition shadow-sm whitespace-nowrap">
                        <Plus className="w-4 h-4" /> Add Teacher
                    </Link>
                </div>
            </div>

            <div className="bg-card border border-border shadow-sm rounded-2xl overflow-hidden overflow-x-auto w-full">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground bg-muted/30 uppercase border-b border-border">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Teacher</th>
                            <th className="px-6 py-4 font-semibold">Role/Title</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {loading ? (
                            <tr><td colSpan={4} className="text-center py-10 text-muted-foreground">Loading teachers...</td></tr>
                        ) : teachers.length === 0 ? (
                            <tr><td colSpan={4} className="text-center py-10 text-muted-foreground">No teachers added yet.</td></tr>
                        ) : (
                            teachers.map((teacher) => (
                                <tr key={teacher.id} className="hover:bg-muted/10 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center overflow-hidden border border-border">
                                                {teacher.imagePath ? (
                                                    <img src={teacher.imagePath} alt={teacher.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <UserCircle2 className="w-6 h-6 text-muted-foreground" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-medium text-foreground text-base mb-0.5">{teacher.name}</div>
                                                <div className="text-xs text-muted-foreground truncate max-w-[200px]">{teacher.bio}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-md text-xs font-semibold">{teacher.role}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {teacher.isActive ? (
                                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600"><CheckCircle2 className="w-3.5 h-3.5" /> Active</span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground"><XCircle className="w-3.5 h-3.5" /> Hidden</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/teachers/editor?id=${teacher.id}`} className="p-2 text-muted-foreground hover:text-foreground bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                            <button onClick={() => handleDelete(teacher.id, teacher.name)} className="p-2 text-muted-foreground hover:text-red-600 bg-muted/50 rounded-lg hover:bg-red-50 transition-colors">
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
