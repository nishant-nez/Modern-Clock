"use client";

import { useEffect, useMemo, useState } from "react";
import { useClock } from "@/hooks/useClock";
import { useSettingsStore } from "@/store/settingsStore";
import { pad } from "@/lib/time";

interface FlipUnitProps {
    label: string;
    value: string;
    isLightTheme: boolean;
}

function FlipUnit({ label, value, isLightTheme }: FlipUnitProps) {
    const [displayValue, setDisplayValue] = useState(value);
    const [previousValue, setPreviousValue] = useState(value);
    const [isFlipping, setIsFlipping] = useState(false);

    useEffect(() => {
        if (value === displayValue) {
            return;
        }

        const frame = window.requestAnimationFrame(() => {
            setPreviousValue(displayValue);
            setDisplayValue(value);
            setIsFlipping(true);
        });

        return () => {
            window.cancelAnimationFrame(frame);
        };
    }, [value, displayValue]);

    useEffect(() => {
        if (!isFlipping) {
            return;
        }

        const timeout = window.setTimeout(() => {
            setIsFlipping(false);
        }, 460);

        return () => {
            window.clearTimeout(timeout);
        };
    }, [isFlipping]);

    return (
        <div className="flex shrink-0 flex-col items-center gap-3">
            <div className={`flip-card relative h-40 w-30 overflow-hidden rounded-2xl border text-6xl font-bold tabular-nums shadow-[0_16px_48px_rgba(0,0,0,0.5)] md:h-56 md:w-40 md:text-8xl ${isLightTheme ? "border-slate-300 bg-white text-slate-900 shadow-[0_10px_28px_rgba(15,23,42,0.15)]" : "border-white/15 bg-zinc-900/80 text-zinc-100"}`}>
                <div className={`absolute inset-x-0 top-0 h-1/2 ${isLightTheme ? "bg-slate-100" : "bg-zinc-800/90"}`} />
                <div className={`absolute inset-x-0 bottom-0 h-1/2 ${isLightTheme ? "bg-white" : "bg-zinc-950/90"}`} />
                <div className={`absolute inset-x-0 top-1/2 h-px ${isLightTheme ? "bg-slate-300" : "bg-white/15"}`} />

                <div className="absolute inset-0 grid place-items-center">
                    <span className="leading-none">{displayValue}</span>
                </div>

                {isFlipping ? (
                    <>
                        <div
                            key={`${label}-${previousValue}-top`}
                            className={`flip-top absolute inset-x-0 top-0 h-1/2 origin-bottom overflow-hidden border-b ${isLightTheme ? "border-slate-300 bg-slate-100" : "border-white/10 bg-zinc-800/95"}`}
                        >
                            <div className="relative h-full">
                                <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center leading-none">{previousValue}</span>
                            </div>
                        </div>

                        <div
                            key={`${label}-${value}-bottom`}
                            className={`flip-bottom absolute inset-x-0 bottom-0 h-1/2 origin-top overflow-hidden ${isLightTheme ? "bg-white" : "bg-zinc-950"}`}
                        >
                            <div className="relative h-full">
                                <span className="absolute inset-x-0 top-0 -translate-y-1/2 text-center leading-none">{displayValue}</span>
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
            <p className="text-xs tracking-[0.2em] uppercase opacity-70 md:text-sm">{label}</p>
        </div>
    );
}

export function FlipClock() {
    const { now } = useClock({ smooth: false });
    const theme = useSettingsStore((state) => state.theme);
    const timeFormat = useSettingsStore((state) => state.timeFormat);
    const showSeconds = useSettingsStore((state) => state.showSeconds);
    const isLightTheme = theme === "light";

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
                <FlipUnit label="Hours" value={parts.hours} isLightTheme={isLightTheme} />
                <FlipUnit label="Minutes" value={parts.minutes} isLightTheme={isLightTheme} />
                {showSeconds ? <FlipUnit label="Seconds" value={parts.seconds} isLightTheme={isLightTheme} /> : null}
            </div>

            {parts.suffix ? <p className="text-sm tracking-[0.18em] opacity-80">{parts.suffix}</p> : null}
        </section>
    );
}
