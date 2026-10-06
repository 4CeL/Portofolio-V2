// Parses project years written as "2025", "2024 - 2025", "2024–2025", or "2023 - now".
// Returns { start, end } as numbers, or null when no year is found.
export function parseYears(value) {
  const text = String(value ?? "");
  const years = (text.match(/\d{4}/g) ?? []).map(Number);
  if (years.length === 0) return null;
  const ongoing = /\b(now|present|ongoing)\b/i.test(text);
  return {
    start: Math.min(...years),
    end: ongoing ? new Date().getFullYear() : Math.max(...years),
  };
}
