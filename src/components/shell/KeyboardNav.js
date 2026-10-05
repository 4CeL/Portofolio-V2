"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { navigation } from "@/content/profile";

// Number keys 1–6 jump between scenes. Ignored while typing or when a modifier is held.
function isTyping(target) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

export default function KeyboardNav() {
  const router = useRouter();

  useEffect(() => {
    const onKey = (event) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (isTyping(event.target) || document.querySelector("dialog[open]")) return;
      const item = navigation.find((entry) => entry.key === event.key);
      if (!item) return;
      event.preventDefault();
      router.push(item.href);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return null;
}
