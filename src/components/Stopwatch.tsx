"use client";

import { useEffect, useMemo, useState } from "react";
import { useStopwatch } from "@/hooks/useStopwatch";
import { pad } from "@/lib/time";
import { useSettingsStore } from "@/store/settingsStore";

function PlayIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
        </svg>
    );
}

function StopIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <rect x="6" y="6" width="12" height="12" rx="1.5" />
        </svg>
    );
}

function LapIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function ResetIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path d="M4 12a8 8 0 1 0 2.3-5.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 4v4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function formatMs(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor(ms % 1000);
    return `${pad(minutes)}:${pad(seconds)}.${String(milliseconds).padStart(3, "0")}`;
}

function TimeCell({ value, label, light }: { value: string; label: string; light: boolean }) {
    return (
        <div className={`grid place-items-center gap-2 rounded-2xl border px-4 py-4 ${light ? "border-black/20 bg-white" : "border-white/10 bg-black/20"}`}>
            <p className="text-5xl font-semibold tabular-nums md:text-6xl">{value}</p>
            <p className="text-xs uppercase tracking-[0.18em] opacity-70">{label}</p>
        </div>
    );
}

export function Stopwatch() {
    const { elapsedMs, isRunning, laps, fastest, slowest, start, stop, reset, lap } = useStopwatch();
    const theme = useSettingsStore((state) => state.theme);
    const isLightTheme = theme === "light";
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
        onFullscreenChange();
        document.addEventListener("fullscreenchange", onFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
    }, []);
    const totalSeconds = Math.floor(elapsedMs / 1000);
    const minutes = pad(Math.floor(totalSeconds / 60));
    const seconds = pad(totalSeconds % 60);
    const milliseconds = String(Math.floor(elapsedMs % 1000)).padStart(3, "0");

    const lapsTitle = useMemo(() => {
        if (!laps.length) {
            return "No laps yet";
        }

        return `${laps.length} lap${laps.length > 1 ? "s" : ""}`;
    }, [laps.length]);

    const activeCard = (
        <>
            <div className="text-center">
                <div className="grid grid-cols-3 gap-3">
                    <TimeCell value={minutes} label="Minutes" light={isLightTheme} />
                    <TimeCell value={seconds} label="Seconds" light={isLightTheme} />
                    <TimeCell value={milliseconds} label="Millis" light={isLightTheme} />
                </div>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] opacity-70">{isRunning ? "Running" : "Stopped"}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
                <button onClick={start} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-6 py-2 text-black">
                    <PlayIcon /> Start
                </button>
                <button onClick={stop} className={`inline-flex items-center gap-2 rounded-full border px-6 py-2 ${isLightTheme ? "border-black/20" : "border-white/20"}`}>
                    <StopIcon /> Stop
                </button>
                <button onClick={lap} className={`inline-flex items-center gap-2 rounded-full border px-6 py-2 ${isLightTheme ? "border-black/20" : "border-white/20"}`}>
                    <LapIcon /> Lap
                </button>
                <button onClick={reset} className={`inline-flex items-center gap-2 rounded-full border px-6 py-2 ${isLightTheme ? "border-black/20" : "border-white/20"}`}>
                    <ResetIcon /> Reset
                </button>
            </div>
        </>
    );

    if (isFullscreen) {
        return (
            <section className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-3xl place-items-center">
                <div className={`grid w-full gap-8 rounded-3xl border p-6 backdrop-blur md:p-10 ${isLightTheme ? "border-black/20 bg-white/85" : "border-white/10 bg-white/5"}`}>
                    {activeCard}
                </div>
            </section>
        );
    }

    return (
        <section className={`mx-auto grid w-full max-w-3xl gap-8 rounded-3xl border p-6 backdrop-blur md:p-10 ${isLightTheme ? "border-black/20 bg-white/85" : "border-white/10 bg-white/5"}`}>
            {activeCard}

            <div className={`rounded-2xl border p-4 ${isLightTheme ? "border-black/20 bg-white/90" : "border-white/10 bg-black/20"}`}>
                <div className="mb-2 flex items-center justify-between text-sm opacity-80">
                    <p>{lapsTitle}</p>
                    {fastest !== null && slowest !== null ? (
                        <p>
                            Fastest {formatMs(fastest)} · Slowest {formatMs(slowest)}
                        </p>
                    ) : null}
                </div>
                <ul className="max-h-64 space-y-2 overflow-auto pr-2">
                    {laps.map((entry) => (
                        <li key={entry.id} className={`flex items-center justify-between rounded-xl border px-3 py-2 ${isLightTheme ? "border-black/15" : "border-white/10"}`}>
                            <span className="opacity-70">Lap {entry.id}</span>
                            <span className="font-medium">{formatMs(entry.elapsedMs)}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
