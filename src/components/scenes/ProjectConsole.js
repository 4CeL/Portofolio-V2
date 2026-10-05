"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setStatusContext } from "@/lib/status";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";

// Master-detail project browser: list + filters on the left, preview on the right.
// Arrow keys move through the list, Enter opens the case file.
// Below 768px the preview is hidden and every row links straight to the case file.
export default function ProjectConsole({ projects, domains }) {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug);
  const listRef = useRef(null);

  const visible = filter === "all" ? projects : projects.filter((p) => p.domains.includes(filter));
  const active = visible.find((p) => p.slug === activeSlug) ?? visible[0];

  function select(project) {
    setActiveSlug(project.slug);
    setStatusContext("/projects", `${project.category} · ${project.year}`);
  }

  function changeFilter(id) {
    setFilter(id);
    const next = id === "all" ? projects : projects.filter((p) => p.domains.includes(id));
    if (next[0] && !next.some((p) => p.slug === activeSlug)) select(next[0]);
  }

  function onListKey(event) {
    const index = visible.findIndex((p) => p.slug === active?.slug);
    let nextIndex = null;
    if (event.key === "ArrowDown") nextIndex = Math.min(visible.length - 1, index + 1);
    if (event.key === "ArrowUp") nextIndex = Math.max(0, index - 1);
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = visible.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    select(visible[nextIndex]);
    listRef.current?.querySelectorAll(".pj-select")[nextIndex]?.focus();
  }

  return (
    <div className="console reveal" style={{ "--i": 1 }}>
      <aside className="console-index" aria-label="Project list">
        <div className="panel-head">
          <span className="label">Project list</span>
          <strong className="console-count">
            {visible.length} project{visible.length === 1 ? "" : "s"}
          </strong>
        </div>
        <div className="console-filters chips" role="group" aria-label="Filter by domain">
          {domains.map((domain) => (
            <button
              key={domain.id}
              type="button"
              className="chip"
              aria-pressed={filter === domain.id}
              onClick={() => changeFilter(domain.id)}
            >
              {domain.label}
            </button>
          ))}
        </div>
        <ul ref={listRef} className="pj-list" onKeyDown={onListKey}>
          {visible.map((project) => {
            const isActive = project.slug === active?.slug;
            const row = (
              <>
                <span className="pj-meta">
                  <span>{project.year}</span>
                  <span>{project.category}</span>
                </span>
                <strong>{project.title}</strong>
                <em>{project.status}</em>
              </>
            );
            return (
              <li key={project.slug}>
                <button
                  type="button"
                  className="pj-row pj-select"
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => select(project)}
                  onFocus={() => select(project)}
                  onDoubleClick={() => router.push(`/projects/${project.slug}`)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      router.push(`/projects/${project.slug}`);
                    }
                  }}
                >
                  {row}
                </button>
                <Link className="pj-row pj-link" href={`/projects/${project.slug}`}>
                  {row}
                  <ArrowRight className="pj-link-arrow" />
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="console-hint label" aria-hidden="true">
          ↑ ↓ select · Enter open
        </p>
      </aside>

      {active ? (
        <section key={active.slug} className="console-detail" aria-label={`Preview: ${active.title}`}>
          <figure className="pj-figure">
            <Image
              src={active.image}
              alt={`Screenshot of ${active.title}`}
              sizes="(max-width: 1023px) 100vw, 55vw"
              placeholder="blur"
            />
          </figure>
          <div className="pj-body">
            <p className="label">
              {active.year} · {active.category}
            </p>
            <h2 className="pj-title">{active.title}</h2>
            <p className="pj-sub">{active.subtitle}</p>
            <dl className="kv">
              <div>
                <dt>Stack</dt>
                <dd>{active.stack.join(" · ")}</dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>{active.role}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{active.status}</dd>
              </div>
            </dl>
            <div className="actions">
              <Link href={`/projects/${active.slug}`} className="btn btn--solid">
                Open case file <ArrowRight />
              </Link>
              {active.links.github ? (
                <a className="btn" href={active.links.github} target="_blank" rel="noopener noreferrer">
                  GitHub <ArrowUpRight />
                </a>
              ) : null}
            </div>
          </div>
        </section>
      ) : (
        <p className="console-empty label">No projects in this domain yet.</p>
      )}
    </div>
  );
}
