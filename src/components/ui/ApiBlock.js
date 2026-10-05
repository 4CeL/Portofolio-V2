"use client";

import { useEffect, useState } from "react";

// "GET /api/stefanus" response that types itself once.
// A hidden full copy reserves the final size so nothing shifts while typing.
export default function ApiBlock({ endpoint, data }) {
  // Pretty JSON, but keep short arrays on one line so the block stays compact.
  const json = JSON.stringify(data, null, 2).replace(/\[\s+([^\]]*?)\s+\]/g, (_, inner) => `[${inner.replace(/\s*\n\s*/g, " ")}]`);
  const [count, setCount] = useState(0);
  const done = count >= json.length;

  useEffect(() => {
    const html = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let typed = 0;
    let interval = 0;
    let start = 0;

    const type = () => {
      interval = window.setInterval(
        () => {
          typed = reduced ? json.length : Math.min(json.length, typed + 3);
          setCount(typed);
          if (typed >= json.length) window.clearInterval(interval);
        },
        reduced ? 0 : 18
      );
    };
    // Start shortly after the loader is gone (html[data-loader="skip"]) so the typing is seen.
    const schedule = () => {
      start = window.setTimeout(type, reduced ? 0 : 450);
    };

    let observer = null;
    if (html.dataset.loader === "skip") {
      schedule();
    } else {
      observer = new MutationObserver(() => {
        if (html.dataset.loader !== "skip") return;
        observer.disconnect();
        schedule();
      });
      observer.observe(html, { attributes: true, attributeFilter: ["data-loader"] });
    }

    return () => {
      observer?.disconnect();
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [json]);

  return (
    <figure className="api-block">
      <figcaption className="api-head">
        <span>
          <strong>GET</strong> {endpoint}
        </span>
        <span>200 OK · 42ms</span>
      </figcaption>
      <pre className="api-body" aria-hidden="true">
        <span className="api-ghost">{json}</span>
        <span className="api-typed">
          {json.slice(0, count)}
          <span className={done ? "api-caret is-done" : "api-caret"} />
        </span>
      </pre>
      <p className="sr-only">
        {Object.entries(data)
          .map(([key, value]) => `${key.replace(/_/g, " ")}: ${Array.isArray(value) ? value.join(", ") : String(value)}`)
          .join(". ")}
      </p>
    </figure>
  );
}
