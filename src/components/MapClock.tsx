"use client";

import { geoNaturalEarth1, geoPath } from "d3-geo";
import type { FeatureCollection, Geometry } from "geojson";
import { useEffect, useMemo, useState } from "react";
import { useClock } from "@/hooks/useClock";
import { getUtcOffsetLabel } from "@/lib/time";

const COUNTRY_TIMEZONE: Record<string, { city: string; timeZone: string }> = {
    "United States of America": { city: "New York", timeZone: "America/New_York" },
    Canada: { city: "Toronto", timeZone: "America/Toronto" },
    Mexico: { city: "Mexico City", timeZone: "America/Mexico_City" },
    Brazil: { city: "São Paulo", timeZone: "America/Sao_Paulo" },
    Argentina: { city: "Buenos Aires", timeZone: "America/Argentina/Buenos_Aires" },
    Colombia: { city: "Bogotá", timeZone: "America/Bogota" },
    Peru: { city: "Lima", timeZone: "America/Lima" },
    Chile: { city: "Santiago", timeZone: "America/Santiago" },
    "United Kingdom": { city: "London", timeZone: "Europe/London" },
    Ireland: { city: "Dublin", timeZone: "Europe/Dublin" },
    Portugal: { city: "Lisbon", timeZone: "Europe/Lisbon" },
    Spain: { city: "Madrid", timeZone: "Europe/Madrid" },
    France: { city: "Paris", timeZone: "Europe/Paris" },
    Germany: { city: "Berlin", timeZone: "Europe/Berlin" },
    Italy: { city: "Rome", timeZone: "Europe/Rome" },
    Poland: { city: "Warsaw", timeZone: "Europe/Warsaw" },
    Finland: { city: "Helsinki", timeZone: "Europe/Helsinki" },
    Greece: { city: "Athens", timeZone: "Europe/Athens" },
    Russia: { city: "Moscow", timeZone: "Europe/Moscow" },
    Egypt: { city: "Cairo", timeZone: "Africa/Cairo" },
    Nigeria: { city: "Lagos", timeZone: "Africa/Lagos" },
    "South Africa": { city: "Johannesburg", timeZone: "Africa/Johannesburg" },
    Kenya: { city: "Nairobi", timeZone: "Africa/Nairobi" },
    Morocco: { city: "Casablanca", timeZone: "Africa/Casablanca" },
    "Saudi Arabia": { city: "Riyadh", timeZone: "Asia/Riyadh" },
    "United Arab Emirates": { city: "Dubai", timeZone: "Asia/Dubai" },
    Iran: { city: "Tehran", timeZone: "Asia/Tehran" },
    Pakistan: { city: "Karachi", timeZone: "Asia/Karachi" },
    India: { city: "Mumbai", timeZone: "Asia/Kolkata" },
    Thailand: { city: "Bangkok", timeZone: "Asia/Bangkok" },
    Singapore: { city: "Singapore", timeZone: "Asia/Singapore" },
    Indonesia: { city: "Jakarta", timeZone: "Asia/Jakarta" },
    Philippines: { city: "Manila", timeZone: "Asia/Manila" },
    China: { city: "Beijing", timeZone: "Asia/Shanghai" },
    Japan: { city: "Tokyo", timeZone: "Asia/Tokyo" },
    "South Korea": { city: "Seoul", timeZone: "Asia/Seoul" },
    Taiwan: { city: "Taipei", timeZone: "Asia/Taipei" },
    Australia: { city: "Sydney", timeZone: "Australia/Sydney" },
    "New Zealand": { city: "Auckland", timeZone: "Pacific/Auckland" },
};

