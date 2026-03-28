"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface Lap {
  id: number;
  elapsedMs: number;
}

export function useStopwatch() {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
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

      const next = offsetRef.current + (performance.now() - startedAtRef.current);
      setElapsedMs(next);
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isRunning]);

  const start = useCallback(() => {
    if (isRunning) {
      return;
    }

    startedAtRef.current = performance.now();
    setIsRunning(true);
  }, [isRunning]);

  const stop = useCallback(() => {
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
    setElapsedMs(0);
    setLaps([]);
    setIsRunning(false);
  }, []);

  const lap = useCallback(() => {
    setLaps((current) => [{ id: current.length + 1, elapsedMs }, ...current]);
  }, [elapsedMs]);

  const fastest = useMemo(() => {
    if (!laps.length) {
      return null;
    }

    return Math.min(...laps.map((entry) => entry.elapsedMs));
  }, [laps]);

  const slowest = useMemo(() => {
    if (!laps.length) {
      return null;
    }

    return Math.max(...laps.map((entry) => entry.elapsedMs));
  }, [laps]);

  return {
    elapsedMs,
    isRunning,
    laps,
    fastest,
    slowest,
    start,
    stop,
    reset,
    lap,
  };
}
