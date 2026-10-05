"use client";

import { useEffect, useRef } from "react";

// First-visit loader: a 3x3 Rubik's cube that solves itself above a loading bar.
//
// How it works
//  - The cube is rendered (server + client, identical) in a scrambled state.
//  - On mount the solution (the scramble reversed) is played one layer turn at a time
//    with the Web Animations API. Each turn advances the bar; the final turn waits for
//    window "load", so 100% means the page really finished loading.
//  - When solved: small pop, then the loader wipes up and html[data-loader="skip"] hides it.
//  - Skipped for the rest of the session (sessionStorage) and for prefers-reduced-motion
//    (see bootScript in app/layout.js). Click or any key skips it.
//  - If JS never runs, CSS hides the loader after ~6s (.loader animation in shell.css).

const S = 26; // cubie size in px, keep in sync with --s in shell.css
const TURN_MS = 260;
const AXIS_INDEX = { x: 0, y: 1, z: 2 };
const AXIS_VECTOR = { x: "1,0,0", y: "0,1,0", z: "0,0,1" };

// Monochrome sticker tones per face (outward normal in the solved cube).
const FACES = [
  { cls: "f-pz", axis: 2, sign: 1, color: "#d4d4cf" }, // front
  { cls: "f-nz", axis: 2, sign: -1, color: "#7e7e7a" }, // back
  { cls: "f-px", axis: 0, sign: 1, color: "#a9a9a4" }, // right
  { cls: "f-nx", axis: 0, sign: -1, color: "#57574f" }, // left
  { cls: "f-ny", axis: 1, sign: -1, color: "#f6f6f3" }, // up (CSS y points down)
  { cls: "f-py", axis: 1, sign: 1, color: "#30302d" }, // down
];

// [axis, layer (-1|1), direction (+1|-1)] — 90° turns, CSS rotation convention.
const SCRAMBLE = [
  ["y", -1, 1],
  ["x", 1, 1],
  ["z", 1, -1],
  ["x", -1, -1],
  ["y", 1, 1],
  ["z", -1, 1],
  ["x", 1, -1],
  ["y", -1, -1],
];
const SOLUTION = [...SCRAMBLE].reverse().map(([axis, layer, dir]) => [axis, layer, -dir]);

const IDENTITY = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

// Rotation matrix for 90° * dir, matching CSS rotateX/Y/Z (y axis points down).
function rotation(axis, dir) {
  const s = dir;
  if (axis === "x") return [[1, 0, 0], [0, 0, -s], [0, s, 0]];
  if (axis === "y") return [[0, 0, s], [0, 1, 0], [-s, 0, 0]];
  return [[0, -s, 0], [s, 0, 0], [0, 0, 1]];
}

const multiply = (A, B) => A.map((row) => B[0].map((_, j) => row[0] * B[0][j] + row[1] * B[1][j] + row[2] * B[2][j]));
const transform = (A, v) => A.map((row) => row[0] * v[0] + row[1] * v[1] + row[2] * v[2]);
const clean = (n) => (Object.is(n, -0) ? 0 : n);

function solvedCube() {
  const cubies = [];
  for (let x = -1; x <= 1; x++)
    for (let y = -1; y <= 1; y++)
      for (let z = -1; z <= 1; z++) cubies.push({ home: [x, y, z], p: [x, y, z], R: IDENTITY });
  return cubies;
}

function turn(cubies, [axis, layer, dir]) {
  const M = rotation(axis, dir);
  const a = AXIS_INDEX[axis];
  return cubies.map((c) =>
    c.p[a] === layer ? { ...c, p: transform(M, c.p).map(clean), R: multiply(M, c.R).map((r) => r.map(clean)) } : c
  );
}

function toCss({ R, p }) {
  return `matrix3d(${R[0][0]},${R[1][0]},${R[2][0]},0,${R[0][1]},${R[1][1]},${R[2][1]},0,${R[0][2]},${R[1][2]},${R[2][2]},0,${p[0] * S},${p[1] * S},${p[2] * S},1)`;
}

