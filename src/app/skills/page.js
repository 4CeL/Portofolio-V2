import Link from "next/link";
import { skillSummary, skills, softSkills } from "@/content/skills";
import { projects } from "@/content/projects";
import PageHeading from "@/components/scenes/PageHeading";

export const metadata = {
  title: "Skills",
  description: "Technologies, the domain each one covers, and the projects that use it.",
};

const titles = Object.fromEntries(projects.map((project) => [project.slug, project.title]));

export default function SkillsPage() {
  return (
    <div className="skills">
      <PageHeading label="Skills / capability map" title="Skills, kept practical." />

      <section className="skill-top panel reveal" style={{ "--i": 1 }} aria-labelledby="direction">
        <div className="skill-copy">
          <span className="label">Core direction</span>
          <h2 id="direction">{skillSummary.direction}</h2>
          <p>{skillSummary.body}</p>
        </div>
        <dl className="skill-proof">
          {skillSummary.proof.map((item) => (
            <div key={item.label}>
              <dt className="label">{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="panel reveal" style={{ "--i": 2 }} aria-labelledby="matrix-title">
        <div className="panel-head">
          <h2 id="matrix-title" className="label">
            Matrix
          </h2>
          <span className="label">{skills.length} entries</span>
        </div>
        <table className="matrix">
          <thead>
            <tr>
              <th scope="col">Tech</th>
              <th scope="col">Domain</th>
              <th scope="col">Used in</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.name}>
                <th scope="row" data-label="Tech">
                  {skill.name}
                </th>
                <td data-label="Domain">{skill.domain}</td>
                <td data-label="Used in">
                  {skill.usedIn.length ? (
                    <ul className="tag-list">
                      {skill.usedIn.map((slug) => (
                        <li key={slug}>
                          <Link href={`/projects/${slug}`}>{titles[slug] ?? slug}</Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="matrix-note">{skill.note ?? "—"}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <p className="soft-skills reveal" style={{ "--i": 3 }}>
        <span className="label">Soft skills</span>
        <span>{softSkills.join(" / ")}</span>
      </p>
    </div>
  );
}
