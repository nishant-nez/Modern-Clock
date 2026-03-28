"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { SettingsDrawer } from "@/components/SettingsDrawer";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { ThemeMode } from "@/store/settingsStore";
import { useSettingsStore } from "@/store/settingsStore";

interface AppShellProps {
    children: ReactNode;
}

const NAV_ITEMS = [
    { href: "/clock", label: "Clock" },
    { href: "/world", label: "World" },
    { href: "/timer", label: "Timer" },
    { href: "/stopwatch", label: "Stopwatch" },
];

const THEME_SEQUENCE: ThemeMode[] = ["dark", "light", "neon", "grayscale", "gradient", "glass"];

function TimeFormatIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ThemeIcon({ theme }: { theme: ThemeMode }) {
    const color =
        theme === "light"
            ? "#0f172a"
            : theme === "neon"
                ? "#22d3ee"
                : theme === "grayscale"
                    ? "#d4d4d8"
                    : theme === "gradient"
                        ? "#38bdf8"
                        : theme === "glass"
                            ? "#5eead4"
                            : "#ffffff";

    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="9" cy="10" r="2.2" fill={color} />
            <circle cx="15.8" cy="8.8" r="1.6" fill="#f472b6" />
            <circle cx="14.8" cy="14.8" r="1.9" fill="#818cf8" />
        </svg>
    );
}

