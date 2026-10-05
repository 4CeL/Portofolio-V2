"use client";

import { useEffect, useRef } from "react";

// Corner brackets that follow the pointer and lock onto interactive elements.
// The native cursor stays visible; this is an extra layer for fine pointers only.
const TARGETS = "a, button, summary, [data-cursor]";
const IDLE = 24;
const PAD = 6;

export default function TargetCursor() {
  const boxRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;
    const dot = dotRef.current;
    const fine = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!box || !dot || !fine.matches || reduced.matches) return;

    let pointer = { x: 0, y: 0 };
    const current = { x: 0, y: 0, w: IDLE, h: IDLE };
    let target = null;
    let frame = 0;

    const goal = () => {
      if (target && target.isConnected) {
        const r = target.getBoundingClientRect();
        return { x: r.left - PAD, y: r.top - PAD, w: r.width + PAD * 2, h: r.height + PAD * 2 };
      }
      return { x: pointer.x - IDLE / 2, y: pointer.y - IDLE / 2, w: IDLE, h: IDLE };
    };

    const loop = () => {
      const g = goal();
      const ease = 0.22;
      current.x += (g.x - current.x) * ease;
      current.y += (g.y - current.y) * ease;
      current.w += (g.w - current.w) * ease;
      current.h += (g.h - current.h) * ease;
      box.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      box.style.width = `${current.w}px`;
      box.style.height = `${current.h}px`;
      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
      frame = requestAnimationFrame(loop);
    };

    const onMove = (event) => {
      pointer = { x: event.clientX, y: event.clientY };
      target = event.target instanceof Element ? event.target.closest(TARGETS) : null;
      if (!box.classList.contains("is-visible")) {
        Object.assign(current, goal());
        box.classList.add("is-visible");
      }
    };
    const onLeave = () => box.classList.remove("is-visible");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={boxRef} className="tcursor" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div ref={dotRef} className="tcursor-dot" aria-hidden="true" />
    </>
  );
}
