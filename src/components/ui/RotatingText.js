"use client";

import { useEffect, useState } from "react";

// Inverted pill whose word changes every few seconds.
// Screen readers get the full list once via the visually hidden text.
export default function RotatingText({ words, interval = 2600 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="pill">
      <span className="sr-only">{words.join(", ")}</span>
      <span key={index} className="pill-word" aria-hidden="true">
        {words[index]}
      </span>
    </span>
  );
}
