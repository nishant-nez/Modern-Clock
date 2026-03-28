"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "dark" | "light" | "neon" | "grayscale" | "gradient" | "glass";
export type ClockStyle = "classic" | "split" | "segmented" | "thin" | "analog" | "flip";
export type TimeFormat = "12h" | "24h";
export type AnalogDialStyle = "classic" | "modern" | "minimal";
export type AnalogAccent = "dark" | "light" | "color";

export interface SettingsState {
  theme: ThemeMode;
  clockStyle: ClockStyle;
  timeFormat: TimeFormat;
  showSeconds: boolean;
  showDate: boolean;
  analogDialStyle: AnalogDialStyle;
  analogRoman: boolean;
  analogTicks: boolean;
  analogShowSecond: boolean;
  analogAccent: AnalogAccent;
  autoNightMode: boolean;
  setTheme: (theme: ThemeMode) => void;
  setClockStyle: (style: ClockStyle) => void;
  setTimeFormat: (format: TimeFormat) => void;
  toggleSeconds: () => void;
  toggleDate: () => void;
  setAnalogDialStyle: (style: AnalogDialStyle) => void;
  toggleAnalogRoman: () => void;
  toggleAnalogTicks: () => void;
  toggleAnalogSecond: () => void;
  setAnalogAccent: (accent: AnalogAccent) => void;
  toggleAutoNightMode: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "dark",
      clockStyle: "classic",
      timeFormat: "24h",
      showSeconds: true,
      showDate: true,
      analogDialStyle: "modern",
      analogRoman: false,
      analogTicks: true,
      analogShowSecond: true,
      analogAccent: "dark",
      autoNightMode: true,
      setTheme: (theme) => set({ theme }),
      setClockStyle: (clockStyle) => set({ clockStyle }),
      setTimeFormat: (timeFormat) => set({ timeFormat }),
      toggleSeconds: () => set((state) => ({ showSeconds: !state.showSeconds })),
      toggleDate: () => set((state) => ({ showDate: !state.showDate })),
      setAnalogDialStyle: (analogDialStyle) => set({ analogDialStyle }),
      toggleAnalogRoman: () => set((state) => ({ analogRoman: !state.analogRoman })),
      toggleAnalogTicks: () => set((state) => ({ analogTicks: !state.analogTicks })),
      toggleAnalogSecond: () => set((state) => ({ analogShowSecond: !state.analogShowSecond })),
      setAnalogAccent: (analogAccent) => set({ analogAccent }),
      toggleAutoNightMode: () => set((state) => ({ autoNightMode: !state.autoNightMode })),
    }),
    {
      name: "clock-app-settings",
      partialize: (state) => ({
        theme: state.theme,
        clockStyle: state.clockStyle,
        timeFormat: state.timeFormat,
        showSeconds: state.showSeconds,
        showDate: state.showDate,
        analogDialStyle: state.analogDialStyle,
        analogRoman: state.analogRoman,
        analogTicks: state.analogTicks,
        analogShowSecond: state.analogShowSecond,
        analogAccent: state.analogAccent,
        autoNightMode: state.autoNightMode,
      }),
    },
  ),
);