const SCRAMBLED = SCRAMBLE.reduce(turn, solvedCube());

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function finish() {
  document.documentElement.dataset.loader = "skip";
}

export default function Loader() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    const html = document.documentElement;
    if (!root || html.dataset.loader === "skip") return;

    try {
      sessionStorage.setItem("loader-seen", "1");
    } catch {
      // ignore blocked storage
    }

    // Hydrated so late that the CSS safety net is already running: just get out of the way.
    if (performance.now() > 5200) {
      finish();
      return;
    }

    root.classList.add("is-live");
    const cubieEls = [...root.querySelectorAll(".cubie")];
    const fill = root.querySelector(".loader-fill");
    const pct = root.querySelector(".loader-pct");
    let cancelled = false;
    let leaving = false;
    let running = [];

    const setProgress = (value) => {
      fill.style.transform = `scaleX(${value})`;
      pct.textContent = `${Math.round(value * 100)}%`;
    };

    const leave = () => {
      if (leaving) return;
      leaving = true;
      running.forEach((animation) => animation.finish());
      root.classList.add("is-leaving");
    };

    const onAnimationEnd = (event) => {
      if (event.target === root && event.animationName === "loader-out") finish();
    };

    const pageLoaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));

    root.addEventListener("animationend", onAnimationEnd);
    root.addEventListener("click", leave);
    window.addEventListener("keydown", leave);

    (async () => {
      let state = SCRAMBLED;
      await wait(300);
      for (let i = 0; i < SOLUTION.length; i++) {
        if (i === SOLUTION.length - 1) await pageLoaded;
        if (cancelled || leaving) return;

        const move = SOLUTION[i];
        const [axis, layer, dir] = move;
        const a = AXIS_INDEX[axis];
        running = [];
        state.forEach((cubie, index) => {
          if (cubie.p[a] !== layer) return;
          const base = toCss(cubie);
          running.push(
            cubieEls[index].animate(
              [
                { transform: `rotate3d(${AXIS_VECTOR[axis]},0deg) ${base}` },
                { transform: `rotate3d(${AXIS_VECTOR[axis]},${dir * 90}deg) ${base}` },
              ],
              { duration: TURN_MS, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "forwards" }
            )
          );
        });
        setProgress((i + 1) / SOLUTION.length);

        await Promise.all(running.map((animation) => animation.finished.catch(() => {})));
        if (cancelled) return;

        // Bake the turn into each cubie's matrix, then drop the animation.
        state = turn(state, move);
        state.forEach((cubie, index) => {
          cubieEls[index].style.transform = toCss(cubie);
        });
        running.forEach((animation) => animation.cancel());
        running = [];
        await wait(40);
      }
      if (cancelled || leaving) return;
      root.classList.add("is-solved");
      await wait(450);
      leave();
    })();

    return () => {
      cancelled = true;
      running.forEach((animation) => animation.cancel());
      root.removeEventListener("animationend", onAnimationEnd);
      root.removeEventListener("click", leave);
      window.removeEventListener("keydown", leave);
    };
  }, []);

  return (
    <div ref={ref} className="loader" aria-hidden="true">
      <div className="loader-inner">
        <div className="rubik">
          <div className="rubik-scene">
            {SCRAMBLED.map((cubie) => (
              <div key={cubie.home.join(",")} className="cubie" style={{ transform: toCss(cubie) }}>
                {FACES.map((face) => {
                  // Sticker only on faces that pointed outward in the solved cube.
                  const outward = cubie.home[face.axis] === face.sign;
                  return (
                    <i
                      key={face.cls}
                      className={outward ? `${face.cls} st` : face.cls}
                      style={outward ? { "--c": face.color } : undefined}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="loader-progress">
          <div className="loader-bar">
            <span className="loader-fill" />
          </div>
          <div className="loader-meta">
            <span>Hello · loading workspace</span>
            <span className="loader-pct">0%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
