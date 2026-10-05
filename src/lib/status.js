"use client";

// Tiny store for the status bar "context" slot (e.g. the project being previewed).
// Entries are tied to a pathname so they disappear automatically after navigation.
import { useSyncExternalStore } from "react";

let current = null; // { path, text }
const listeners = new Set();

export function setStatusContext(path, text) {
  current = text ? { path, text } : null;
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useStatusContext(pathname) {
  const value = useSyncExternalStore(
    subscribe,
    () => current,
    () => null
  );
  return value && value.path === pathname ? value.text : null;
}
