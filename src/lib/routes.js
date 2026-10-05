// Route helpers shared by the navigation components.

export function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

// "/projects/smarthub" -> "~/projects/smarthub", "/" -> "~/"
export function toShellPath(pathname) {
  if (pathname === "/_not-found") return "~/404"; // prerendered 404 page
  return `~${pathname === "/" ? "/" : pathname}`;
}
