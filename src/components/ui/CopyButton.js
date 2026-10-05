"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "./Icons";

export default function CopyButton({ value, label = "Copy" }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be unavailable (insecure context); the value is still visible to select.
    }
  }

  return (
    <button type="button" className="copy-btn" onClick={copy} aria-label={copied ? "Copied" : `${label} ${value}`}>
      {copied ? <Check /> : <Copy />}
      <span aria-hidden="true">{copied ? "Copied" : label}</span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}
