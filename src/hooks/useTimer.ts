"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const toMs = (h: number, m: number, s: number) => (h * 3600 + m * 60 + s) * 1000;

export function useTimer(initialMs = 5 * 60 * 1000) {
  const [durationMs, setDurationMs] = useState(initialMs);
  const [remainingMs, setRemainingMs] = useState(initialMs);
  const [isRunning, setIsRunning] = useState(false);
  const startedAtRef = useRef<number | null>(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    let frameId = 0;
    const loop = () => {
      if (startedAtRef.current === null) {
        return;
      }

      const elapsed = performance.now() - startedAtRef.current + offsetRef.current;
      const next = Math.max(durationMs - elapsed, 0);
      setRemainingMs(next);

      if (next === 0) {
        setIsRunning(false);
        offsetRef.current = durationMs;
        return;
      }

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [durationMs, isRunning]);

  const start = useCallback(() => {
    if (remainingMs <= 0) {
      return;
    }

    setIsRunning(true);
    startedAtRef.current = performance.now();
  }, [remainingMs]);

  const pause = useCallback(() => {
    if (!isRunning || startedAtRef.current === null) {
      return;
    }

    offsetRef.current += performance.now() - startedAtRef.current;
    startedAtRef.current = null;
    setIsRunning(false);
  }, [isRunning]);

  const reset = useCallback(() => {
    startedAtRef.current = null;
    offsetRef.current = 0;
    setRemainingMs(durationMs);
    setIsRunning(false);
  }, [durationMs]);

  const setFromHms = useCallback((hours: number, minutes: number, seconds: number) => {
    const next = toMs(hours, minutes, seconds);
    startedAtRef.current = null;
    offsetRef.current = 0;
    setDurationMs(next);
    setRemainingMs(next);
    setIsRunning(false);
  }, []);

  const progress = useMemo(() => {
    if (durationMs === 0) {
      return 0;
    }

    return (durationMs - remainingMs) / durationMs;
  }, [durationMs, remainingMs]);

  return {
    durationMs,
    remainingMs,
    isRunning,
    progress,
    start,
    pause,
    reset,
    setFromHms,
  };
}
