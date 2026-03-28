"use client";

import { useEffect, useMemo, useState } from "react";

export interface UseClockOptions {
  smooth?: boolean;
  timeZone?: string;
}

export function useClock(options?: UseClockOptions) {
  const smooth = options?.smooth ?? false;
  const timeZone = options?.timeZone;
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    if (!smooth) {
      const tick = () => {
        const current = new Date();
        setNow(current);
        const delay = 1000 - current.getMilliseconds();
        timeoutId = window.setTimeout(tick, delay);
      };

      let timeoutId = window.setTimeout(tick, 0);
      return () => window.clearTimeout(timeoutId);
    }

    let frameId = 0;
    const loop = () => {
      setNow(new Date());
      frameId = window.requestAnimationFrame(loop);
    };

    frameId = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(frameId);
  }, [smooth]);

  const dateInZone = useMemo(() => {
    if (!timeZone) {
      return now;
    }

    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).formatToParts(now);

    const get = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === type)?.value ?? 0);

    return new Date(
      get("year"),
      get("month") - 1,
      get("day"),
      get("hour"),
      get("minute"),
      get("second"),
      now.getMilliseconds(),
    );
  }, [now, timeZone]);

  return { now: dateInZone };
}
