import Image from "next/image";
import { profile } from "@/content/profile";
import PageHeading from "@/components/scenes/PageHeading";
import GitHubCalendar from "@/components/scenes/GitHubCalendar";
import photo from "@/assets/photo.webp";

export const metadata = {
  title: "About",
  description: `About ${profile.name}: ${profile.role}.`,
};

export default function AboutPage() {
  return (
    <div className="about">
      <PageHeading label="About / background" title="Backend systems, data, and the tools around them." />

      <div className="about-grid">
        <div className="about-main">
          <section className="panel reveal" style={{ "--i": 1 }} aria-labelledby="direction-title">
            <div className="panel-head">
              <span className="label">Current direction</span>
            </div>
            <div className="panel-body statement">
              <h2 id="direction-title">{profile.headline}</h2>
              {profile.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="panel reveal" style={{ "--i": 2 }} aria-label="Quick facts">
            <div className="panel-head">
              <span className="label">Quick facts</span>
              <span className="label">{profile.facts.length} rows</span>
            </div>
            <dl className="kv panel-body">
              {profile.facts.map((fact) => (
                <div key={fact.key}>
                  <dt>{fact.key}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <figure className="panel about-photo reveal" style={{ "--i": 2 }}>
          <Image
            src={photo}
            alt={`Portrait of ${profile.name}`}
            sizes="(max-width: 1023px) 320px, 30vw"
            priority
          />
          <figcaption className="label">
            {profile.name} · {profile.location}
          </figcaption>
        </figure>
      </div>

      <GitHubCalendar username={profile.github.username} url={profile.github.url} />
    </div>
  );
}
