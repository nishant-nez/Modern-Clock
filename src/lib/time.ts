export const pad = (value: number) => String(value).padStart(2, "0");

export function formatDuration(ms: number, withDays = false) {
  const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (withDays) {
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function formatClockTime(date: Date, timeFormat: "12h" | "24h", showSeconds: boolean) {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: showSeconds ? "2-digit" : undefined,
    hour12: timeFormat === "12h",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function getUtcOffsetLabel(timeZone: string) {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(now);

  return parts.find((part) => part.type === "timeZoneName")?.value ?? "UTC";
}
