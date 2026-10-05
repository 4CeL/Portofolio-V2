import { getContributions } from "@/lib/github";
import { ArrowUpRight } from "@/components/ui/Icons";

const CELL = 10;
const GAP = 3;
const STEP = CELL + GAP;
const TOP = 16; // room for month labels
const LEFT = 26; // room for weekday labels
// Contribution levels 0–4; colours (GitHub greens, per theme) live in scenes.css as .gh-l0…4.
const LEVELS = [0, 1, 2, 3, 4];

export default async function GitHubCalendar({ username, url }) {
  const data = await getContributions(username);
  if (!data) return null;

  const width = LEFT + data.weeks.length * STEP;
  const height = TOP + 7 * STEP;

  return (
    <section className="panel gh reveal" style={{ "--i": 3 }} aria-labelledby="gh-title">
      <div className="panel-head">
        <h2 id="gh-title" className="label">
          GitHub contributions
        </h2>
        <a className="icon-btn" href={url} target="_blank" rel="noopener noreferrer" aria-label={`GitHub profile ${username}`}>
          <ArrowUpRight />
        </a>
      </div>
      <div className="gh-scroll">
        <svg
          className="gh-svg"
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`Contribution calendar for the last year${data.total != null ? `: ${data.total} contributions` : ""}`}
        >
          {data.months.map(({ index, month }) => (
            <text key={`${month}-${index}`} x={LEFT + index * STEP} y={10} className="gh-text">
              {month}
            </text>
          ))}
          {["Mon", "Wed", "Fri"].map((day, i) => (
            <text key={day} x={0} y={TOP + (i * 2 + 1) * STEP + CELL - 1} className="gh-text">
              {day}
            </text>
          ))}
          {data.weeks.map((days, week) =>
            days.map((day) => (
              <rect
                key={day.date}
                x={LEFT + week * STEP}
                y={TOP + day.weekday * STEP}
                width={CELL}
                height={CELL}
                rx={2}
                className={`gh-cell gh-l${LEVELS.includes(day.level) ? day.level : 0}`}
              >
                <title>{day.label}</title>
              </rect>
            ))
          )}
        </svg>
      </div>
      <div className="gh-foot">
        <span>{data.total != null ? `${data.total} contributions` : "Contributions"} · last year</span>
        <span className="gh-legend" aria-hidden="true">
          Less
          {LEVELS.map((level) => (
            <i key={level} className={`gh-l${level}`} />
          ))}
          More
        </span>
      </div>
    </section>
  );
}
