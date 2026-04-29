"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { IslamicGeometricPattern, StardustParticles, AuraGlow } from "./background-effects";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

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
            <Navbar />
            <AuraGlow />
            <IslamicGeometricPattern />
            <StardustParticles />
            <main className="flex-1 flex flex-col pt-20 relative z-10">
                {children}
            </main>
            <Footer />
        </>
    );
}
