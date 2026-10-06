// Technology logos for the skills matrix, from simple-icons (CC0, brand marks belong to their owners).
// Rendered on the server only, so just the paths used here end up in the HTML.
// Icons are monochrome (currentColor); --brand holds the brand colour for the hover state.
import {
  siDocker,
  siElectron,
  siFlask,
  siGit,
  siLaravel,
  siMongodb,
  siMysql,
  siN8n,
  siNextdotjs,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siStreamlit,
  siSupabase,
} from "simple-icons";

const ICONS = {
  docker: siDocker,
  electron: siElectron,
  flask: siFlask,
  git: siGit,
  laravel: siLaravel,
  mongodb: siMongodb,
  mysql: siMysql,
  n8n: siN8n,
  nextjs: siNextdotjs,
  php: siPhp,
  postgresql: siPostgresql,
  python: siPython,
  react: siReact,
  streamlit: siStreamlit,
  supabase: siSupabase,
};

// Not in simple-icons (e.g. Tableau): a plain line-chart glyph in the same 24px grid.
const FALLBACK = {
  title: "Chart",
  path: "M3 3v18h18v-2H5V3H3zm16.3 3.3L14 11.6l-3-3-4.7 4.7 1.4 1.4L11 11.4l3 3 6.7-6.7-1.4-1.4z",
  hex: null,
};

// Very dark or very light brand colours (Next.js is #000000) would vanish in one of the themes,
// so those fall back to the ink colour.
function brandColor(hex) {
  if (!hex) return "var(--ink)";
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 0.12 || luminance > 0.88 ? "var(--ink)" : `#${hex}`;
}

export default function TechIcon({ name }) {
  const icon = ICONS[name] ?? FALLBACK;
  return (
    <svg
      className="tech-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      style={{ "--brand": brandColor(icon.hex) }}
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}
