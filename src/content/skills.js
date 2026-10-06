// Skill matrix. "usedIn" holds project slugs from content/projects.js.
// "note" is shown when a skill is not tied to a listed project.
// "icons" are keys from components/ui/TechIcon.js (unknown keys show a generic chart glyph).

export const skillSummary = {
  direction:
    "Backend developer who also handles data analysis, automation, and the interface on top.",
  body: "I start from the data model and the API, then build what is needed around it: dashboards, workflows, or a clean frontend.",
  proof: [
    { label: "Core", value: "Backend, API, DB" },
    { label: "Support", value: "Data, automation" },
    { label: "Delivery", value: "Build, test, document" },
  ],
};

export const skills = [
  { name: "Python", icons: ["python"], domain: "Backend · Data", usedIn: ["smarthub", "task-management", "air-purifier", "flood-analysis", "netflix-analysis"] },
  { name: "Flask", icons: ["flask"], domain: "Backend", usedIn: ["task-management"] },
  { name: "PHP · Laravel", icons: ["php", "laravel"], domain: "Backend", usedIn: ["nibble", "edunext"] },
  { name: "MySQL", icons: ["mysql"], domain: "Database", usedIn: ["nibble", "edunext"] },
  { name: "PostgreSQL · Supabase", icons: ["postgresql", "supabase"], domain: "Database", usedIn: ["task-management"] },
  { name: "MongoDB", icons: ["mongodb"], domain: "Database · IoT", usedIn: ["air-purifier"] },
  { name: "n8n", icons: ["n8n"], domain: "Automation", usedIn: ["smarthub"] },
  { name: "Docker", icons: ["docker"], domain: "Tooling", usedIn: ["smarthub"] },
  { name: "React / Next.js", icons: ["react", "nextjs"], domain: "Frontend", usedIn: ["smarthub", "task-management", "portfolio-v3", "portfolio-v1"] },
  { name: "Electron", icons: ["electron"], domain: "Desktop", usedIn: ["smarthub"] },
  { name: "Ubidots · Streamlit", icons: ["streamlit"], domain: "IoT · Dashboard", usedIn: ["air-purifier"] },
  { name: "Tableau", icons: ["chart"], domain: "Data viz", usedIn: ["netflix-analysis"] },
  { name: "Git", icons: ["git"], domain: "Tooling", usedIn: [], note: "Every project" },
];

export const softSkills = ["Communication", "Teamwork", "Problem solving", "Time management", "Adaptability"];
