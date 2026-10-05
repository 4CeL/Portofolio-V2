"use client";

import { usePathname } from "next/navigation";
import { profile } from "@/content/profile";
import { toShellPath } from "@/lib/routes";
import { useStatusContext } from "@/lib/status";
import LiveClock from "@/components/ui/LiveClock";

export default function StatusBar() {
  const pathname = usePathname();
  const context = useStatusContext(pathname);

  return (
    <footer className="statusbar">
      <span className="statusbar-path">{toShellPath(pathname)}</span>
      <span aria-live="polite">{context ?? profile.location}</span>
      <span>
        <span className="status-dot" aria-hidden="true" />
        {profile.status}
        <span aria-hidden="true">·</span>
        <LiveClock timeZone={profile.timezone} label={profile.timezoneLabel} />
      </span>
    </footer>
  );
}
