# Portfolio v3 — "Workspace"

Monochrome portfolio for Stefanus Marcellino. Design rationale and decisions: [DESIGN.md](./DESIGN.md).

Stack: Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4 (reset only), JavaScript. No UI/animation libraries.

## Commands

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
npm run images -- <file-or-folder>   # compress images into src/assets as WebP
```

## Editing content

All text lives in `src/content/`, components only read from it.

| File | Content |
|---|---|
| `profile.js` | Name, intro, bio, facts, contacts, socials, capability map, navigation |
| `projects.js` | Projects + case file sections. Fields marked `// DUMMY` (year, status, Willify stack) are placeholders |
| `skills.js` | Skill matrix (`usedIn` = project slugs) and soft skills |
| `experience.js` | Timeline entries (organization / competition / education) |

- CV: replace `public/cv.pdf` (currently a dummy made by `scripts/make-dummy-cv.mjs`; delete the script afterwards).
- Project images: add the source file, run `npm run images -- path/to/file.png`, then import it in `projects.js`.
- GitHub calendar on `/about` is fetched from `github.com/users/4CeL/contributions` and revalidated daily; it hides itself if the fetch fails.

## Structure

```
src/
├─ app/          routes (/, /about, /projects, /projects/[slug], /skills, /experience, /contact), 404, sitemap, robots, OG image
├─ components/
│  ├─ shell/     Frame, Header, SideNav, StatusBar, MobileMenu, KeyboardNav
│  ├─ effects/   Loader, DotField, TargetCursor (fine pointer + motion allowed only)
│  ├─ scenes/    PageHeading, ProjectConsole, Timeline, GitHubCalendar
│  └─ ui/        Icons, Logo, ThemeToggle, LiveClock, RotatingText, ApiBlock, CopyButton, CvButton
├─ content/      editable data
├─ lib/          routes, status-bar store, GitHub fetch, site URL
└─ styles/       tokens.css, shell.css, scenes.css (imported by app/globals.css)
```

## Deployment

On Vercel the site URL for metadata/sitemap is read from `VERCEL_PROJECT_PRODUCTION_URL`. Elsewhere set `NEXT_PUBLIC_SITE_URL`.
