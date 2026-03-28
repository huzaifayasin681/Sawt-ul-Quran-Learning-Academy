import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import LayoutWrapper from "@/components/layout-wrapper";

export const metadata: Metadata = {
  title: "Sawt ul Quran Learning Academy — Online Quran Teaching Academy",
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
        className="antialiased min-h-screen flex flex-col transition-colors duration-500"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative z-10 flex-1 flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
            <LayoutWrapper>{children}</LayoutWrapper>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
