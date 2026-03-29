import type { Metadata } from "next";
import Link from "next/link";
import { ClockCanvas } from "@/components/ClockCanvas";
import { StructuredData } from "@/components/StructuredData";
import { createBreadcrumbSchema, createFaqSchema, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
    title: "Online Digital Clock Full Screen Free",
    description:
        "Use a free online digital clock with fullscreen mode, 12h/24h format, date and seconds controls, plus analog and flip clock styles.",
    path: "/clock",
    keywords: [
        "online digital clock",
        "full screen clock",
        "large online clock",
        "live clock",
        "analog clock online",
        "flip clock online",
        "custom clock themes",
    ],
});

export default function ClockPage() {
    const breadcrumbSchema = createBreadcrumbSchema([
        { name: "Home", path: "/clock" },
        { name: "Online Clock", path: "/clock" },
    ]);

    const faqSchema = createFaqSchema([
        {
            question: "What is an online clock?",
            answer:
                "An online clock is a live web-based clock that shows the current time in real time. This clock app supports fullscreen display, 12h/24h format, and multiple clock styles.",
        },
        {
            question: "Can I use this as a full screen clock?",
            answer:
                "Yes. You can use fullscreen mode to display a large digital, analog, or flip clock for classrooms, offices, workouts, or focus sessions.",
        },
    ]);

    return (
        <>
            <StructuredData data={breadcrumbSchema} />
            <StructuredData data={faqSchema} />

            <section className="grid flex-1 place-items-center">
                <h1 className="sr-only">Online Clock - Full Screen Digital, Analog, and Flip Clock</h1>
                <ClockCanvas />
            </section>

            <section className="seo-content mx-auto mt-10 w-full max-w-4xl">
                <details className="rounded-2xl border border-white/15 bg-black/15 p-4 text-sm opacity-90">
                    <summary className="cursor-pointer font-medium">About this online clock</summary>
                    <div className="mt-4 space-y-3 leading-6">
                        <h2 className="text-base font-semibold">What is an online clock?</h2>
                        <p>
                            This is a free online clock tool that gives you a live digital clock, analog clock online mode, and flip clock online style in one interface.
                        </p>
                        <h3 className="text-base font-semibold">More time tools</h3>
                        <p>
                            Use our <Link href="/timer" className="underline">online timer</Link> for countdown sessions, open the <Link href="/stopwatch" className="underline">online stopwatch with milliseconds</Link> for accurate tracking, or check the <Link href="/world" className="underline">world clock for different timezones</Link>.
                        </p>
                    </div>
                </details>
            </section>
        </>
    );
}
