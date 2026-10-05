import Link from "next/link";
import { profile, socials } from "@/content/profile";
import Logo from "@/components/ui/Logo";
import { ArrowUpRight, socialIcons } from "@/components/ui/Icons";
import ThemeToggle from "@/components/ui/ThemeToggle";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="header">
      <Link href="/" className="brand" aria-label={`${profile.name}, home`}>
        <Logo />
        <span className="brand-text">{profile.shortName} / 2026</span>
      </Link>
      <div className="header-actions">
        <nav className="hdr-links" aria-label="Social links">
          {socials.map((social) => {
            const Icon = socialIcons[social.id];
            const external = social.href.startsWith("http");
            return (
              <a
                key={social.id}
                className="hdr-link"
                href={social.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <Icon className="hdr-link-icon" />
                {social.label}
                {external ? <ArrowUpRight className="hdr-link-arrow" /> : null}
                {external ? <span className="sr-only">(opens in a new tab)</span> : null}
              </a>
            );
          })}
        </nav>
        <ThemeToggle />
        <MobileMenu />
      </div>
    </header>
  );
}
