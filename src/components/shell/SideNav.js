"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/content/profile";
import { isActive } from "@/lib/routes";

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="sidenav" aria-label="Main">
      <ul>
        {navigation.map((item) => (
          <li key={item.href}>
            <Link href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <p className="sidenav-keys label" aria-hidden="true">
        Keys <kbd>1</kbd>–<kbd>6</kbd>
      </p>
    </nav>
  );
}
