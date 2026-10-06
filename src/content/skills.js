// Skill matrix. "usedIn" holds project slugs from content/projects.js.
// "note" is shown when a skill is not tied to a listed project.

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
  { name: "Python", domain: "Backend · Data", usedIn: ["task-management", "air-purifier", "flood-analysis", "netflix-analysis"] },
  { name: "Flask", domain: "Backend", usedIn: ["task-management"] },
  { name: "MySQL", domain: "Database", usedIn: [], note: "Internship work" },
  { name: "PostgreSQL · Supabase", domain: "Database", usedIn: ["task-management"] },
  { name: "MongoDB", domain: "Database · IoT", usedIn: ["air-purifier"] },
  { name: "n8n", domain: "Automation", usedIn: ["smarthub"] },
  { name: "Docker", domain: "Tooling", usedIn: ["smarthub"] },
  { name: "React / Next.js", domain: "Frontend", usedIn: ["smarthub", "task-management", "portfolio-v1"] },
  { name: "Electron", domain: "Desktop", usedIn: ["smarthub"] },
  { name: "Ubidots · Streamlit", domain: "IoT · Dashboard", usedIn: ["air-purifier"] },
  { name: "Tableau", domain: "Data viz", usedIn: ["flood-analysis", "netflix-analysis"] },
  { name: "Git", domain: "Tooling", usedIn: [], note: "Every project" },
];

export const softSkills = ["Communication", "Teamwork", "Problem solving", "Time management", "Adaptability"];
