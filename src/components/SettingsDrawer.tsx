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

const THEMES: ThemeMode[] = ["dark", "neon", "grayscale", "gradient", "glass"];
const CLOCK_STYLES: ClockStyle[] = ["classic", "split", "segmented", "thin", "analog", "flip"];
const TIME_FORMATS: TimeFormat[] = ["12h", "24h"];
const DIAL_STYLES: AnalogDialStyle[] = ["classic", "modern", "minimal"];
const ACCENTS: AnalogAccent[] = ["dark", "light", "color"];

export function SettingsDrawer({ open, onClose }: SettingsDrawerProps) {
    const settings = useSettingsStore();

    const panelClass = useMemo(
        () =>
            `fixed right-0 top-0 z-40 h-full w-full max-w-sm transform border-l border-white/10 bg-black/85 p-6 backdrop-blur transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
            }`,
        [open]
    );

    return (
        <>
            {open ? <button className="fixed inset-0 z-30 bg-black/50" aria-label="Close settings" onClick={onClose} /> : null}
            <aside className={panelClass} aria-hidden={!open}>
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-semibold tracking-wide">Settings</h2>
                    <button onClick={onClose} className="rounded-lg border border-white/20 px-3 py-1">
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
                                    className={`rounded-xl border px-3 py-2 text-left capitalize ${settings.theme === theme ? "border-cyan-300 bg-cyan-300/15" : "border-white/15 bg-white/5"
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
                            className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 capitalize"
                        >
                            {CLOCK_STYLES.map((style) => (
                                <option key={style} value={style} className="bg-zinc-900 capitalize">
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
                                    className={`rounded-xl border px-3 py-2 ${settings.timeFormat === format ? "border-cyan-300 bg-cyan-300/15" : "border-white/15 bg-white/5"
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
                                className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 capitalize"
                            >
                                {DIAL_STYLES.map((style) => (
                                    <option key={style} value={style} className="bg-zinc-900 capitalize">
                                        {style}
                                    </option>
                                ))}
                            </select>

                            <div className="mt-2 grid grid-cols-3 gap-2">
                                {ACCENTS.map((accent) => (
                                    <button
                                        key={accent}
                                        onClick={() => settings.setAnalogAccent(accent)}
                                        className={`rounded-lg border px-2 py-2 text-xs uppercase tracking-wide ${settings.analogAccent === accent ? "border-cyan-300 bg-cyan-300/15" : "border-white/15 bg-white/5"}`}
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
                </div>
            </aside>
        </>
    );
}
