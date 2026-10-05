import { domains, projects } from "@/content/projects";
import PageHeading from "@/components/scenes/PageHeading";
import ProjectConsole from "@/components/scenes/ProjectConsole";

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

  const years = projects.map((project) => Number(project.year)).filter(Number.isFinite);
  const range = years.length ? `${Math.min(...years)}–${Math.max(...years)}` : "";

  return (
    <div className="projects">
      <PageHeading label={`${range} / selected systems`} title="Project archive." />
      <ProjectConsole projects={items} domains={domains} />
    </div>
  );
}
