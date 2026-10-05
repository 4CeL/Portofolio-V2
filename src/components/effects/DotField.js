"use client";

import { useEffect, useRef } from "react";

// Grid of dots behind the frame that drifts away from the pointer.
// Only runs on fine pointers with motion allowed; otherwise the CSS dot texture stays.
const SPACING = 18;
const RADIUS = 150;
const PUSH = 14;

export default function DotField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const finePointer = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canvas || !finePointer.matches || reduced.matches) return;

    const ctx = canvas.getContext("2d");
    const backdrop = canvas.parentElement;
    backdrop.classList.add("has-dotfield");

    let width = 0;
    let height = 0;
    let dots = [];
    let color = "rgb(17 17 17 / 0.13)";
    let pointer = { x: -9999, y: -9999 };
    let frame = 0;
    let running = false;

    const readColor = () => {
      color = getComputedStyle(document.documentElement).getPropertyValue("--dot").trim() || color;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = SPACING / 2; y < height; y += SPACING) {
        for (let x = SPACING / 2; x < width; x += SPACING) {
          dots.push({ x, y, ox: 0, oy: 0 });
        }
      }
      draw();
    };

    // Returns true while any dot is still moving, so the loop can stop when idle.
    const step = () => {
      let moving = false;
      for (const dot of dots) {
        const dx = dot.x - pointer.x;
        const dy = dot.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        let tx = 0;
        let ty = 0;
        if (dist < RADIUS && dist > 0.001) {
          const force = (1 - dist / RADIUS) ** 2 * PUSH;
          tx = (dx / dist) * force;
          ty = (dy / dist) * force;
        }
        dot.ox += (tx - dot.ox) * 0.18;
        dot.oy += (ty - dot.oy) * 0.18;
        if (Math.abs(tx - dot.ox) > 0.05 || Math.abs(ty - dot.oy) > 0.05) moving = true;
      }
      return moving;
    };

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      ctx.beginPath();
      for (const dot of dots) {
        ctx.moveTo(dot.x + dot.ox + 1, dot.y + dot.oy);
        ctx.arc(dot.x + dot.ox, dot.y + dot.oy, 1, 0, Math.PI * 2);
      }
      ctx.fill();
    }

    const loop = () => {
      const moving = step();
      draw();
      if (moving) {
        frame = requestAnimationFrame(loop);
      } else {
        running = false;
      }
    };

    const kick = () => {
      if (running || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const onMove = (event) => {
      pointer = { x: event.clientX, y: event.clientY };
      kick();
    };
    const onLeave = () => {
      pointer = { x: -9999, y: -9999 };
      kick();
    };

    // Repaint when the theme changes so the dot colour follows --dot.
    const themeObserver = new MutationObserver(() => {
      readColor();
      draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    readColor();
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      backdrop.classList.remove("has-dotfield");
    };
  }, []);

  return <canvas ref={canvasRef} className="dotfield" aria-hidden="true" />;
}
