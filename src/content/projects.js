// Project data. Content comes from portfolio v1 (src/data/projects.js).
// Fields marked "// DUMMY" are placeholders: replace them with the real values.
//
// Shape:
// slug, title, subtitle, year, category, domains[], status, role, image, gallery[],
// overview, problem, solution, features[], howItWorks[{ title, desc }],
// contribution, challenges, stack[], links { github, demo }, draft

import airPurifier from "@/assets/streamlit.webp"; // Streamlit dashboard (from src/assets/streamlit.jpg)
import taskflow from "@/assets/taskflow.webp"; // from src/assets/taskflow.jpg
import ubidots from "@/assets/ubidots.webp";
import smarthub from "@/assets/smarthub.webp";
import portfolio from "@/assets/portofolio.webp";
import netflix from "@/assets/tableu-visualitation.webp";
import flood from "@/assets/graph.webp";
import willify from "@/assets/willify.webp";

export const domains = [
  { id: "all", label: "All" },
  { id: "automation", label: "Automation" },
  { id: "iot", label: "IoT" },
  { id: "data", label: "Data" },
  { id: "web", label: "Web" },
];

export const projects = [
  {
    slug: "smarthub",
    title: "SmartHub",
    subtitle:
      "A centralized platform for livestream scheduling, content management, and workflow automation.",
    year: "2026",
    category: "Automation Platform",
    domains: ["automation", "web"],
    status: "Active development",
    role: "Integration & automation",
    image: smarthub,
    overview:
      "SmartHub is a centralized digital platform that brings together livestream scheduling, song and chord management, AI-powered content generation, and content automation into a single workspace. The platform integrates services such as Canva, YouTube, Google Drive, and n8n to simplify and automate recurring content workflows.",
    problem:
      "Managing livestreams and digital content across multiple platforms can involve repetitive manual tasks, scattered information, and switching between different tools. This makes it difficult to manage schedules, content assets, and supporting materials efficiently from a single place.",
    solution:
      "SmartHub provides a centralized workspace that combines livestream scheduling, song and chord data, AI-powered teaching material generation, and automated content workflows. By connecting external services through APIs and n8n automation, repetitive processes can be streamlined while keeping related information within one platform.",
    features: [
      "Livestream scheduling and management",
      "Song and chord link library",
      "AI-powered teaching material generation",
      "Automated content and asset workflow",
      "n8n workflow automation",
      "Electron-based desktop application",
    ],
    howItWorks: [
      { title: "Manage", desc: "Users manage livestream schedules, song and chord data, and other content through the SmartHub interface." },
      { title: "Connect", desc: "SmartHub connects with external services such as Canva, YouTube, Google Drive, and n8n to exchange data and automate workflows." },
      { title: "Automate", desc: "n8n workflows handle repetitive processes such as content processing, asset management, and integrations between different services." },
      { title: "Deliver", desc: "Processed content and scheduled activities are delivered to the appropriate platforms and storage services." },
    ],
    contribution:
      "I contributed to the development of SmartHub across the frontend, application integration, workflow automation, and desktop application packaging. I worked on the user interface, integrated external services and APIs, developed n8n automation workflows, handled application logic and debugging, and packaged the application into a Windows desktop application using Electron.",
    challenges:
      "One of the main challenges was coordinating multiple external services and local applications into a single workflow. The system involved Next.js, Electron, n8n, Docker, Canva, YouTube, and Google Drive, each with different integration requirements. The solution was to separate application responsibilities and use n8n as the automation layer for workflows that involved multiple external services.",
    stack: ["Next.js", "React", "Python", "n8n", "Docker", "Canva / YouTube / Drive API"],
    links: { github: "https://github.com/4CeL/SmartHub" },
  },
  {
    slug: "air-purifier",
    title: "Portable Automatic Air Purifier",
    subtitle:
      "IoT-based portable air purifier with real-time monitoring on Ubidots and a Streamlit dashboard.",
    year: "2024 - 2025",
    category: "IoT · AI",
    domains: ["iot", "data"],
    status: "Competition project", // DUMMY
    role: "IoT & database",
    image: airPurifier,
    gallery: [{ src: ubidots, alt: "Ubidots dashboard showing live air quality readings" }],
    overview:
      "An AI-based and IoT-based Portable Automatic Air Purifier created with my team for the Samsung Innovation Campus competition, where my role focused on the IoT and database components. The device uses sensors to send real-time data to the Ubidots IoT platform for live monitoring, while historical data is stored in a MongoDB database for long-term analysis. All data is visualized on an interactive Streamlit web dashboard, enabling users to monitor air quality.",
    problem:
      "Traditional air purifiers often suffer from slow response times and limited functionality, leading to high energy consumption and poor user experience.",
    solution:
      "By leveraging an ESP32 microcontroller for device control and MongoDB for data storage, we optimized the air purifier's performance and enabled real-time monitoring.",
    features: ["Real-time air quality monitoring", "Historical data analysis", "Automatic operation mode"],
    howItWorks: [
      { title: "Collect", desc: "The ESP32 microcontroller collects real-time data from various sensors." },
      { title: "Store", desc: "Data is sent to the Ubidots IoT platform for live monitoring and to MongoDB for long-term analysis." },
      { title: "Visualize", desc: "The Streamlit web dashboard visualizes the data." },
    ],
    contribution:
      "I was responsible for the IoT and backend development: programming the ESP32 microcontroller, integrating the Ubidots IoT platform, and implementing the MongoDB database for data storage.",
    challenges:
      "Ensuring seamless real-time data flow between the ESP32 microcontroller, the Ubidots IoT platform, and the MongoDB database while maintaining data integrity and security was a major hurdle.",
    stack: ["Python", "ESP32", "MongoDB", "Ubidots", "Streamlit"],
    links: {},
  },
  {
    slug: "task-management",
    title: "TaskFlow",
    subtitle:
      "A full-stack task management app with a Kanban board, a deadline-aware dashboard, task editing, and a calendar view.",
    year: "2026",
    category: "Full-stack Web App",
    domains: ["web"],
    status: "Deployed on Vercel",
    role: "Solo: full-stack",
    image: taskflow,
    overview:
      "TaskFlow is a task management web app. Users add tasks and move them across a Kanban board, see on the dashboard which tasks exist and which are close to their deadline, edit tasks they already entered, and check a calendar that shows the tasks due on each date. It has a React frontend, a Python (Flask) REST API, and a PostgreSQL database on Supabase.",
    problem:
      "Personal tasks are easy to lose track of when they live in notes or chat messages. Without one place that shows the status of every task and which deadlines are coming up, it is hard to decide what to work on next and easy to miss due dates.",
    solution:
      "One app that keeps every task with its status, priority, and due date. The Kanban board shows progress at a glance, the dashboard highlights overdue tasks and tasks due today, and the calendar lays tasks out by date. Each account only sees its own tasks, protected by JWT authentication.",
    features: [
      "Kanban board (Todo, In Progress, Done) with drag-and-drop to change status",
      "Dashboard with task statistics, a status chart, and reminders for overdue and due-today tasks",
      "Task list with search, status filter, and edit / delete",
      "Calendar view that shows the tasks due on each date",
      "Tasks with title, description, status, priority (Low / Medium / High), and due date",
      "Register and login with email or Google, secured with bcrypt and JWT",
      "Recent activity feed, profile page, and dark mode",
    ],
    howItWorks: [
      { title: "Sign in", desc: "Users register or log in with email or Google. The Flask API returns a JWT that the React app sends with every request." },
      { title: "Add tasks", desc: "Tasks are created with a status, priority, and due date, then stored per user in PostgreSQL on Supabase." },
      { title: "Track", desc: "The Kanban board updates a task's status on drag; the dashboard and calendar show what is overdue, due today, or coming up." },
      { title: "Update", desc: "Tasks can be edited or deleted from the task list, and every change is recorded in the recent activity feed." },
    ],
    contribution:
      "I built the whole app on my own. On the frontend I made the React pages (Dashboard, Kanban, Tasks, Calendar, Profile) with Tailwind CSS, drag-and-drop with dnd-kit, charts with Recharts, and the calendar with react-calendar. On the backend I wrote a Flask REST API split into routes, business logic, and data layers, with JWT-protected endpoints, bcrypt password hashing, Google sign-in, and parameterized SQL queries.",
    challenges:
      "The database started on MySQL and was later migrated to PostgreSQL on Supabase, which meant adapting the queries and the connection setup to Postgres. Keeping the Kanban board, dashboard, and calendar consistent after every change, and making sure each user can only read and modify their own tasks, were the other main points I had to get right.",
    stack: ["React", "Vite", "Tailwind CSS", "Python", "Flask", "PostgreSQL (Supabase)", "JWT"],
    links: { github: "https://github.com/4CeL/task_management", demo: "https://task-workflow-app.vercel.app" },
  },
  {
    slug: "flood-analysis",
    title: "Flood Analysis",
    subtitle: "Predicting flood conditions in Jakarta with Python and machine learning.",
    year: "2024", // DUMMY
    category: "Data · ML",
    domains: ["data"],
    status: "Course project", // DUMMY
    role: "Data analysis & modeling",
    image: flood,
    overview:
      "For a Big Data Processing group project, my group and I developed a predictive flood analysis model using a large-scale environmental dataset from Kaggle. We implemented and compared machine learning algorithms to forecast flood occurrences and identify the most significant contributing factors.",
    problem:
      "Jakarta is highly vulnerable to flooding due to factors such as rainfall, water levels, and geographical conditions. Understanding historical patterns and identifying factors associated with flood events can help provide better insights for monitoring and prediction.",
    solution:
      "Analyzed historical flood-related data using Python and developed multiple machine learning models to evaluate both numerical flood levels and flood occurrence. Linear Regression was used to analyze continuous flood levels, while Logistic Regression and Random Forest were applied to classify flood conditions and compare predictive performance.",
    features: [
      "Flood data preprocessing and cleaning",
      "Exploratory data analysis",
      "Flood level trend analysis",
      "Linear Regression modeling",
      "Logistic Regression classification",
      "Random Forest classification",
      "Model performance comparison",
    ],
    howItWorks: [
      { title: "Prepare", desc: "Collected, cleaned, and prepared historical flood-related data using Python in Google Colab." },
      { title: "Analyze", desc: "Performed exploratory data analysis to identify patterns, trends, and relationships between variables related to flooding." },
      { title: "Predict", desc: "Built and evaluated Linear Regression, Logistic Regression, and Random Forest models to analyze and predict flood conditions." },
    ],
    contribution:
      "I performed the complete data analysis and machine learning workflow, including data preprocessing, exploratory analysis, model development, evaluation, and interpretation using Python in Google Colab.",
    challenges:
      "One of the main challenges was determining which variables were most relevant for predicting flood conditions and comparing different machine learning approaches. Each model also required different evaluation methods depending on whether the target represented a continuous flood level or a categorical flood condition.",
    stack: ["Python", "Google Colab", "Tableau"],
    links: {},
  },
  {
    slug: "netflix-analysis",
    title: "Netflix Data Analysis",
    subtitle: "Exploring the Netflix catalog with Python and Tableau.",
    year: "2024", // DUMMY
    category: "Data Visualization",
    domains: ["data"],
    status: "Course project", // DUMMY
    role: "Data analyst",
    image: netflix,
    overview:
      "An in-depth analysis of the Netflix content catalog, starting with pre-processing raw data in Python to ensure cleanliness and consistency. The cleaned data is then visualized in Tableau to uncover insights such as content growth trends, the distribution of dominant genres, and the global mapping of film and TV show production.",
    problem:
      "Netflix's large content catalog contains attributes such as release dates, genres, countries, and content types. Without proper analysis and visualization, it is difficult to identify meaningful trends and understand how the catalog has evolved over time.",
    solution:
      "Cleaned and analyzed the Netflix dataset using Python in Google Colab, then turned the findings into interactive Tableau visualizations exploring content growth, genre distribution, production countries, and the balance between movies and TV shows.",
    features: [
      "Data cleaning and preprocessing with Python",
      "Exploratory data analysis",
      "Content growth trend analysis",
      "Genre and content type distribution",
      "Global production country analysis",
      "Interactive Tableau dashboard",
    ],
    howItWorks: [
      { title: "Prepare", desc: "Imported and cleaned the raw Netflix dataset using Python in Google Colab, including handling missing values." },
      { title: "Analyze", desc: "Performed exploratory data analysis to identify trends in content types, release years, genres, ratings, and production countries." },
      { title: "Visualize", desc: "Built interactive Tableau visualizations and dashboards to present the key insights." },
    ],
    contribution:
      "I performed the complete data analysis workflow, from data cleaning and exploratory analysis in Python to the final Tableau dashboard.",
    challenges:
      "Handling incomplete and inconsistent data, particularly missing values across multiple attributes. The dataset also contained complex categorical information such as multiple genres and production countries, which required careful preprocessing before visualization.",
    stack: ["Python", "Google Colab", "Tableau"],
    links: {},
  },
  {
    slug: "portfolio-v1",
    title: "Personal Portfolio v1",
    subtitle: "The previous version of this site: an interactive showcase of projects, skills, and experience.",
    year: "2025", // DUMMY
    category: "Web",
    domains: ["web"],
    status: "Archived", // DUMMY
    role: "Design & development",
    image: portfolio,
    overview:
      "A personal portfolio website designed to showcase my projects, technical skills, experience, and achievements. Each project has a detailed page covering the problem, solution, features, development process, challenges, and technologies used.",
    problem:
      "A traditional portfolio often provides only a brief overview of projects, making it difficult for visitors to understand the actual development process, technical challenges, and my contribution to each project.",
    solution:
      "Built a portfolio with dedicated project detail pages that present each project in a structured way, combining responsive layouts, animations, and detailed explanations.",
    features: [
      "Responsive design for desktop and mobile",
      "Interactive project showcase",
      "Detailed project information pages",
      "Technology and skills showcase",
    ],
    howItWorks: [
      { title: "Explore", desc: "Visitors browse the portfolio and the projects displayed on the website." },
      { title: "Discover", desc: "Each project provides its background, problem, solution, features, and challenges." },
      { title: "Learn", desc: "Visitors review the technologies used, my contribution, and the process behind each project." },
    ],
    contribution:
      "Designed and developed the website from the frontend structure to the project detail pages: responsive UI, reusable components, animations, project data structure, and navigation.",
    challenges:
      "Presenting detailed technical information without making the interface feel overwhelming. I organized project information into structured sections with reusable components and responsive layouts.",
    stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    links: { github: "https://github.com/4CeL/Portofolio" },
  },
  {
    slug: "willify",
    title: "Willify",
    subtitle: "A simple music website that lists available songs and shows the lyrics of each one.",
    year: "2023", // DUMMY
    category: "UI/UX · Frontend",
    domains: ["web"],
    status: "Course project",
    role: "Solo: design & frontend",
    image: willify,
    overview:
      "Willify is a front-end website I built as an individual assignment for my Human-Computer Interaction (HCI) class. It shows a list of available songs, and selecting a song opens a page with its lyrics. The project focuses on the interface: layout, navigation, and readability, rather than on backend features. I handled the whole process myself, from designing the screens to building them.",
    problem:
      "The assignment was to design and build an interface that applies HCI principles. For a lyrics site, that means users should be able to find a song quickly and read its lyrics comfortably, without clutter or confusing navigation.",
    solution:
      "A clean, two-level website: a song list as the main page and a dedicated lyrics page for each song. The design keeps navigation consistent across pages, uses clear visual hierarchy for titles and artists, and gives the lyrics enough size and spacing to be read easily on desktop and mobile.",
    features: [
      "List of available songs with title and artist",
      "Lyrics page for every song",
      "Consistent navigation between the list and lyrics pages",
      "Readable typography and spacing for long lyrics",
      "Responsive layout for desktop and mobile",
    ],
    howItWorks: [
      { title: "Browse", desc: "Visitors open the website and see the list of available songs." },
      { title: "Select", desc: "Choosing a song opens its lyrics page." },
      { title: "Read", desc: "The lyrics are shown in a clean, readable layout, with a way back to the song list." },
    ],
    contribution:
      "This was a solo project. I designed the user interface and page flow, then built the website's front end, applying HCI principles such as consistency, clear feedback, and visual hierarchy throughout.",
    challenges:
      "The main challenge was keeping long blocks of lyrics comfortable to read while the layout stayed simple and consistent on different screen sizes. I solved this by giving the lyrics page its own focused layout, with careful font size, line height, and spacing, and keeping the navigation the same on every page.",
    stack: ["HTML", "CSS", "JavaScript"], // DUMMY: confirm the tech used
    links: {},
  },
  // DUMMY: EduNext and Nibble share placeholder content (the "digital wallet" text from
  // portfolio v1). Replace with the real project data.
  {
    ...placeholderProject(),
    slug: "edunext",
    title: "EduNext",
  },
  {
    ...placeholderProject(),
    slug: "nibble",
    title: "Nibble",
  },
];

