import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import { createSoftwareApplicationSchema, createWebApplicationSchema, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, ALL_KEYWORDS } from "@/lib/seo";
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
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Online Clock, Timer & Stopwatch - Free Time Tools",
        template: "%s | Clock App",
    },
    description:
        "Free online clock toolkit with fullscreen digital clock, analog clock, flip clock, world clock map, countdown timer, and stopwatch with milliseconds.",
    applicationName: SITE_NAME,
    keywords: ALL_KEYWORDS,
    alternates: {
        canonical: "/clock",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    openGraph: {
        type: "website",
        url: SITE_URL,
        title: "Online Clock, Timer & Stopwatch - Free Time Tools",
        description:
            "Use a full screen digital clock, live analog clock, world clock with map, online timer, countdown, and stopwatch in one fast web app.",
        siteName: SITE_NAME,
        images: [
            {
                url: DEFAULT_OG_IMAGE,
                width: 1200,
                height: 630,
                alt: "Clock App - online clock, timer, and stopwatch tools",
            },
        ],
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Online Clock, Timer & Stopwatch - Free Time Tools",
        description:
            "Fullscreen online clock, world clock with map, free timer and stopwatch with milliseconds.",
        images: [DEFAULT_OG_IMAGE],
    },
    manifest: "/manifest.webmanifest",
    category: "utilities",
};

export const viewport: Viewport = {
    themeColor: "#000000",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const webApplicationSchema = createWebApplicationSchema();
    const softwareApplicationSchema = createSoftwareApplicationSchema();

    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
                />
            </head>
            <body suppressHydrationWarning className="min-h-full font-sans text-white">
                <AppShell>{children}</AppShell>
            </body>
        </html>
    );
}
