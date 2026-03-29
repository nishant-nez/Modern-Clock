import type { Metadata } from "next";
import Link from "next/link";
import { Stopwatch } from "@/components/Stopwatch";
import { StructuredData } from "@/components/StructuredData";
import { createBreadcrumbSchema, createFaqSchema, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
    title: "Online Stopwatch with Milliseconds",
    description:
        "Free online stopwatch with milliseconds, lap tracking, fastest/slowest lap insights, and fullscreen mode.",
    path: "/stopwatch",
    keywords: [
        "stopwatch online",
        "online stopwatch with milliseconds",
        "lap timer online",
        "precision stopwatch",
        "free stopwatch tool",
    ],
});

export default function StopwatchPage() {
    const breadcrumbSchema = createBreadcrumbSchema([
        { name: "Home", path: "/clock" },
        { name: "Online Stopwatch", path: "/stopwatch" },
    ]);

    const faqSchema = createFaqSchema([
        {
            question: "How to use a stopwatch online?",
            answer:
                "Press Start to begin timing, Lap to save split times, Stop to pause, and Reset to clear the stopwatch and lap history.",
        },
        {
            question: "Does this stopwatch show milliseconds?",
            answer:
                "Yes. The stopwatch tracks minutes, seconds, and milliseconds for accurate timing during workouts, coding sprints, and tests.",
        },
    ]);

    return (
        <>
            <StructuredData data={breadcrumbSchema} />
            <StructuredData data={faqSchema} />

            <section>
                <h1 className="sr-only">Online Stopwatch With Milliseconds and Lap Tracking</h1>
                <Stopwatch />
            </section>

            <section className="seo-content mx-auto mt-10 w-full max-w-4xl">
                <details className="rounded-2xl border border-white/15 bg-black/15 p-4 text-sm opacity-90">
                    <summary className="cursor-pointer font-medium">Stopwatch usage and tips</summary>
                    <div className="mt-4 space-y-3 leading-6">
                        <h2 className="text-base font-semibold">How to use a stopwatch effectively</h2>
                        <p>
                            Use lap tracking to capture split times and compare pace. This helps for interval training, classroom activities, and performance testing.
                        </p>
                        <h3 className="text-base font-semibold">Related pages</h3>
                        <p>
                            For scheduled countdowns, <Link href="/timer" className="underline">use our online timer</Link>. For timezone checks, <Link href="/world" className="underline">check world clock for different timezones</Link>. You can always return to the <Link href="/clock" className="underline">full screen online clock</Link>.
                        </p>
                    </div>
                </details>
            </section>
        </>
    );
}
