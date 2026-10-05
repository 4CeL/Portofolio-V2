import { navigation } from "@/content/profile";
import { projects } from "@/content/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap() {
  const pages = navigation.map((item) => ({
    url: `${siteUrl}${item.href === "/" ? "" : item.href}`,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
  const cases = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    changeFrequency: "yearly",
    priority: 0.6,
  }));
  return [...pages, ...cases];
}
