"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { IslamicGeometricPattern, StardustParticles, AuraGlow } from "./background-effects";
import BismillahSplash from "./bismillah-splash";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [showSplash, setShowSplash] = useState(false);
    const [splashDone, setSplashDone] = useState(false);

    useEffect(() => {
        // Only show splash on first visit (per session)
        const hasSeenSplash = sessionStorage.getItem("noor-ul-quran-splash-seen");
        if (!hasSeenSplash) {
            setShowSplash(true);
        } else {
            setSplashDone(true);
        }
    }, []);

    const handleSplashComplete = () => {
        setShowSplash(false);
        setSplashDone(true);
        sessionStorage.setItem("noor-ul-quran-splash-seen", "true");
    };

    // Define pages that should NOT have the global public layout
    const isAdminPage = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

    if (isAdminPage) {
        // Return a clean container for admin/login pages
        return (
            <main className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
                {children}
            </main>
        );
    }

    // Return the standard public layout for all other pages
    return (
        <>
            {/* Bismillah splash on first load */}
            {showSplash && <BismillahSplash onComplete={handleSplashComplete} />}

            {/* Main site content — revealed after splash */}
            <div
                style={{
                    opacity: splashDone ? 1 : 0,
                    transition: "opacity 0.8s ease-in-out",
                    pointerEvents: splashDone ? "auto" : "none",
                }}
            >
                <Navbar />
                <AuraGlow />
                <IslamicGeometricPattern />
                <StardustParticles />
                <main className="flex-1 flex flex-col pt-20 relative z-10">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
}
