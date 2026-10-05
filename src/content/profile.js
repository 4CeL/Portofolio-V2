// Personal info, links, and copy used across the site.
// Edit text here; components read from this file.

export const profile = {
  name: "Stefanus Marcellino",
  shortName: "Stefanus",
  initials: "SM",
  role: "Backend Developer Intern & Computer Science Student",
  headline: "Backend developer.",
  location: "Tangerang, Indonesia",
  timezone: "Asia/Jakarta",
  timezoneLabel: "WIB",
  status: "Open to internship",
  intro:
    "Backend developer intern & CS student at BINUS. I build efficient backend systems, RESTful APIs, and data-driven applications for real-world problems.",
  rotatingWords: ["RESTful APIs", "web app", "automation flows", "backend systems"],
  bio: [
    "I am currently pursuing a degree in Computer Science, where I have developed a strong foundation in software engineering principles, algorithms, and system design. My main focus is on backend development, where I love architecting robust databases and creating seamless API integrations.",
    "Beyond coding, I am a continuous learner who stays updated with the latest industry trends. I thrive in collaborative environments and am always eager to tackle complex challenges that push my skills to the next level.",
  ],
  facts: [
    { key: "Study", value: "Computer Science, BINUS · 2023–now" },
    { key: "Focus", value: "Backend, database, data analytics" },
    { key: "Based", value: "Tangerang, Indonesia" },
    { key: "Coding", value: "2+ years" },
    { key: "Projects", value: "5+ completed" },
  ],
  // Shown in the hero "GET /api/stefanus" block.
  api: {
    role: "Backend Intern",
    study: "Computer Science @ BINUS",
    based: "Tangerang",
    stack: ["python", "mysql", "next.js", "n8n"],
    open_to_work: true,
  },
  cv: "/cv.pdf",
  github: { username: "4CeL", url: "https://github.com/4CeL" },
};

export const contacts = [
  {
    id: "email",
    label: "Email",
    value: "stefanusmarcellino18@gmail.com",
    href: "mailto:stefanusmarcellino18@gmail.com",
    copy: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+62 858 8235 9794",
    href: "https://wa.me/6285882359794",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "in/stefanus-marcellino",
    href: "https://www.linkedin.com/in/stefanus-marcellino/",
    external: true,
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/4CeL",
    href: "https://github.com/4CeL",
    external: true,
  },
  {
    id: "location",
    label: "Location",
    value: "Tangerang, Indonesia",
  },
];

// Icons in the header (see components/ui/Icons.js for the matching SVGs).
export const socials = [
  { id: "github", label: "GitHub", href: "https://github.com/4CeL" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/stefanus-marcellino/" },
  { id: "email", label: "Email", href: "mailto:stefanusmarcellino18@gmail.com" },
];

export const capabilities = [
  {
    label: "Backend",
    title: "API & systems",
    body: "REST endpoints, service logic, and database schemas built to stay reliable.",
    tools: "Python · Flask · MySQL",
  },
  {
    label: "Data",
    title: "Analysis & ML",
    body: "Cleaning raw datasets, exploring patterns, and training simple predictive models.",
    tools: "Python · Colab · Tableau",
  },
  {
    label: "Automation",
    title: "Workflow systems",
    body: "Repetitive routines turned into integrations between apps and services.",
    tools: "n8n · Docker · Google APIs",
  },
  {
    label: "Frontend",
    title: "Interfaces",
    body: "Responsive screens and dashboards that sit on top of the backend.",
    tools: "React · Next.js · Tailwind",
  },
];

export const navigation = [
  { href: "/", label: "Home", key: "1" },
  { href: "/about", label: "About", key: "2" },
  { href: "/projects", label: "Projects", key: "3" },
  { href: "/skills", label: "Skills", key: "4" },
  { href: "/experience", label: "Experience", key: "5" },
  { href: "/contact", label: "Contact", key: "6" },
];