// DUMMY content reused by EduNext and Nibble until their real data is ready.
function placeholderProject() {
  return {
    subtitle: "Secure and seamless asset management.",
    year: "2025",
    category: "Web App",
    domains: ["web"],
    status: "In progress",
    role: "Full-stack developer",
    image: ubidots,
    overview:
      "A secure digital wallet application that allows users to manage both traditional fiat currencies and various cryptocurrencies in a single unified portfolio.",
    problem:
      "Managing traditional banking and crypto assets usually requires separate applications, making it difficult to track total net worth and transfer funds between the two ecosystems.",
    solution:
      "Built a secure, unified wallet that interfaces with both traditional banking APIs (Plaid) and blockchain networks for real-time asset management and swaps.",
    features: [
      "Unified portfolio dashboard",
      "Instant fiat-to-crypto swaps",
      "Biometric authentication",
      "Automated tax reporting generation",
    ],
    howItWorks: [
      { title: "Link", desc: "Users link their bank accounts and crypto wallets securely." },
      { title: "Manage", desc: "View all balances and historical performance on one screen." },
      { title: "Transact", desc: "Send, receive, or swap assets with a few taps." },
    ],
    contribution:
      "I was responsible for implementing the secure authentication flow and integrating the blockchain APIs to fetch real-time wallet balances.",
    challenges:
      "Handling the high volatility of crypto prices required highly responsive UI updates. I utilized WebSockets for live price feeds and implemented strict data validation to prevent transaction errors during rapid price swings.",
    stack: ["React", "Node.js", "MongoDB", "AWS"],
    links: {},
  };
}

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug) {
  const index = projects.findIndex((project) => project.slug === slug);
  const count = projects.length;
  return {
    index,
    count,
    prev: projects[(index - 1 + count) % count],
    next: projects[(index + 1) % count],
  };
}
