import Link from "next/link";
import { capabilities, profile } from "@/content/profile";
import RotatingText from "@/components/ui/RotatingText";
import ApiBlock from "@/components/ui/ApiBlock";
import CvButton from "@/components/ui/CvButton";
import { ArrowRight } from "@/components/ui/Icons";

export default function HomePage() {
  return (
    <div className="home">
      <div className="home-title reveal" style={{ "--i": 0 }}>
        <p className="label">Portfolio 2026 / backend + data + automation</p>
        <h1 className="display">{profile.name}</h1>
      </div>

      <div className="home-intro reveal" style={{ "--i": 1 }}>
        <p className="home-role">
          <span>I build</span>
          <RotatingText words={profile.rotatingWords} />
        </p>
        <p className="home-copy">{profile.intro}</p>
        <div className="actions">
          <Link href="/projects" className="btn btn--solid">
            View projects <ArrowRight />
          </Link>
          <CvButton href={profile.cv} name={profile.name} />
        </div>
      </div>

      <div className="home-api reveal" style={{ "--i": 2 }}>
        <ApiBlock endpoint="/api/stefanus" data={profile.api} />
      </div>

      <section className="home-caps reveal" style={{ "--i": 3 }} aria-labelledby="cap-title">
        <div className="home-caps-head">
          <h2 id="cap-title" className="label">
            Capability map
          </h2>
          <p>The areas I combine inside projects.</p>
        </div>
        <div className="cap-grid">
          {capabilities.map((cap) => (
            <article key={cap.label} className="cap">
              <span className="label">{cap.label}</span>
              <div>
                <h3>{cap.title}</h3>
                <p>{cap.body}</p>
              </div>
              <span className="cap-tools">{cap.tools}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