export function MapClock() {
    const [geoData, setGeoData] = useState<FeatureCollection<Geometry> | null>(null);
    const [selectedCountry, setSelectedCountry] = useState("United States of America");
    const [hoverCountry, setHoverCountry] = useState<string | null>(null);
    const [pointer, setPointer] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const load = async () => {
            const response = await fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");
            const data = (await response.json()) as FeatureCollection<Geometry>;
            setGeoData(data);
        };

        load().catch(() => {
            setGeoData(null);
        });
    }, []);

    const selected = useMemo(() => {
        const fallback = { city: "UTC", timeZone: "UTC" };
        return {
            country: selectedCountry,
            ...(COUNTRY_TIMEZONE[selectedCountry] ?? fallback),
        };
    }, [selectedCountry]);

    const hovered = useMemo(() => {
        if (!hoverCountry) {
            return null;
        }

        const fallback = { city: "UTC", timeZone: "UTC" };
        return {
            country: hoverCountry,
            ...(COUNTRY_TIMEZONE[hoverCountry] ?? fallback),
        };
    }, [hoverCountry]);

    const mappedPaths = useMemo(() => {
        if (!geoData) {
            return [] as { name: string; d: string }[];
        }

        const projection = geoNaturalEarth1().fitSize([1000, 520], geoData as any);
        const pathBuilder = geoPath(projection);

        return geoData.features
            .map((feature) => {
                const name = ((feature.properties as { name?: string } | undefined)?.name ?? "Unknown") as string;
                const d = pathBuilder(feature as any);
                return d ? { name, d } : null;
            })
            .filter((entry): entry is { name: string; d: string } => Boolean(entry));
    }, [geoData]);

    const { now } = useClock({ smooth: false });

    const timeText = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: selected.timeZone,
    }).format(now);

    const dateText = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
        timeZone: selected.timeZone,
    }).format(now);

    const hoverTimeText = hovered
        ? new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: hovered.timeZone,
        }).format(now)
        : "";

    const hoverDateText = hovered
        ? new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            month: "short",
            day: "2-digit",
            year: "numeric",
            timeZone: hovered.timeZone,
        }).format(now)
        : "";

    return (
        <section className="grid gap-8 lg:grid-cols-[1.25fr,1fr]">
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur md:p-6">
                <svg viewBox="0 0 1000 520" className="h-full w-full rounded-2xl bg-zinc-950/70 p-2">
                    <rect x="0" y="0" width="1000" height="520" fill="rgba(255,255,255,0.01)" />
                    {mappedPaths.map((country) => {
                        const active = selected.country === country.name;
                        return (
                            <path
                                key={country.name}
                                d={country.d}
                                fill={active ? "rgba(34,211,238,0.65)" : "rgba(255,255,255,0.12)"}
                                stroke="rgba(255,255,255,0.26)"
                                strokeWidth={active ? 1.1 : 0.45}
                                className="cursor-pointer transition-colors hover:fill-cyan-400/60"
                                onClick={() => setSelectedCountry(country.name)}
                                onMouseEnter={() => setHoverCountry(country.name)}
                                onMouseMove={(event) => setPointer({ x: event.clientX, y: event.clientY })}
                                onMouseLeave={() => setHoverCountry(null)}
                            />
                        );
                    })}
                </svg>

                {hovered ? (
                    <div
                        className="pointer-events-none fixed z-50 w-72 rounded-2xl border border-cyan-300/35 bg-zinc-950/95 p-4 shadow-[0_10px_45px_rgba(0,0,0,0.55)] backdrop-blur"
                        style={{ left: pointer.x + 6, top: pointer.y + 6 }}
                    >
                        <p className="text-xs uppercase tracking-[0.22em] opacity-70">Hover Preview</p>
                        <h3 className="mt-2 text-xl font-semibold">{hovered.city}</h3>
                        <p className="opacity-70">{hovered.country}</p>
                        <p className="mt-4 text-3xl font-semibold tracking-[0.08em] tabular-nums">{hoverTimeText}</p>
                        <p className="mt-1 text-sm opacity-80">{hoverDateText}</p>
                        <p className="mt-1 text-sm opacity-70">{hovered.timeZone}</p>
                        <p className="text-sm opacity-70">{getUtcOffsetLabel(hovered.timeZone)}</p>
                    </div>
                ) : null}
            </div>

            <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.22em] opacity-70">Selected Location</p>
                <h3 className="mt-3 text-2xl font-semibold">{selected.city}</h3>
                <p className="opacity-70">{selected.country}</p>
                <p className="mt-8 text-5xl font-semibold tracking-[0.08em] tabular-nums">{timeText}</p>
                <p className="mt-3 opacity-80">{dateText}</p>
                <p className="mt-2 opacity-70">{selected.timeZone}</p>
                <p className="opacity-70">{getUtcOffsetLabel(selected.timeZone)}</p>
            </aside>
        </section>
    );
}
