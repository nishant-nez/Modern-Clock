"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useTimer } from "@/hooks/useTimer";
import { formatDuration, pad } from "@/lib/time";

function PlayIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
        </svg>
    );
}

function PauseIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
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

function TimeDisplay({ label, value }: { label: string; value: string }) {
    return (
        <div className="grid place-items-center gap-2 rounded-2xl border border-white/10 bg-black/25 px-3 py-4">
            <span className="text-5xl font-semibold tabular-nums md:text-6xl">{value}</span>
            <span className="text-xs uppercase tracking-[0.2em] opacity-70">{label}</span>
        </div>
    );
}

function BoundedInput({
    value,
    setValue,
    max,
    label,
}: {
    value: string;
    setValue: (next: string) => void;
    max: number;
    label: string;
}) {
    return (
        <label className="grid gap-2">
            <span className="text-xs uppercase tracking-[0.2em] opacity-70">{label}</span>
            <input
                value={value}
                onChange={(event) => setValue(pad(Math.min(Number(event.target.value || 0), max)))}
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-center text-2xl font-semibold tabular-nums"
                placeholder={label}
                inputMode="numeric"
            />
        </label>
    );
}

export function Timer() {
    const { remainingMs, isRunning, progress, start, pause, reset, setFromHms } = useTimer();
    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("05");
    const [seconds, setSeconds] = useState("00");
    const [targetDateTime, setTargetDateTime] = useState("");
    const [countdownMs, setCountdownMs] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const tick = () => {
            if (!targetDateTime) {
                setCountdownMs(0);
                return;
            }

            const target = new Date(targetDateTime).getTime();
            setCountdownMs(Math.max(target - Date.now(), 0));
        };

        tick();
        const id = window.setInterval(tick, 1000);
        return () => window.clearInterval(id);
    }, [targetDateTime]);

    useEffect(() => {
        const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
        onFullscreenChange();
        document.addEventListener("fullscreenchange", onFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
    }, []);

    const ring = useMemo(() => {
        const radius = 72;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference * (1 - progress);
        return { radius, circumference, offset };
    }, [progress]);

    const countdownParts = useMemo(
        () => formatDuration(countdownMs, true) as { days: number; hours: number; minutes: number; seconds: number },
        [countdownMs]
    );

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFromHms(Number(hours), Number(minutes), Number(seconds));
    };

    const [remainHours, remainMinutes, remainSeconds] = (formatDuration(remainingMs) as string).split(":");
    const progressPercent = Math.max(0, Math.min(100, Math.round(progress * 100)));

    const activeCard = (
        <div className={`grid gap-4 rounded-3xl border border-white/10 bg-black/25 p-4 md:p-6 ${isFullscreen ? "md:grid-cols-[340px,1fr]" : "md:grid-cols-[250px,1fr]"}`}>
            <div className="relative grid place-items-center">
                <svg className={`${isFullscreen ? "h-80 w-80" : "h-52 w-52"} -rotate-90`} viewBox="0 0 180 180">
                    <circle cx="90" cy="90" r={ring.radius} stroke="rgba(255,255,255,0.15)" strokeWidth="10" fill="none" />
                    <circle
                        cx="90"
                        cy="90"
                        r={ring.radius}
                        stroke="#22d3ee"
                        strokeWidth="10"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray={ring.circumference}
                        strokeDashoffset={ring.offset}
                    />
                </svg>
                <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
                    <p className={`${isFullscreen ? "text-5xl" : "text-3xl"} font-semibold tabular-nums`}>{progressPercent}%</p>
                    <p className="text-xs uppercase tracking-[0.16em] opacity-70">{isRunning ? "Running" : "Paused"}</p>
                </div>
            </div>

            <div className="grid content-center gap-4">
                <h2 className="text-sm uppercase tracking-[0.2em] opacity-70">Active countdown</h2>
                <div className="grid grid-cols-3 gap-3">
                    <TimeDisplay label="Hours" value={remainHours} />
                    <TimeDisplay label="Minutes" value={remainMinutes} />
                    <TimeDisplay label="Seconds" value={remainSeconds} />
                </div>

                <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={start} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-black">
                        <PlayIcon /> Start
                    </button>
                    <button type="button" onClick={pause} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2">
                        <PauseIcon /> Pause
                    </button>
                    <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2">
                        <ResetIcon /> Reset
                    </button>
                </div>

                <p className="text-sm uppercase tracking-[0.16em] opacity-70">Status: {isRunning ? "Running" : "Paused"}</p>
            </div>
        </div>
    );

    if (isFullscreen) {
        return (
            <section className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl place-items-center">
                {activeCard}
            </section>
        );
    }

    return (
        <section className="mx-auto grid w-full max-w-4xl gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-10">
            {activeCard}

            <form onSubmit={onSubmit} className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <h3 className="text-sm uppercase tracking-[0.2em] opacity-70">Set timer duration</h3>
                <p className="mt-1 text-sm opacity-70">Enter hours, minutes, and seconds, then click Set Duration.</p>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <BoundedInput value={hours} setValue={setHours} max={23} label="Hours" />
                    <BoundedInput value={minutes} setValue={setMinutes} max={59} label="Minutes" />
                    <BoundedInput value={seconds} setValue={setSeconds} max={59} label="Seconds" />
                </div>
                <button type="submit" className="mt-4 rounded-xl border border-cyan-400/45 bg-cyan-400/12 px-5 py-3 font-medium">
                    Set Duration
                </button>
            </form>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <h3 className="text-sm uppercase tracking-[0.2em] opacity-70">Target date countdown</h3>
                <p className="mt-1 text-sm opacity-70">Pick a future date/time to show days, hours, minutes, and seconds remaining.</p>
                <div className="mt-3 grid gap-3 md:grid-cols-[1fr,auto]">
                    <input
                        type="datetime-local"
                        value={targetDateTime}
                        onChange={(event) => setTargetDateTime(event.target.value)}
                        className="rounded-xl border border-white/15 bg-black/20 px-4 py-3"
                    />
                    <button type="button" onClick={() => setTargetDateTime("")} className="rounded-xl border border-white/20 px-5 py-3">
                        Clear
                    </button>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-3 text-center">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                        <p className="text-3xl font-semibold tabular-nums">{countdownParts.days}</p>
                        <p className="text-xs uppercase tracking-[0.16em] opacity-70">Days</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                        <p className="text-3xl font-semibold tabular-nums">{pad(countdownParts.hours)}</p>
                        <p className="text-xs uppercase tracking-[0.16em] opacity-70">Hours</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                        <p className="text-3xl font-semibold tabular-nums">{pad(countdownParts.minutes)}</p>
                        <p className="text-xs uppercase tracking-[0.16em] opacity-70">Minutes</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                        <p className="text-3xl font-semibold tabular-nums">{pad(countdownParts.seconds)}</p>
                        <p className="text-xs uppercase tracking-[0.16em] opacity-70">Seconds</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
