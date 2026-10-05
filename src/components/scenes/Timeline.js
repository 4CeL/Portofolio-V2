"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Plus } from "@/components/ui/Icons";

// Experience split into tabs by type (no "All" view). The first tab is shown by default.
export default function Timeline({ entries, types }) {
  const [active, setActive] = useState(types[0]?.id);
  const visible = entries.filter((entry) => entry.type === active);
  const activeLabel = types.find((type) => type.id === active)?.label ?? "";

  return (
    <div className="timeline-wrap reveal" style={{ "--i": 1 }}>
      <div className="timeline-bar">
        <div className="chips" role="group" aria-label="Experience type">
          {types.map((type) => {
            const count = entries.filter((entry) => entry.type === type.id).length;
            return (
              <button
                key={type.id}
                type="button"
                className="chip"
                aria-pressed={active === type.id}
                onClick={() => setActive(type.id)}
              >
                {type.label}
                <span className="chip-count">{count}</span>
              </button>
            );
          })}
        </div>
        <span className="label" aria-live="polite">
          {visible.length} entr{visible.length === 1 ? "y" : "ies"}
        </span>
      </div>

      {visible.length ? (
        <ol className="timeline" key={active}>
          {visible.map((entry, index) => (
            <li key={entry.id} className="tl-item">
              <details open={index === 0}>
                <summary>
                  <span className="tl-period">{entry.period}</span>
                  <span className="tl-main">
                    <strong>{entry.role}</strong>
                    <span>{entry.org}</span>
                  </span>
                  <Plus className="tl-toggle" />
                </summary>
                <div className="tl-body">
                  <ul className="dash-list">
                    {entry.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  {entry.link ? (
                    <Link href={entry.link} className="tl-link">
                      Related project <ArrowRight />
                    </Link>
                  ) : null}
                  {entry.credential ? (
                    <a href={entry.credential} className="tl-link" target="_blank" rel="noopener noreferrer">
                      View credential <ArrowUpRight />
                    </a>
                  ) : null}
                </div>
              </details>
            </li>
          ))}
        </ol>
      ) : (
        <p className="tl-empty label">No {activeLabel.toLowerCase()} entries yet.</p>
      )}
    </div>
  );
}
