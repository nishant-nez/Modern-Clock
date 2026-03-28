"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export interface Lap {
  id: number;
  elapsedMs: number;
}

let sharedElapsedBeforePauseMs = 0;
let sharedRunningSinceEpoch: number | null = null;
let sharedLaps: Lap[] = [];

const computeElapsed = (nowEpoch = Date.now()) => {
  const live = sharedRunningSinceEpoch ? nowEpoch - sharedRunningSinceEpoch : 0;
  return sharedElapsedBeforePauseMs + live;
};

export function useStopwatch() {
  const [elapsedMs, setElapsedMs] = useState(computeElapsed());
  const [isRunning, setIsRunning] = useState(Boolean(sharedRunningSinceEpoch));
  const [laps, setLaps] = useState<Lap[]>(sharedLaps);

  useEffect(() => {
    const tick = () => {
      setElapsedMs(computeElapsed());
      setIsRunning(Boolean(sharedRunningSinceEpoch));
      setLaps([...sharedLaps]);
    };

    tick();
    const id = window.setInterval(tick, 50);
    return () => window.clearInterval(id);
  }, []);

  const start = useCallback(() => {
    if (sharedRunningSinceEpoch) {
      return;
    }

    sharedRunningSinceEpoch = Date.now();
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    if (!sharedRunningSinceEpoch) {
      return;
    }

    sharedElapsedBeforePauseMs += Date.now() - sharedRunningSinceEpoch;
    sharedRunningSinceEpoch = null;
    setElapsedMs(sharedElapsedBeforePauseMs);
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    sharedRunningSinceEpoch = null;
    sharedElapsedBeforePauseMs = 0;
    sharedLaps = [];
    setElapsedMs(0);
    setLaps([]);
    setIsRunning(false);
  }, []);

  const lap = useCallback(() => {
    const currentElapsed = computeElapsed();
    sharedLaps = [{ id: sharedLaps.length + 1, elapsedMs: currentElapsed }, ...sharedLaps];
    setLaps([...sharedLaps]);
    setElapsedMs(currentElapsed);
  }, []);

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