function FullscreenIcon({ active }: { active: boolean }) {
    if (active) {
        return (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                <path d="M9 3H3v6M15 3h6v6M9 21H3v-6M21 21h-6v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path d="M9 3H3v6M15 3h6v6M9 21H3v-6M21 21h-6v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

function SettingsIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path d="M10.4 2h3.2l.6 2.4a8 8 0 0 1 2.1.9l2.1-1.3 2.3 2.3-1.3 2.1c.4.7.7 1.4.9 2.1l2.4.6v3.2l-2.4.6c-.2.7-.5 1.4-.9 2.1l1.3 2.1-2.3 2.3-2.1-1.3a8 8 0 0 1-2.1.9l-.6 2.4h-3.2l-.6-2.4a8 8 0 0 1-2.1-.9l-2.1 1.3-2.3-2.3 1.3-2.1a8 8 0 0 1-.9-2.1L2 13.6v-3.2l2.4-.6c.2-.7.5-1.4.9-2.1L4 5.6 6.3 3.3l2.1 1.3c.7-.4 1.4-.7 2.1-.9z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
    );
}

export function AppShell({ children }: AppShellProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const theme = useSettingsStore((state) => state.theme);
    const autoNightMode = useSettingsStore((state) => state.autoNightMode);
    const setTheme = useSettingsStore((state) => state.setTheme);
    const timeFormat = useSettingsStore((state) => state.timeFormat);
    const setTimeFormat = useSettingsStore((state) => state.setTimeFormat);
    const isLightTheme = theme === "light";

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
                return;
            }

            if (event.key.toLowerCase() === "t") {
                router.push("/timer");
            }

            if (event.key.toLowerCase() === "s") {
                router.push("/stopwatch");
            }

            if (event.key.toLowerCase() === "w") {
                router.push("/world");
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [router]);

    useEffect(() => {
        // Keep selected theme authoritative to avoid perceived "theme not changing" behavior.
        // Auto-night is managed in settings logic and should not override explicit theme selection here.
        document.documentElement.dataset.theme = theme;
    }, [theme, autoNightMode]);

    useEffect(() => {
        const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
        onFullscreenChange();
        document.addEventListener("fullscreenchange", onFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
    }, []);

    const onFullscreen = async () => {
        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
            return;
        }

        await document.exitFullscreen();
    };

    const onToggleTheme = () => {
        const currentIndex = THEME_SEQUENCE.indexOf(theme);
        const nextIndex = (currentIndex + 1) % THEME_SEQUENCE.length;
        setTheme(THEME_SEQUENCE[nextIndex]);
    };

    const onToggleTimeFormat = () => {
        setTimeFormat(timeFormat === "24h" ? "12h" : "24h");
    };

    const pageTitle = useMemo(
        () => NAV_ITEMS.find((item) => pathname.startsWith(item.href))?.label ?? "Clock",
        [pathname]
    );

    return (
        <>
            <ServiceWorkerRegistration />
            <div className="app-theme min-h-screen">
                {!isFullscreen ? (
                    <header className={`fixed left-0 right-0 top-0 z-20 border-b backdrop-blur ${isLightTheme ? "border-black/20 bg-white/85" : "border-white/10 bg-black/25"}`}>
                        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
                            <Link href="/clock" className="text-sm font-semibold tracking-[0.2em] uppercase">
                                Clock App
                            </Link>

                            <nav className="hidden items-center gap-2 md:flex">
                                {NAV_ITEMS.map((item) => {
                                    const active = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`rounded-full px-4 py-1.5 text-sm transition ${active ? "bg-white text-black" : "bg-white/5 hover:bg-white/15"}`}
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </nav>

                            <div className="flex items-center gap-2">
                                <div className={`flex items-center rounded-full border p-1 ${isLightTheme ? "border-black/15 bg-white/85" : "border-white/20 bg-black/25"}`}>
                                    <button
                                        onClick={() => setTimeFormat("12h")}
                                        title="Use 12-hour format"
                                        aria-label="Use 12-hour format"
                                        className={`rounded-full px-2.5 py-1 text-xs font-medium tracking-wide transition ${timeFormat === "12h"
                                            ? "bg-white text-black"
                                            : isLightTheme
                                                ? "text-slate-700 hover:bg-slate-200"
                                                : "text-white/80 hover:bg-white/10"}`}
                                    >
                                        12h
                                    </button>
                                    <button
                                        onClick={() => setTimeFormat("24h")}
                                        title="Use 24-hour format"
                                        aria-label="Use 24-hour format"
                                        className={`rounded-full px-2.5 py-1 text-xs font-medium tracking-wide transition ${timeFormat === "24h"
                                            ? "bg-white text-black"
                                            : isLightTheme
                                                ? "text-slate-700 hover:bg-slate-200"
                                                : "text-white/80 hover:bg-white/10"}`}
                                    >
                                        24h
                                    </button>
                                    <button
                                        onClick={onToggleTimeFormat}
                                        title="Toggle time format"
                                        aria-label="Toggle time format"
                                        className={`ml-1 rounded-full border p-1.5 ${isLightTheme ? "border-black/15 hover:bg-slate-200" : "border-white/15 hover:bg-white/10"}`}
                                    >
                                        <TimeFormatIcon />
                                    </button>
                                </div>
                                <button
                                    onClick={onToggleTheme}
                                    title={`Switch theme (current: ${theme})`}
                                    aria-label={`Switch theme (current: ${theme})`}
                                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs uppercase tracking-[0.12em] ${isLightTheme ? "border-black/15 hover:bg-slate-200" : "border-white/20 hover:bg-white/10"}`}
                                >
                                    <ThemeIcon theme={theme} />
                                    <span className="hidden lg:inline">{theme}</span>
                                </button>
                                <button
                                    onClick={onFullscreen}
                                    title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                                    className={`rounded-full border p-2.5 ${isLightTheme ? "border-black/15 hover:bg-slate-200" : "border-white/20 hover:bg-white/10"}`}
                                >
                                    <FullscreenIcon active={isFullscreen} />
                                </button>
                                <button
                                    onClick={() => setOpen(true)}
                                    title="Open settings"
                                    aria-label="Open settings"
                                    className={`rounded-full border p-2.5 ${isLightTheme ? "border-black/15 hover:bg-slate-200" : "border-white/20 hover:bg-white/10"}`}
                                >
                                    <SettingsIcon />
                                </button>
                            </div>
                        </div>
                    </header>
                ) : null}

                <main className={`mx-auto flex min-h-screen w-full max-w-7xl flex-1 flex-col px-4 pb-12 md:px-6 ${isFullscreen ? "pt-6" : "pt-28"}`}>
                    {!isFullscreen ? <div className="mb-8 text-xs uppercase tracking-[0.2em] opacity-70">{pageTitle}</div> : null}
                    {children}
                </main>
            </div>
            <SettingsDrawer open={open} onClose={() => setOpen(false)} />
        </>
    );
}
