"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation, profile, socials } from "@/content/profile";
import { isActive } from "@/lib/routes";
import { Close, socialIcons } from "@/components/ui/Icons";

const layers = ["var(--ink)", "var(--paper)", "var(--paper-soft)"];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  function openMenu() {
    setOpen(true);
    document.body.style.overflow = "hidden";
    // Wait for the panel to become interactive before moving focus into it.
    window.setTimeout(() => panelRef.current?.querySelector("a")?.focus(), 60);
  }

  function closeMenu({ restoreFocus = true } = {}) {
    setOpen(false);
    document.body.style.overflow = "";
    if (restoreFocus) toggleRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      document.body.style.overflow = "";
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={openMenu}
      >
        Menu
        <span className="menu-btn-icon" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      <div className="mmenu" data-open={open} inert={!open}>
        <div className="mmenu-layers" aria-hidden="true">
          {layers.map((background, index) => (
            <span key={background} style={{ "--layer": index, background }} />
          ))}
        </div>
        <nav
          id="mobile-menu"
          ref={panelRef}
          className="mmenu-panel"
          aria-label="Mobile"
        >
          <div className="mmenu-head">
            <span>{profile.name} / 2026</span>
            <button type="button" className="mmenu-close" onClick={() => closeMenu()}>
              Close <Close />
            </button>
          </div>
          <ul className="mmenu-list">
            {navigation.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  style={{ "--i": index }}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  onClick={() => closeMenu({ restoreFocus: false })}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.label}</strong>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mmenu-socials">
            {socials.map((social) => {
              const Icon = socialIcons[social.id];
              const external = social.href.startsWith("http");
              return (
                <a
                  key={social.id}
                  className="icon-btn"
                  href={social.href}
                  aria-label={social.label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}
