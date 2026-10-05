"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "./Icons";

// The initial theme is applied by the inline script in app/layout.js (no flash).
// This component only reads/writes the data-theme attribute on <html>.
// The visual state (thumb position, active label) is driven by CSS from html[data-theme],
// so it is already correct before hydration; React state only feeds aria-checked.

function subscribe(callback) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getTheme = () => document.documentElement.dataset.theme || "light";

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light");
  const next = theme === "dark" ? "light" : "dark";

  function toggle() {
    const root = document.documentElement;
    root.classList.add("theme-switching");
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked (private mode); the toggle still works for this visit.
    }
    window.setTimeout(() => root.classList.remove("theme-switching"), 320);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Dark theme"
      title={`Switch to ${next} theme`}
      className="theme-switch"
      onClick={toggle}
    >
      <span className="ts-light" aria-hidden="true">
        <Sun />
        Light
      </span>
      <span className="ts-dark" aria-hidden="true">
        <Moon />
        Dark
      </span>
    </button>
  );
}
