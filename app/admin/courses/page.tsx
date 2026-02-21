"use client";

import { useEffect, useState } from "react";
import { Edit2, Search, CheckCircle2, XCircle } from "lucide-react";
import { Course } from "@/lib/db";

export default function CoursesManager() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCourses = async () => {
        try {
            const res = await fetch("/api/courses");
            if (res.ok) {
                setCourses(await res.json());
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const toggleCourseStatus = async (course: Course) => {
        try {
            const updatedCourse = { ...course, isActive: !course.isActive };
            const res = await fetch(`/api/courses`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedCourse)
            });
            if (res.ok) {
                setCourses((prev) => prev.map((c) => (c.id === course.id ? updatedCourse : c)));
            }
        } catch (err) {
            console.error("Failed to toggle course status");
        }
    };

    return (
        <div className="space-y-6 max-w-full overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manage Courses</h1>
                    <p className="text-muted-foreground mt-1">Control visibility and content of your curriculum tracks.</p>
                </div>
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="text" placeholder="Search courses..." className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-10 text-muted-foreground">Loading courses...</div>
                ) : courses.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-muted-foreground">No courses loaded yet. Save default courses in code to initialize.</div>
                ) : (
                    courses.map((course) => (
                        <div key={course.id} className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col transition-shadow hover:shadow-md">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-xl">{course.title}</h3>
                                        {course.isActive ? (
                                            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>
                                        ) : (
                                            <span className="bg-zinc-100 text-zinc-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Hidden</span>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{course.subtitle}</p>
                                </div>

                                <div className="p-3 rounded-xl bg-muted/50 text-muted-foreground">
                                    {/* Using generic representation for icon */}
                                    {course.iconName}
                                </div>
                            </div>

                            <div className="flex-1">
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Key Features</h4>
                                <ul className="space-y-1">
                                    {course.features.slice(0, 3).map((f, i) => (
                                        <li key={i} className="text-sm flex items-center gap-2 text-foreground/80 before:content-['•'] before:text-muted-foreground">{f}</li>
                                    ))}
                                    {course.features.length > 3 && <li className="text-sm text-muted-foreground italic pl-3">+ {course.features.length - 3} more</li>}
                                </ul>
                            </div>

                            <div className="mt-8 pt-4 border-t border-border flex justify-between items-center">
                                <button
                                    onClick={() => toggleCourseStatus(course)}
                                    className={`text-sm font-medium flex items-center gap-2 transition-colors ${course.isActive ? 'text-red-500 hover:text-red-600' : 'text-green-600 hover:text-green-700'}`}
                                >
                                    {course.isActive ? <><XCircle className="w-4 h-4" /> Hide Course</> : <><CheckCircle2 className="w-4 h-4" /> Activate Course</>}
                                </button>

                                <button className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors bg-muted/50 px-4 py-2 rounded-lg hover:bg-primary/10">
                                    <Edit2 className="w-4 h-4" /> Edit
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
