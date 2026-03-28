import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Clock App",
    description: "Modern clock suite: digital, analog, world clock, timer, and stopwatch.",
    applicationName: "Clock App",
    manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
    themeColor: "#000000",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
            <body suppressHydrationWarning className="min-h-full font-sans text-white">
                <AppShell>{children}</AppShell>
            </body>
        </html>
    );
}
