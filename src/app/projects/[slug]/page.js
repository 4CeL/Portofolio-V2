import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdjacentProjects, getProject, projects } from "@/content/projects";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/ui/Icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.subtitle,
    openGraph: { title: project.title, description: project.subtitle, images: [{ url: project.image.src }] },
  };
}

const pad = (n) => String(n).padStart(2, "0");

export default async function CaseFilePage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { index, count, prev, next } = getAdjacentProjects(slug);

  // Build only the sections that have content, then number them in order.
  const sections = [
    project.overview && { id: "overview", title: "Overview", body: <p>{project.overview}</p> },
    (project.problem || project.solution) && {
      id: "problem",
      title: "Problem & solution",
      body: (
        <div className="case-split">
          {project.problem ? (
            <div>
              <h3 className="label">Problem</h3>
              <p>{project.problem}</p>
            </div>
          ) : null}
          {project.solution ? (
            <div>
              <h3 className="label">Solution</h3>
              <p>{project.solution}</p>
            </div>
          ) : null}
        </div>
      ),
    },
    project.howItWorks?.length && {
      id: "how",
      title: "How it works",
      body: (
        <ol className="flow">
          {project.howItWorks.map((step, i) => (
            <li key={step.title}>
              <span className="label">Step {pad(i + 1)}</span>
              <strong>{step.title}</strong>
              <p>{step.desc}</p>
            </li>
          ))}
        </ol>
      ),
    },
    project.features?.length && {
      id: "features",
      title: "Features",
      body: (
        <ul className="dash-list">
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      ),
    },
    project.contribution && { id: "contribution", title: "My contribution", body: <p>{project.contribution}</p> },
    project.challenges && { id: "challenges", title: "Challenges & learnings", body: <p>{project.challenges}</p> },
  ].filter(Boolean);

  const links = [
    project.links?.github && { label: "GitHub", href: project.links.github },
    project.links?.demo && { label: "Live demo", href: project.links.demo },
  ].filter(Boolean);

  return (
    <article className="case">
      <nav className="case-nav reveal" style={{ "--i": 0 }} aria-label="Case file navigation">
        <Link href="/projects" className="case-nav-link">
          <ArrowLeft /> Projects
        </Link>
        <span className="label">
          Case {pad(index + 1)} / {pad(count)}
        </span>
        <Link href={`/projects/${next.slug}`} className="case-nav-link" aria-label={`Next case: ${next.title}`}>
          Next <ArrowRight />
        </Link>
      </nav>

      <div className="case-grid">
        <aside className="case-meta reveal" style={{ "--i": 1 }} aria-label="Project details">
          <dl className="kv">
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Domain</dt>
              <dd>{project.category}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{project.status}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>
                <ul className="tag-list">
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </dd>
            </div>
            {links.length ? (
              <div>
                <dt>Links</dt>
                <dd className="case-links">
                  {links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label} <ArrowUpRight />
                    </a>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>
          {sections.length > 1 ? (
            <nav className="case-toc" aria-label="Sections">
              <p className="label">Contents</p>
              <ol>
                {sections.map((section, i) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>
                      <span>{pad(i + 1)}</span> {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
        </aside>

        <div className="case-main">
          <header className="case-head reveal" style={{ "--i": 1 }}>
            <p className="label">
              {project.year} · {project.category}
            </p>
            <h1 className="display display--case">{project.title}</h1>
            <p className="case-sub">{project.subtitle}</p>
          </header>

          <figure className="case-figure reveal" style={{ "--i": 2 }}>
            <Image
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              sizes="(max-width: 1023px) 100vw, 70vw"
              placeholder="blur"
              priority
            />
          </figure>

          {sections.map((section, i) => (
            <section key={section.id} id={section.id} className="case-section" aria-labelledby={`${section.id}-title`}>
              <h2 id={`${section.id}-title`} className="case-section-title">
                <span className="label">{pad(i + 1)}</span>
                {section.title}
              </h2>
              {section.body}
            </section>
          ))}

          {project.gallery?.length ? (
            <section className="case-section" aria-label="Gallery">
              {project.gallery.map((item) => (
                <figure key={item.alt} className="case-figure">
                  <Image src={item.src} alt={item.alt} sizes="(max-width: 1023px) 100vw, 70vw" placeholder="blur" />
                  <figcaption className="label">{item.alt}</figcaption>
                </figure>
              ))}
            </section>
          ) : null}
        </div>
      </div>

      <Link href={`/projects/${next.slug}`} className="case-next">
        <span className="label">Next case</span>
        <strong>{next.title}</strong>
        <ArrowRight />
      </Link>
      {prev.slug !== next.slug ? (
        <p className="case-prev">
          <Link href={`/projects/${prev.slug}`}>
            <ArrowLeft /> Previous: {prev.title}
          </Link>
        </p>
      ) : null}
    </article>
  );
}
