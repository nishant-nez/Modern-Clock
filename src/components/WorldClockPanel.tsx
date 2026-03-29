"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { CITY_OPTIONS } from "@/lib/timezones";
import { useSettingsStore } from "@/store/settingsStore";

const MapClock = dynamic(() => import("@/components/MapClock").then((mod) => mod.MapClock), {
    ssr: false,
    loading: () => <div className="h-130 w-full rounded-3xl border border-white/10 bg-white/5" aria-hidden="true" />,
});

interface SelectedCity {
    id: string;
    city: string;
    country: string;
    timeZone: string;
}

function AddIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function RemoveIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function CityCard({ city, onRemove }: { city: SelectedCity; onRemove: () => void }) {
    const [now, setNow] = useState(new Date());
    const theme = useSettingsStore((state) => state.theme);
    const isLightTheme = theme === "light";

    useEffect(() => {
        const tick = () => setNow(new Date());
        const id = window.setInterval(tick, 1000);
        return () => window.clearInterval(id);
    }, []);

    const timeText = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: city.timeZone,
    }).format(now);

    const offset = new Intl.DateTimeFormat("en-US", {
        timeZone: city.timeZone,
        timeZoneName: "shortOffset",
        hour: "2-digit",
        minute: "2-digit",
    })
        .formatToParts(now)
        .find((part) => part.type === "timeZoneName")?.value;

    return (
        <li className={`rounded-2xl border p-4 sm:p-5 ${isLightTheme ? "border-black/20 bg-white/85" : "border-white/10 bg-white/5"}`}>
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-medium sm:text-xl">{city.city}</h3>
                    <p className="opacity-70">{city.country}</p>
                    <p className="mt-1 text-xs opacity-60">{city.timeZone}</p>
                </div>
                <button onClick={onRemove} className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs whitespace-nowrap ${isLightTheme ? "border-black/20" : "border-white/20"}`}>
                    <RemoveIcon /> Remove
                </button>
            </div>
            <p className="mt-4 text-3xl font-semibold tracking-[0.06em] tabular-nums sm:text-4xl">{timeText}</p>
            <p className="mt-1 text-sm opacity-70">{offset}</p>
        </li>
    );
}

export function WorldClockPanel() {
    const [query, setQuery] = useState("");
    const [cities, setCities] = useState<SelectedCity[]>([CITY_OPTIONS[0]]);
    const theme = useSettingsStore((state) => state.theme);
    const isLightTheme = theme === "light";

    const filtered = useMemo(
        () =>
            CITY_OPTIONS.filter((city) =>
                `${city.city} ${city.country} ${city.timeZone}`.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 16),
        [query]
    );

    const addCity = (city: SelectedCity) => {
        if (cities.some((entry) => entry.id === city.id)) {
            return;
        }

        setCities((current) => [...current, city]);
        setQuery("");
    };

    return (
        <section className="grid gap-6 sm:gap-8">
            <div className={`rounded-3xl border p-4 backdrop-blur sm:p-5 ${isLightTheme ? "border-black/20 bg-white/85" : "border-white/10 bg-white/5"}`}>
                <div className="grid gap-3">
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search cities or timezone"
                        className={`rounded-xl border px-4 py-3 ${isLightTheme ? "border-black/20 bg-white text-slate-900" : "border-white/15 bg-black/20"}`}
                    />

                    {query ? (
                        <div className={`grid gap-2 rounded-2xl border p-3 md:grid-cols-2 ${isLightTheme ? "border-black/20 bg-white/90" : "border-white/10 bg-black/20"}`}>
                            {filtered.length ? (
                                filtered.map((city) => (
                                    <button
                                        key={city.id}
                                        onClick={() => addCity(city)}
                                        className={`flex items-center justify-between rounded-xl border px-3 py-2 text-left ${isLightTheme ? "border-black/15 hover:border-sky-500/40 hover:bg-sky-100" : "border-white/10 hover:border-cyan-300/50 hover:bg-cyan-300/10"}`}
                                    >
                                        <span>
                                            <span className="block font-medium">{city.city}</span>
                                            <span className="text-xs opacity-70">{city.country} · {city.timeZone}</span>
                                        </span>
                                        <AddIcon />
                                    </button>
                                ))
                            ) : (
                                <p className="text-sm opacity-70">No cities found. Try another query.</p>
                            )}
                        </div>
                    ) : (
                        <p className="text-xs uppercase tracking-[0.16em] opacity-60">
                            Type to search from {CITY_OPTIONS.length} cities. Click a result to add it.
                        </p>
                    )}
                </div>
            </div>

            <ul className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
                {cities.map((city) => (
                    <CityCard
                        key={city.id}
                        city={city}
                        onRemove={() => setCities((current) => current.filter((entry) => entry.id !== city.id))}
                    />
                ))}
            </ul>

            <MapClock />
        </section>
    );
}
