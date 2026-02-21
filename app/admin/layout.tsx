"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, Users, BookOpen, Settings, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const navItems = [
        { name: "Overview", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
        { name: "Leads & Students", href: "/admin/leads", icon: <Users className="w-5 h-5" /> },
        { name: "Blog Posts", href: "/admin/blogs", icon: <FileText className="w-5 h-5" /> },
        { name: "Courses", href: "/admin/courses", icon: <BookOpen className="w-5 h-5" /> },
        { name: "Teachers", href: "/admin/teachers", icon: <Users className="w-5 h-5" /> }, // Reusing Users icon or we can import another
    ];

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/login");
            router.refresh();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex h-screen bg-muted/20 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-border flex flex-col justify-between hidden md:flex h-full">
                <div>
                    <div className="p-6 border-b border-border flex items-center gap-2">
                        <Settings className="w-6 h-6 text-primary" />
                        <h1 className="font-bold text-lg tracking-tight">Admin Portal</h1>
                    </div>

                    <nav className="p-4 space-y-2 flex-col">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm w-full ${isActive
                                        ? "bg-primary text-primary-foreground shadow-md"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        }`}
                                >
                                    {item.icon}
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-4 border-t border-border flex flex-col gap-4">
                    <div className="flex items-center justify-between px-2">
                        <span className="text-sm font-medium text-muted-foreground">Theme</span>
                        <ThemeToggle />
                    </div>
                    <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-red-500 transition-colors w-full rounded-lg hover:bg-red-500/10">
                        <LogOut className="w-4 h-4" /> Secure Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-y-auto overflow-x-hidden bg-background">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card">
                    <h1 className="font-bold">Admin Portal</h1>
                    <ThemeToggle />
                </header>

                <div className="p-6 md:p-10 w-full max-w-7xl mx-auto h-full pb-24">
                    {children}
                </div>
            </main>
        </div>
    );
}
