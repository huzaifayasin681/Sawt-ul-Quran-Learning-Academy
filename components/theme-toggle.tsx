"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Prevent hydration mismatch
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="p-2 w-9 h-9" />;
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center rounded-full p-2.5 transition-all duration-300 hover:scale-110 active:scale-95 relative overflow-hidden group"
            style={{ background: 'var(--color-bg-glass)', border: '1px solid var(--color-border-subtle)' }}
            aria-label="Toggle theme"
        >
            <div className="relative z-10">
                {theme === "dark" ? (
                    <Sun className="h-4 w-4 text-primary animate-in zoom-in-50 duration-500" />
                ) : (
                    <Moon className="h-4 w-4 text-primary animate-in zoom-in-50 duration-500" />
                )}
            </div>

            {/* Subtle glow background */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
    );
}
