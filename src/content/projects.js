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
import portfolioV3 from "@/assets/portfolio-v3.webp"; // screenshot of this site's home page
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
    stack: ["Next.js", "React", "Python", "Electron", "n8n", "Docker", "Canva / YouTube / Drive API"],
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
    status: "Competition project",
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
    year: "2025", 
    category: "Data · ML",
    domains: ["data"],
    status: "Course project",
    role: "Team: data cleaning",
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
      "In this group project I was responsible for data cleaning: preparing the raw Kaggle dataset in Python (Google Colab) by handling missing and inconsistent values and getting the data into a clean, consistent shape so the team could run the exploratory analysis and train the models on it.",
    challenges:
      "One of the main challenges was determining which variables were most relevant for predicting flood conditions and comparing different machine learning approaches. Each model also required different evaluation methods depending on whether the target represented a continuous flood level or a categorical flood condition.",
    stack: ["Python", "Google Colab"],
    links: {},
  },
  {
    slug: "netflix-analysis",
    title: "Netflix Data Analysis",
    subtitle: "Exploring the Netflix catalog with Python and Tableau.",
    year: "2025",
    category: "Data Visualization",
    domains: ["data"],
    status: "Course project",
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
    slug: "portfolio-v3",
    title: "Personal Portfolio v3",
    subtitle: "This website: a monochrome, workspace-style portfolio that presents projects like a small app.",
    year: "2026",
    category: "Web",
    domains: ["web"],
    status: "Active development",
    role: "Design & development",
    image: portfolioV3,
    overview:
      "The current version of my portfolio. Instead of one long landing page, the site is framed like a desktop app: a fixed header, a side navigation, a scrolling stage for each page, and a status bar with the current path and a live clock. It presents my projects, skills, and experience with a monochrome design where hierarchy comes from typography, hairlines, and inversion rather than colour.",
    problem:
      "The previous portfolio relied on a typical landing-page layout with gradients, floating icons, and skill percentages. It looked like many other portfolios, some project data was placeholder or copied between projects, and the images were heavy (one screenshot alone was about 13 MB).",
    solution:
      "A redesign with a clear concept and a content-first structure. All text lives in separate content files, every project has a structured case file, the skills page links each technology to the projects that use it, and images are compressed to WebP. The site is statically generated with Next.js for fast loading.",
    features: [
      "App-shell layout with header, side navigation, stage, and a live status bar",
      "Project browser with domain filters, sorting, keyboard navigation, and a preview panel",
      "Case file page for every project with sticky metadata and numbered sections",
      "Skills matrix with technology logos linked to the projects that use them",
      "Experience timeline split into organization, competition, education, and certificate tabs",
      "GitHub contribution calendar fetched from GitHub and refreshed daily",
      "Light and dark theme, Rubik's cube loader, page transitions, and keyboard shortcuts 1–6",
    ],
    howItWorks: [
      { title: "Content", desc: "Profile, projects, skills, and experience are plain JavaScript files in src/content, so updating the site does not touch any component." },
      { title: "Build", desc: "Next.js renders every page, including each project's case file, to static HTML at build time." },
      { title: "Browse", desc: "Visitors move between pages with the side navigation or number keys, with a short wipe transition between scenes." },
    ],
    contribution:
      "I defined the concept and design direction, wrote the content for every project, and built the site with Next.js: the app shell, the project browser and case files, the skills matrix, the experience timeline, theming, and the loading and transition animations.",
    challenges:
      "Keeping a strict monochrome style while still showing real project screenshots, logos, and the GitHub calendar in colour, and making the effects (loader, cursor, dot field, page transitions) feel light. Every animation is disabled for visitors who prefer reduced motion, and the interactive parts stay usable with a keyboard.",
    stack: ["Next.js 16", "React 19", "Tailwind CSS v4", "JavaScript", "View Transitions API"],
    links: { github: "https://github.com/4CeL/Portofolio-V2" },
  },
  {
    slug: "portfolio-v1",
    title: "Personal Portfolio v1",
    subtitle: "The previous version of this site: an interactive showcase of projects, skills, and experience.",
    year: "2026",
    category: "Web",
    domains: ["web"],
    status: "Archived",
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
    year: "2024",
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
    stack: ["HTML", "CSS", "JavaScript"],
    links: { github: "https://github.com/4CeL/Willify" },
  },
  {
    slug: "edunext",
    title: "EduNext",
    subtitle:
      "A scholarship discovery website for students, with related courses, e-books, a community forum, and a premium plan.",
    year: "2025",
    category: "Web Platform",
    domains: ["web"],
    status: "Course project", // DUMMY: confirm the course name
    role: "Team: main web developer",
    image: ubidots, // DUMMY: replace with an EduNext screenshot (1600x700)
    overview:
      "EduNext is a scholarship advisor website that helps students find scholarship opportunities and prepare for them. Visitors can search and browse scholarships, open a detail page with the criteria and important dates, and continue to related courses and e-books. Registered users get a profile page and can post in a community forum. The site is built with plain PHP and MySQL, without a framework.",
    problem:
      "Scholarship information is scattered across many university and organization websites, so students spend a lot of time just finding what is available, what the requirements are, and when the deadlines are. Preparation material and a place to ask other applicants are usually somewhere else again.",
    solution:
      "One website that collects scholarships in a searchable list, shows the benefits, field of study, criteria, and important dates of each one, and links them to courses and e-books for preparation. A forum lets students share threads, images, likes, and comments, and a Premium page presents a monthly or annual subscription.",
    features: [
      "Scholarship list with search by name or university and pagination",
      "Scholarship detail page with benefits, criteria, registration info, and important dates",
      "Course and e-book recommendations linked from each scholarship",
      "Community forum with threads, image uploads, likes, and comments",
      "Register, login, and an account page to edit the profile and upload a photo",
      "Premium plan comparison and a checkout page (QRIS, GoPay, Virtual Account, card) as a UI prototype",
      "Responsive layout with a mobile hamburger menu",
    ],
    howItWorks: [
      { title: "Discover", desc: "Students search or page through the scholarship list and open a scholarship to see its criteria and deadlines." },
      { title: "Prepare", desc: "From the detail page they continue to related courses and e-books." },
      { title: "Join", desc: "After registering and logging in, they edit their profile and post, like, and comment in the forum." },
      { title: "Upgrade", desc: "The Premium page compares Free and Premium and leads to a checkout page for the monthly or annual plan." },
    ],
    contribution:
      "This was a team project, and I built almost all of the website with PHP and MySQL: the scholarship list with search and pagination, the scholarship detail page, the course and e-book pages, session-based login and registration with hashed passwords, the account page with photo upload, the community forum, and the Premium and checkout pages.",
    challenges:
      "Without a framework, every page handles its own queries, sessions, and pagination. Pagination was built by hand the same way for scholarships (combined with search), courses, e-books, and the forum. The forum like button toggles a row in a separate likes table so a user can only like a thread once, while a like counter on the thread keeps the feed fast to read.",
    stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    links: { github: "https://github.com/4CeL/EduNextWebsite" },
  },
  {
    slug: "nibble",
    title: "Nibble",
    subtitle:
      "A healthy recipe platform with a weekly meal planner and a community forum, built with Laravel.",
    year: "2025",
    category: "Full-stack Web App",
    domains: ["web"],
    status: "Course project (Web Programming)",
    role: "Team: backend & frontend",
    image: ubidots, // DUMMY: replace with a Nibble screenshot (1600x700)
    overview:
      "Nibble (\"Inspire Your Kitchen\") is a recipe website for home cooks that encourages healthier cooking and less food waste, in line with SDG 2 (Zero Hunger) and SDG 12 (Responsible Consumption and Production). Users browse vegan and high-protein recipes, read the ingredients and steps, plan their meals for the week, and share tips in a community forum. It is a server-rendered Laravel 12 application.",
    problem:
      "Planning healthy meals takes effort: people need recipe ideas, a way to organize what they will cook during the week, and somewhere to swap tips with others. When that is spread across different apps and notes, it is easy to fall back to unplanned, wasteful cooking.",
    solution:
      "A single platform that combines a recipe collection, a weekly meal planner, and a community forum. Each user plans breakfast, lunch, and dinner for every day of the week from the available recipes, and the forum lets them post with tags, like, and comment.",
    features: [
      "Recipe collection split into vegan and protein categories, with ingredients and step-by-step instructions",
      "Weekly meal planner: a Sunday–Saturday grid for breakfast, lunch, and dinner",
      "Community forum with tags, tag filtering, likes, comments, and pagination",
      "Register and login with email or Google (Laravel Socialite)",
      "Profile page to edit name, bio, age, and profile photo",
      "Home page with featured dishes and testimonials, plus an About page",
    ],
    howItWorks: [
      { title: "Sign in", desc: "Users register with email and password or sign in with Google." },
      { title: "Discover", desc: "They browse vegan and protein recipes and open a recipe to see its ingredients and steps." },
      { title: "Plan", desc: "In the meal planner they pick a recipe for each day and meal, or reset a slot." },
      { title: "Share", desc: "In the forum they post with tags, filter by tag, like, and comment." },
    ],
    contribution:
      "This was a team project for my Web Programming class. I built the entire backend: routes, controllers, Eloquent models, and MySQL migrations for recipes, meal plans, and the forum; session-based authentication with Google sign-in; and profile updates with photo upload. On the frontend I worked on several of the Blade pages styled with Bootstrap.",
    challenges:
      "Adding Google sign-in to an existing email/password user table: the password column had to become nullable, and accounts are linked by email, so a user who first registered with a password can later log in with Google. The meal planner uses a unique (user, day, meal) constraint with updateOrCreate so each slot always holds exactly one recipe, and the forum like is a toggle backed by a unique (user, post) constraint so a post cannot be liked twice.",
    stack: ["PHP", "Laravel 12", "Blade", "Bootstrap 5", "Laravel Socialite", "MySQL"],
    links: { github: "https://github.com/4CeL/Nibble" },
  },
];

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
