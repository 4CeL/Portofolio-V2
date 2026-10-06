"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, Filter } from "./Icons";

// Icon-only sort button with a custom dropdown (listbox pattern).
// Keyboard: Enter / Space / ArrowDown opens; ArrowUp/Down, Home/End move; Enter or Space picks;
// Escape or Tab closes. Clicking outside closes too.
export default function SortMenu({ options, value, onChange, defaultValue }) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);
  const listId = useId();
  const current = options.find((option) => option.id === value) ?? options[0];

  function openMenu() {
    setHighlight(Math.max(0, options.findIndex((option) => option.id === value)));
    setOpen(true);
  }

  function closeMenu(focusButton = true) {
    setOpen(false);
    if (focusButton) buttonRef.current?.focus();
  }

  function choose(option) {
    onChange(option.id);
    closeMenu();
  }

  // Move focus into the list when it opens, and close on outside click.
  useEffect(() => {
    if (!open) return;
    listRef.current?.focus();
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function onButtonKey(event) {
    if (["ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      openMenu();
    }
  }

  function onListKey(event) {
    const last = options.length - 1;
    const moves = {
      ArrowDown: Math.min(last, highlight + 1),
      ArrowUp: Math.max(0, highlight - 1),
      Home: 0,
      End: last,
    };
    if (event.key in moves) {
      event.preventDefault();
      setHighlight(moves[event.key]);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      choose(options[highlight]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeMenu();
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div className="sort-menu" ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className="sort-icon"
        data-active={value !== defaultValue}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={`Sort projects, current: ${current.label}`}
        title={`Sort: ${current.label}`}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={onButtonKey}
      >
        <Filter />
      </button>

      {open ? (
        <ul
          ref={listRef}
          id={listId}
          className="sort-list"
          role="listbox"
          tabIndex={-1}
          aria-label="Sort projects"
          aria-activedescendant={`${listId}-${options[highlight]?.id}`}
          onKeyDown={onListKey}
        >
          {options.map((option, index) => {
            const selected = option.id === value;
            return (
              <li
                key={option.id}
                id={`${listId}-${option.id}`}
                role="option"
                aria-selected={selected}
                className="sort-option"
                data-highlight={index === highlight}
                data-cursor=""
                onPointerEnter={() => setHighlight(index)}
                onClick={() => choose(option)}
              >
                <span>{option.label}</span>
                {selected ? <Check aria-hidden="true" /> : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
