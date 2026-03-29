import type { Metadata } from "next";
import Link from "next/link";
import { WorldClockPanel } from "@/components/WorldClockPanel";
import { StructuredData } from "@/components/StructuredData";
import { createBreadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
    title: "World Clock with Map - Time in Cities & Timezones",
    description:
        "Check time in cities worldwide with a live world clock map, timezone labels, and multi-city comparison cards.",
    path: "/world",
    keywords: [
        "world clock with map",
        "time in cities",
        "world timezone clock",
        "multi city clock",
        "international time tool",
    ],
});

export default function WorldPage() {
    const breadcrumbSchema = createBreadcrumbSchema([
        { name: "Home", path: "/clock" },
        { name: "World Clock", path: "/world" },
    ]);

    return (
        <>
            <StructuredData data={breadcrumbSchema} />

            <section>
                <h1 className="sr-only">World Clock With Map - Time in Major Cities</h1>
                <WorldClockPanel />
            </section>

            <section className="seo-content mx-auto mt-10 w-full max-w-5xl">
                <details className="rounded-2xl border border-white/15 bg-black/15 p-4 text-sm opacity-90">
                    <summary className="cursor-pointer font-medium">How to use world clock and timezones</summary>
                    <div className="mt-4 space-y-3 leading-6">
                        <h2 className="text-base font-semibold">Check time in cities instantly</h2>
                        <p>
                            Search and add cities to compare local times side by side. Use the map to hover countries and preview live local time with UTC offset.
                        </p>
                        <h3 className="text-base font-semibold">Related tools</h3>
                        <p>
                            Need a countdown? Try our <Link href="/timer" className="underline">online timer</Link>. For precision tracking, use the <Link href="/stopwatch" className="underline">free online stopwatch</Link>. For a full display, return to the <Link href="/clock" className="underline">online digital clock</Link>.
                        </p>
                    </div>
                </details>
            </section>
        </>
    );
}
