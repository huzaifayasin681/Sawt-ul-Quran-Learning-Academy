import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

import { IslamicGeometricPattern, StardustParticles } from "../components/background-effects";

export const metadata: Metadata = {
  title: "Noor ul Quran — Online Quran Teaching Academy",
  description: "Learn Quran online with certified teachers. From Qaida to advanced Tajweed. Structured courses for kids, teens, and adults. Book your free trial today.",
  keywords: "Quran, online Quran classes, Tajweed, Qaida, Islamic education, Quran teacher, learn Quran online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts: Cormorant Garamond (headings) + DM Sans (body) + Amiri (Arabic) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased min-h-screen flex flex-col"
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif", backgroundColor: "#060A09", color: "#EEE8D5" }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative z-10 flex-1 flex flex-col min-h-screen">
            <Navbar />
            <IslamicGeometricPattern />
            <StardustParticles />
            <main className="flex-1 flex flex-col px-6 md:px-10">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
