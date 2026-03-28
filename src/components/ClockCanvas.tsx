"use client";

import dynamic from "next/dynamic";
import { useSettingsStore } from "@/store/settingsStore";

const DigitalClock = dynamic(() => import("@/components/DigitalClock").then((mod) => mod.DigitalClock), {
    ssr: false,
});

const AnalogClock = dynamic(() => import("@/components/AnalogClock").then((mod) => mod.AnalogClock), {
    ssr: false,
});

const FlipClock = dynamic(() => import("@/components/FlipClock").then((mod) => mod.FlipClock), {
    ssr: false,
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
