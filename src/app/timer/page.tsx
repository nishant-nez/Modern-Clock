import type { Metadata } from "next";
import Link from "next/link";
import { Timer } from "@/components/Timer";
import { StructuredData } from "@/components/StructuredData";
import { createBreadcrumbSchema, createFaqSchema, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
    title: "Online Timer & Countdown Timer Free",
    description:
        "Use a free online timer and countdown timer with hours, minutes, seconds, progress ring, and target date countdown.",
    path: "/timer",
    keywords: [
        "online timer",
        "countdown timer online free",
        "web timer tool",
        "focus timer online",
        "countdown clock",
    ],
});

export default function TimerPage() {
    const breadcrumbSchema = createBreadcrumbSchema([
        { name: "Home", path: "/clock" },
        { name: "Online Timer", path: "/timer" },
    ]);

    const faqSchema = createFaqSchema([
        {
            question: "How do I use this online timer?",
            answer:
                "Set hours, minutes, and seconds, click Set Duration, then press Start. You can pause, resume, and reset anytime.",
        },
        {
            question: "Can I run a countdown to a specific date and time?",
            answer:
                "Yes. Use the target date countdown field to track remaining days, hours, minutes, and seconds until your selected date.",
        },
    ]);

    return (
        <>
            <StructuredData data={breadcrumbSchema} />
            <StructuredData data={faqSchema} />

            <section>
                <h1 className="sr-only">Online Timer and Countdown Timer Tool</h1>
                <Timer />
            </section>

            <section className="seo-content mx-auto mt-10 w-full max-w-4xl">
                <details className="rounded-2xl border border-white/15 bg-black/15 p-4 text-sm opacity-90">
                    <summary className="cursor-pointer font-medium">Best online timer tool guide</summary>
                    <div className="mt-4 space-y-3 leading-6">
                        <h2 className="text-base font-semibold">Best online timer for daily tasks</h2>
                        <p>
                            This free countdown timer works for study sessions, workouts, cooking, and productivity blocks. It includes quick controls and a clean fullscreen-friendly layout.
                        </p>
                        <h3 className="text-base font-semibold">Explore other time tools</h3>
                        <p>
                            Need precision splits? Use our <Link href="/stopwatch" className="underline">online stopwatch with milliseconds</Link>. To compare cities, check the <Link href="/world" className="underline">world clock for different timezones</Link>.
                        </p>
                    </div>
                </details>
            </section>
        </>
    );
}
