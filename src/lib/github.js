// Reads the public GitHub contribution calendar (no token needed).
// The HTML fragment from /users/<name>/contributions is parsed into weeks of days.
// Cached for a day; returns null on any failure so the panel can simply hide.

const DAY = /<td\b[^>]*class="ContributionCalendar-day"[^>]*>/g;
const ATTR = (name) => new RegExp(`${name}="([^"]*)"`);

export async function getContributions(username) {
  try {
    const res = await fetch(`https://github.com/users/${encodeURIComponent(username)}/contributions`, {
      headers: { "User-Agent": "portfolio-v3 (contribution calendar)" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const html = await res.text();

    // Tooltip text ("3 contributions on May 2nd.") keyed by the cell id.
    const tips = new Map();
    for (const match of html.matchAll(/<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
      tips.set(match[1], match[2].trim());
    }

    const columns = [];
    for (const match of html.matchAll(DAY)) {
      const tag = match[0];
      const date = tag.match(ATTR("data-date"))?.[1];
      const level = Number(tag.match(ATTR("data-level"))?.[1] ?? 0);
      const id = tag.match(ATTR("id"))?.[1] ?? "";
      const pos = id.match(/-(\d+)-(\d+)$/); // contribution-day-component-<weekday>-<week>
      if (!date || !pos) continue;
      const weekday = Number(pos[1]);
      const week = Number(pos[2]);
      (columns[week] ??= []).push({ date, level, weekday, label: tips.get(id) || date });
    }

    const weeks = columns.filter(Boolean).map((days) => days.sort((a, b) => a.weekday - b.weekday));
    if (weeks.length === 0) return null;

    const total = Number(html.match(/([\d,]+)\s+contributions?\s+in the last year/)?.[1]?.replace(/,/g, "") ?? NaN);

    // Month label at the first week that starts a new month.
    const months = [];
    let last = "";
    weeks.forEach((days, index) => {
      const month = new Date(`${days[0].date}T00:00:00Z`).toLocaleString("en-US", { month: "short", timeZone: "UTC" });
      if (month !== last) {
        months.push({ index, month });
        last = month;
      }
    });

    return { weeks, months, total: Number.isFinite(total) ? total : null };
  } catch {
    return null;
  }
}
