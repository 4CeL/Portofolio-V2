import { experience, experienceTypes } from "@/content/experience";
import PageHeading from "@/components/scenes/PageHeading";
import Timeline from "@/components/scenes/Timeline";

export const metadata = {
  title: "Experience",
  description: "Organizations, competitions, and education, as one timeline.",
};

export default function ExperiencePage() {
  return (
    <div className="experience">
      <PageHeading label="Experience / git log --graph" title="Record of work, teams, and study." />
      <Timeline entries={experience} types={experienceTypes} />
    </div>
  );
}
