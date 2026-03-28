"use client";

import { useMemo } from "react";
import { useClock } from "@/hooks/useClock";
import { useSettingsStore } from "@/store/settingsStore";
import { pad } from "@/lib/time";

function TimeGroup({ value, split }: { value: string; split: boolean }) {
    if (!split) {
        return <span className="inline-flex w-[2.2ch] justify-center tabular-nums">{value}</span>;
    }

    return (
        <span className="flex w-[2.3ch] justify-center gap-2 tabular-nums">
            {value.split("").map((digit, index) => (
                <span
                    key={`${digit}-${index}`}
                    className="inline-flex h-[1.2em] w-[0.78em] items-center justify-center rounded-2xl border border-white/15 bg-white/5 shadow-inner"
                >
                    {digit}
                </span>
            ))}
        </span>
    );
}

export function DigitalClock() {
    const { now } = useClock({ smooth: false });
    const timeFormat = useSettingsStore((state) => state.timeFormat);
    const showSeconds = useSettingsStore((state) => state.showSeconds);
    const showDate = useSettingsStore((state) => state.showDate);
    const clockStyle = useSettingsStore((state) => state.clockStyle);
    const theme = useSettingsStore((state) => state.theme);

    const { hourText, minuteText, secondText, suffix, dateText } = useMemo(() => {
        const hour24 = now.getHours();
        const hour12 = ((hour24 + 11) % 12) + 1;

        return {
            hourText: pad(timeFormat === "12h" ? hour12 : hour24),
            minuteText: pad(now.getMinutes()),
            secondText: pad(now.getSeconds()),
            suffix: timeFormat === "12h" ? (hour24 >= 12 ? "PM" : "AM") : "",
            dateText: new Intl.DateTimeFormat("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
            }).format(now),
        };
    }, [now, timeFormat]);

    const split = clockStyle === "split";
    const clockClassName =
        clockStyle === "thin"
            ? "font-light tracking-[0.08em]"
            : clockStyle === "segmented"
                ? `font-mono tracking-[0.12em] ${theme === "light" ? "" : "drop-shadow-[0_0_24px_rgba(255,255,255,0.20)]"}`
                : "font-semibold";

    return (
        <section className="flex flex-col items-center gap-6 text-center">
            <div
                className={`clock-display select-none text-[clamp(3rem,18vw,13rem)] leading-none ${clockClassName}`}
                aria-live="polite"
            >
                <span className="inline-flex items-center gap-3 md:gap-5">
                    <TimeGroup value={hourText} split={split} />
                    <span className="colon-blink">:</span>
                    <TimeGroup value={minuteText} split={split} />
                    {showSeconds ? (
                        <>
                            <span className="colon-blink">:</span>
                            <TimeGroup value={secondText} split={split} />
                        </>
                    ) : null}
                    {suffix ? (
                        <span className="ml-3 text-[0.22em] font-medium tracking-[0.16em] opacity-80">
                            {suffix}
                        </span>
                    ) : null}
                </span>
            </div>

            {showDate ? (
                <p className="text-sm tracking-[0.18em] uppercase opacity-75 md:text-base">{dateText}</p>
            ) : null}
        </section>
    );
}
