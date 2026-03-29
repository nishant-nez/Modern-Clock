"use client";

import dynamic from "next/dynamic";
import { useSettingsStore } from "@/store/settingsStore";

const DigitalClock = dynamic(() => import("@/components/DigitalClock").then((mod) => mod.DigitalClock), {
    ssr: false,
    loading: () => <div className="h-[min(74vw,32rem)] w-[min(74vw,32rem)] rounded-3xl border border-white/10 bg-white/5" aria-hidden="true" />,
});

const AnalogClock = dynamic(() => import("@/components/AnalogClock").then((mod) => mod.AnalogClock), {
    ssr: false,
    loading: () => <div className="h-[min(74vw,32rem)] w-[min(74vw,32rem)] rounded-full border border-white/10 bg-white/5" aria-hidden="true" />,
});

const FlipClock = dynamic(() => import("@/components/FlipClock").then((mod) => mod.FlipClock), {
    ssr: false,
    loading: () => <div className="h-[min(74vw,32rem)] w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5" aria-hidden="true" />,
});

export function ClockCanvas() {
    const style = useSettingsStore((state) => state.clockStyle);

    if (style === "analog") {
        return <AnalogClock />;
    }

    if (style === "flip") {
        return <FlipClock />;
    }

    return <DigitalClock />;
}
