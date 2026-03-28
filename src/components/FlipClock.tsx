"use client";

import { useMemo } from "react";
import { useClock } from "@/hooks/useClock";
import { useSettingsStore } from "@/store/settingsStore";
import { pad } from "@/lib/time";

interface FlipUnitProps {
    label: string;
    value: string;
}

function FlipUnit({ label, value }: FlipUnitProps) {
    return (
        <div className="flex shrink-0 flex-col items-center gap-3">
            <div className="flip-card relative h-40 w-30 overflow-hidden rounded-2xl border border-white/15 bg-zinc-900/80 text-7xl font-bold tabular-nums shadow-[0_16px_48px_rgba(0,0,0,0.5)] md:h-56 md:w-40 md:text-8xl">
                <div className="absolute inset-x-0 top-0 h-1/2 border-b border-white/10 bg-zinc-800/90" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-zinc-950/90" />

                <div className="absolute inset-0 grid place-items-center leading-none">{value}</div>

                <div key={`${label}-${value}-top`} className="flip-top absolute inset-x-0 top-0 h-1/2 origin-bottom border-b border-white/10 bg-zinc-800/95">
                    <div className="grid h-full place-items-center overflow-hidden leading-none">
                        <span className="-translate-y-[24%]">{value}</span>
                    </div>
                </div>

                <div key={`${label}-${value}-bottom`} className="flip-bottom absolute inset-x-0 bottom-0 h-1/2 origin-top bg-zinc-950">
                    <div className="grid h-full place-items-center overflow-hidden leading-none">
                        <span className="translate-y-[24%]">{value}</span>
                    </div>
                </div>
            </div>
            <p className="text-xs tracking-[0.2em] uppercase opacity-70 md:text-sm">{label}</p>
        </div>
    );
}

export function FlipClock() {
    const { now } = useClock({ smooth: false });
    const timeFormat = useSettingsStore((state) => state.timeFormat);
    const showSeconds = useSettingsStore((state) => state.showSeconds);

    const parts = useMemo(() => {
        const hour24 = now.getHours();
        const hour = timeFormat === "12h" ? ((hour24 + 11) % 12) + 1 : hour24;
        return {
            hours: pad(hour),
            minutes: pad(now.getMinutes()),
            seconds: pad(now.getSeconds()),
            suffix: timeFormat === "12h" ? (hour24 >= 12 ? "PM" : "AM") : "",
        };
    }, [now, timeFormat]);

    return (
        <section className="flex w-full flex-col items-center gap-10">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                <FlipUnit label="Hours" value={parts.hours} />
                <FlipUnit label="Minutes" value={parts.minutes} />
                {showSeconds ? <FlipUnit label="Seconds" value={parts.seconds} /> : null}
            </div>

            {parts.suffix ? <p className="text-sm tracking-[0.18em] opacity-80">{parts.suffix}</p> : null}
        </section>
    );
}
