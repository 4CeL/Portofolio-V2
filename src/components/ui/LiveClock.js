"use client";

import { useSyncExternalStore } from "react";

// Shared ticker so every clock on the page updates from one interval.
const listeners = new Set();
let timer = null;

function subscribe(listener) {
  listeners.add(listener);
  if (!timer) timer = setInterval(() => listeners.forEach((l) => l()), 1000);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      clearInterval(timer);
      timer = null;
    }
  };
}

const formatters = new Map();
function format(timeZone) {
  if (!formatters.has(timeZone)) {
    formatters.set(
      timeZone,
      new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", hour12: false })
    );
  }
  return formatters.get(timeZone).format(new Date());
}

export default function LiveClock({ timeZone = "Asia/Jakarta", label = "WIB" }) {
  const time = useSyncExternalStore(
    subscribe,
    () => format(timeZone),
    () => "--:--"
  );
  return (
    <span>
      {label} <time suppressHydrationWarning>{time}</time>
    </span>
  );
}
