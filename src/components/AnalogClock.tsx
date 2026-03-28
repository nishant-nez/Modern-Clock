"use client";

import { useMemo } from "react";
import { useClock } from "@/hooks/useClock";
import { useSettingsStore } from "@/store/settingsStore";

export function AnalogClock() {
    const { now } = useClock({ smooth: true });
    const theme = useSettingsStore((state) => state.theme);
    const analogDialStyle = useSettingsStore((state) => state.analogDialStyle);
    const analogRoman = useSettingsStore((state) => state.analogRoman);
    const analogTicks = useSettingsStore((state) => state.analogTicks);
    const analogShowSecond = useSettingsStore((state) => state.analogShowSecond);
    const analogAccent = useSettingsStore((state) => state.analogAccent);
    const isLightTheme = theme === "light";

    const second = now.getSeconds() + now.getMilliseconds() / 1000;
    const minute = now.getMinutes() + second / 60;
    const hour = (now.getHours() % 12) + minute / 60;

    const secondRotation = second * 6;
    const minuteRotation = minute * 6;
    const hourRotation = hour * 30;

    const numerals = useMemo(
        () =>
            analogRoman
                ? ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"]
                : ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
        [analogRoman]
    );

    const accentClass = isLightTheme
        ? analogAccent === "color"
            ? "text-sky-700"
            : "text-slate-900"
        : analogAccent === "light"
            ? "text-zinc-900"
            : analogAccent === "color"
                ? "text-cyan-300"
                : "text-white";

    return (
        <section className="flex flex-col items-center gap-8">
            <div
                className={`relative grid h-[min(74vw,32rem)] w-[min(74vw,32rem)] place-items-center rounded-full border ${analogDialStyle === "minimal"
                    ? isLightTheme
                        ? "border-slate-400/50 bg-white/65"
                        : "border-white/20 bg-transparent"
                    : analogDialStyle === "classic"
                        ? isLightTheme
                            ? "border-slate-400/60 bg-white shadow-[0_0_35px_rgba(15,23,42,0.16)]"
                            : "border-white/30 bg-zinc-950/55 shadow-[0_0_45px_rgba(0,0,0,0.65)]"
                        : isLightTheme
                            ? "border-slate-400/45 bg-white/80 backdrop-blur"
                            : "border-white/20 bg-white/5 backdrop-blur"
                    } ${accentClass}`}
            >
                <svg viewBox="0 0 100 100" className="h-full w-full">
                    {analogTicks
                        ? Array.from({ length: 60 }).map((_, index) => {
                            const angle = (index / 60) * Math.PI * 2;
                            const inner = index % 5 === 0 ? 7 : 5;
                            const outerRadius = 40;
                            const x1 = 50 + Math.cos(angle) * (outerRadius - inner);
                            const y1 = 50 + Math.sin(angle) * (outerRadius - inner);
                            const x2 = 50 + Math.cos(angle) * outerRadius;
                            const y2 = 50 + Math.sin(angle) * outerRadius;

                            return (
                                <line
                                    key={index}
                                    x1={x1}
                                    y1={y1}
                                    x2={x2}
                                    y2={y2}
                                    stroke="currentColor"
                                    strokeOpacity={index % 5 === 0 ? 0.7 : 0.25}
                                    strokeWidth={index % 5 === 0 ? 0.7 : 0.35}
                                />
                            );
                        })
                        : null}

                    {numerals.map((value, index) => {
                        const angle = ((index - 3) / 12) * Math.PI * 2;
                        const x = 50 + Math.cos(angle) * 34;
                        const y = 50 + Math.sin(angle) * 34;
                        return (
                            <text
                                key={value}
                                x={x}
                                y={y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="currentColor"
                                fontSize={analogRoman ? "4" : "5"}
                                opacity="0.85"
                            >
                                {value}
                            </text>
                        );
                    })}

                    <g transform={`rotate(${hourRotation} 50 50)`}>
                        <line x1="50" y1="50" x2="50" y2="28" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                    </g>

                    <g transform={`rotate(${minuteRotation} 50 50)`}>
                        <line x1="50" y1="50" x2="50" y2="20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </g>

                    {analogShowSecond ? (
                        <g transform={`rotate(${secondRotation} 50 50)`}>
                            <line x1="50" y1="56" x2="50" y2="18" stroke="#f43f5e" strokeWidth="1" strokeLinecap="round" />
                        </g>
                    ) : null}

                    <circle cx="50" cy="50" r="1.7" fill="currentColor" />
                </svg>
            </div>
        </section>
    );
}
