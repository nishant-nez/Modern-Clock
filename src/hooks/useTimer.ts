"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const toMs = (h: number, m: number, s: number) => (h * 3600 + m * 60 + s) * 1000;

let sharedDurationMs = 5 * 60 * 1000;
let sharedElapsedBeforePauseMs = 0;
let sharedRunningSinceEpoch: number | null = null;

const computeRemaining = (nowEpoch = Date.now()) => {
  const liveElapsed = sharedRunningSinceEpoch ? nowEpoch - sharedRunningSinceEpoch : 0;
  const elapsed = sharedElapsedBeforePauseMs + liveElapsed;
  return Math.max(sharedDurationMs - elapsed, 0);
};

export function useTimer(initialMs = 5 * 60 * 1000) {
  if (sharedDurationMs === 5 * 60 * 1000 && sharedElapsedBeforePauseMs === 0 && sharedRunningSinceEpoch === null) {
    sharedDurationMs = initialMs;
  }

  const [durationMs, setDurationMs] = useState(sharedDurationMs);
  const [remainingMs, setRemainingMs] = useState(computeRemaining());
  const [isRunning, setIsRunning] = useState(Boolean(sharedRunningSinceEpoch));

  useEffect(() => {
    const tick = () => {
      const next = computeRemaining();
      if (next === 0 && sharedRunningSinceEpoch) {
        sharedElapsedBeforePauseMs = sharedDurationMs;
        sharedRunningSinceEpoch = null;
      }

      setDurationMs(sharedDurationMs);
      setRemainingMs(next);
      setIsRunning(Boolean(sharedRunningSinceEpoch));
    };

    tick();
    const id = window.setInterval(tick, 100);
    return () => window.clearInterval(id);
  }, []);

  const start = useCallback(() => {
    if (computeRemaining() <= 0) {
      return;
    }

    if (!sharedRunningSinceEpoch) {
      sharedRunningSinceEpoch = Date.now();
    }

    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    if (!sharedRunningSinceEpoch) {
      return;
    }

    sharedElapsedBeforePauseMs += Date.now() - sharedRunningSinceEpoch;
    sharedRunningSinceEpoch = null;
    setRemainingMs(computeRemaining());
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    sharedRunningSinceEpoch = null;
    sharedElapsedBeforePauseMs = 0;
    setDurationMs(sharedDurationMs);
    setRemainingMs(sharedDurationMs);
    setIsRunning(false);
  }, []);

  const setFromHms = useCallback((hours: number, minutes: number, seconds: number) => {
    const next = toMs(hours, minutes, seconds);
    sharedDurationMs = next;
    sharedElapsedBeforePauseMs = 0;
    sharedRunningSinceEpoch = null;
    setDurationMs(sharedDurationMs);
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
