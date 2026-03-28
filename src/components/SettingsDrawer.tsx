"use client";

import { useMemo } from "react";
import {
    AnalogAccent,
    AnalogDialStyle,
    ClockStyle,
    ThemeMode,
    TimeFormat,
    useSettingsStore,
} from "@/store/settingsStore";

interface SettingsDrawerProps {
    open: boolean;
    onClose: () => void;
}

const THEMES: ThemeMode[] = ["dark", "light", "neon", "grayscale", "gradient", "glass"];
const CLOCK_STYLES: ClockStyle[] = ["classic", "split", "segmented", "thin", "analog", "flip"];
const TIME_FORMATS: TimeFormat[] = ["12h", "24h"];
const DIAL_STYLES: AnalogDialStyle[] = ["classic", "modern", "minimal"];
const ACCENTS: AnalogAccent[] = ["dark", "light", "color"];

export function SettingsDrawer({ open, onClose }: SettingsDrawerProps) {
    const settings = useSettingsStore();
    const isLightTheme = settings.theme === "light";

    const panelClass = useMemo(
        () =>
            `fixed right-0 top-0 z-40 h-full w-full max-w-sm transform border-l p-6 backdrop-blur transition-transform duration-300 ${isLightTheme ? "border-black/15 bg-white/95 text-slate-900" : "border-white/10 bg-black/85 text-white"
            } ${open ? "translate-x-0" : "translate-x-full"}`,
        [open, isLightTheme]
    );

    return (
        <>
            {open ? <button className="fixed inset-0 z-30 bg-black/50" aria-label="Close settings" onClick={onClose} /> : null}
            <aside className={panelClass} aria-hidden={!open}>
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-semibold tracking-wide">Settings</h2>
                    <button onClick={onClose} className={`rounded-lg border px-3 py-1 ${isLightTheme ? "border-black/20" : "border-white/20"}`}>
                        Close
                    </button>
                </div>

                <div className="space-y-5 overflow-y-auto pb-8">
                    <section className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] opacity-70">Theme</label>
                        <div className="grid grid-cols-2 gap-2">
                            {THEMES.map((theme) => (
                                <button
                                    key={theme}
                                    onClick={() => settings.setTheme(theme)}
                                    className={`rounded-xl border px-3 py-2 text-left capitalize ${settings.theme === theme
                                        ? isLightTheme
                                            ? "border-sky-500 bg-sky-100"
                                            : "border-cyan-300 bg-cyan-300/15"
                                        : isLightTheme
                                            ? "border-black/15 bg-white"
                                            : "border-white/15 bg-white/5"
                                        }`}
                                >
                                    {theme}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] opacity-70">Clock style</label>
                        <select
                            value={settings.clockStyle}
                            onChange={(event) => settings.setClockStyle(event.target.value as ClockStyle)}
                            className={`w-full rounded-xl border px-3 py-2 capitalize ${isLightTheme ? "border-black/20 bg-white text-slate-900" : "border-white/15 bg-black/30 text-white"}`}
                        >
                            {CLOCK_STYLES.map((style) => (
                                <option
                                    key={style}
                                    value={style}
                                    className={`capitalize ${isLightTheme ? "bg-white text-slate-900" : "bg-zinc-900 text-white"}`}
                                >
                                    {style}
                                </option>
                            ))}
                        </select>
                    </section>

                    <section className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] opacity-70">Time format</label>
                        <div className="flex gap-2">
                            {TIME_FORMATS.map((format) => (
                                <button
                                    key={format}
                                    onClick={() => settings.setTimeFormat(format)}
                                    className={`rounded-xl border px-3 py-2 ${settings.timeFormat === format
                                        ? isLightTheme
                                            ? "border-sky-500 bg-sky-100"
                                            : "border-cyan-300 bg-cyan-300/15"
                                        : isLightTheme
                                            ? "border-black/15 bg-white"
                                            : "border-white/15 bg-white/5"
                                        }`}
                                >
                                    {format}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] opacity-70">Visibility</label>
                        <div className="space-y-2">
                            <button onClick={settings.toggleSeconds} className="settings-toggle">
                                Seconds: {settings.showSeconds ? "On" : "Off"}
                            </button>
                            <button onClick={settings.toggleDate} className="settings-toggle">
                                Date: {settings.showDate ? "On" : "Off"}
                            </button>
                            <button onClick={settings.toggleAutoNightMode} className="settings-toggle">
                                Auto night mode: {settings.autoNightMode ? "On" : "Off"}
                            </button>
                        </div>
                    </section>

                    {settings.clockStyle === "analog" ? (
                        <section className="space-y-2">
                            <label className="text-xs uppercase tracking-[0.2em] opacity-70">Analog options</label>
                            <select
                                value={settings.analogDialStyle}
                                onChange={(event) => settings.setAnalogDialStyle(event.target.value as AnalogDialStyle)}
                                className={`w-full rounded-xl border px-3 py-2 capitalize ${isLightTheme ? "border-black/20 bg-white text-slate-900" : "border-white/15 bg-black/30 text-white"}`}
                            >
                                {DIAL_STYLES.map((style) => (
                                    <option
                                        key={style}
                                        value={style}
                                        className={`capitalize ${isLightTheme ? "bg-white text-slate-900" : "bg-zinc-900 text-white"}`}
                                    >
                                        {style}
                                    </option>
                                ))}
                            </select>

                            <div className="mt-2 grid grid-cols-3 gap-2">
                                {ACCENTS.map((accent) => (
                                    <button
                                        key={accent}
                                        onClick={() => settings.setAnalogAccent(accent)}
                                        className={`rounded-lg border px-2 py-2 text-xs uppercase tracking-wide ${settings.analogAccent === accent
                                            ? isLightTheme
                                                ? "border-sky-500 bg-sky-100"
                                                : "border-cyan-300 bg-cyan-300/15"
                                            : isLightTheme
                                                ? "border-black/15 bg-white"
                                                : "border-white/15 bg-white/5"}`}
                                    >
                                        {accent}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-2">
                                <button onClick={settings.toggleAnalogRoman} className="settings-toggle">
                                    Roman numerals: {settings.analogRoman ? "On" : "Off"}
                                </button>
                                <button onClick={settings.toggleAnalogTicks} className="settings-toggle">
                                    Tick marks: {settings.analogTicks ? "On" : "Off"}
                                </button>
                                <button onClick={settings.toggleAnalogSecond} className="settings-toggle">
                                    Second hand: {settings.analogShowSecond ? "On" : "Off"}
                                </button>
                            </div>
                        </section>
                    ) : null}

                    <section className={`rounded-2xl border p-4 ${isLightTheme ? "border-black/15 bg-white" : "border-white/10 bg-black/20"}`}>
                        <h3 className="text-sm uppercase tracking-[0.18em] opacity-75">Quick Tips</h3>
                        <p className="mt-2 text-sm leading-6 opacity-80">
                            Use this drawer to customize theme, clock style, time format, and visibility settings.
                        </p>
                        <ul className="mt-3 space-y-2 text-sm opacity-80">
                            <li>• Keyboard shortcuts: T → Timer, S → Stopwatch, W → World.</li>
                            <li>• Use fullscreen button in top-right for distraction-free mode.</li>
                            <li>• Analog options appear only when Analog style is selected.</li>
                        </ul>
                    </section>
                </div>
            </aside>
        </>
    );
}
