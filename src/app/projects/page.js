import { domains, projects } from "@/content/projects";
import PageHeading from "@/components/scenes/PageHeading";
import ProjectConsole from "@/components/scenes/ProjectConsole";
import { parseYears } from "@/lib/years";

export const metadata = {
  title: "Projects",
  description: "Selected backend, data, IoT, and automation projects.",
};

export default function ProjectsPage() {
  // Only send what the console needs to the client.
  const items = projects.map(({ slug, title, subtitle, year, category, domains: tags, status, role, image, stack, links }) => ({
    slug,
    title,
    subtitle,
    year,
    category,
    domains: tags,
    status,
    role,
    image,
    stack,
    links,
  }));

  const years = projects.map((project) => parseYears(project.year)).filter(Boolean);
  const range = years.length
    ? `${Math.min(...years.map((y) => y.start))}–${Math.max(...years.map((y) => y.end))}`
    : "";

  return (
    <div className="projects">
      <PageHeading label={`${range} / selected systems`} title="Project archive." />
      <ProjectConsole projects={items} domains={domains} />
    </div>
  );
}
