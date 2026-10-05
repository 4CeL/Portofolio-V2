// Timeline entries, newest first. type: organization | competition | education | certificate
// Optional fields: link (internal project page), credential (external certificate URL).

// Tab order on /experience. The first one is shown by default.
export const experienceTypes = [
  { id: "organization", label: "Organization" },
  { id: "competition", label: "Competition" },
  { id: "education", label: "Education" },
  { id: "certificate", label: "Certificate" },
];

export const experience = [
  {
    id: "himti-gm",
    type: "organization",
    period: "2025 – 2026",
    role: "General Manager of 1st Commission",
    org: "HIMTI (Himpunan Mahasiswa Teknik Informatika)",
    points: [
      "Led a team of 100+ members across 2 divisions to organize tech events, workshops, and supplementary classes.",
      "Executed the commission's program events such as seminars, workshops, supplementary classes, and more.",
    ],
  },
  {
    id: "hilet-2025",
    type: "organization",
    period: "2025",
    role: "Director & Technical Coordinator, HILET 2025",
    org: "HIMTI",
    points: [
      "Managed the organizing committee through all stages of the event and directed the program on-site on the main day.",
      "Oversaw all technical requirements, ensuring equipment was prepared and ran smoothly during the live event.",
    ],
  },
  {
    id: "sic",
    type: "competition",
    period: "2024 – 2025",
    role: "Top 40 Finalist",
    org: "Samsung Innovation Campus",
    points: [
      "Selected from a competitive pool of applicants for advanced AI training and project development.",
      "Built the Portable Automatic Air Purifier with my team (IoT and database).",
    ],
    link: "/projects/air-purifier",
  },
  {
    id: "sesvent-2024",
    type: "organization",
    period: "2024",
    role: "Director & Event Vice Coordinator, SESVENT 2024",
    org: "HIMTI",
    points: [
      "Managed the organizing committee through all stages of the event and directed the program on-site on the main day.",
      "Assisted the Event Coordinator in supervising the event division so all tasks were completed on schedule.",
    ],
  },
  {
    id: "techno-2024",
    type: "organization",
    period: "2024",
    role: "Director, TECHNO 2024",
    org: "HIMTI",
    points: [
      "Led the entire event, coordinating multiple divisions, overseeing planning and execution, and resolving real-time challenges.",
    ],
  },
  {
    id: "binus",
    type: "education",
    period: "2023 – now",
    role: "Bachelor of Computer Science",
    org: "Universitas Bina Nusantara (BINUS)",
    points: [
      "Focusing on database technology, data science, and data analytics.",
      "Committee member of HIMTI.",
    ],
  },
  {
    id: "smak",
    type: "education",
    period: "2019 – 2022",
    role: "High School, Natural Science",
    org: "SMAK Penabur Harapan Indah",
    points: ["Achieved an average score of 89.", "Member of MPK (Majelis Perwakilan Kelas)."],
  },
  // DUMMY: replace with a real certificate (add `credential: "https://..."` to show a link).
  {
    id: "certificate-placeholder",
    type: "certificate",
    period: "2025",
    role: "Certificate title",
    org: "Issuing organization",
    points: ["Placeholder entry. Replace it in src/content/experience.js."],
  },
];
