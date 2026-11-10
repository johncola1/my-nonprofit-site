"use client";

import { useEffect, useRef, useState } from "react";

export default function SportsMenu({ sports }: { sports: string[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      // Hover opens it for mouse users only; on touch screens a tap toggles it.
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="sports-menu"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 py-2 text-sm text-chalk/80 transition hover:text-chalk"
      >
        Sports
        <svg
          aria-hidden
          viewBox="0 0 12 12"
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M2.5 4.5L6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* pt-2 bridges the gap so the menu doesn't close while the pointer moves onto it */}
      <div
        id="sports-menu"
        className={`absolute right-0 top-full pt-2 transition duration-200 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <ul className="min-w-44 rounded-2xl border border-chalk/10 bg-turf-deep/85 p-2 shadow-2xl shadow-black/30 backdrop-blur-md">
          <li className="px-3 pb-1 pt-2 text-[10px] uppercase tracking-[0.25em] text-chalk-muted">Facilities</li>
          {sports.map((s) => (
            <li key={s}>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2 font-display text-2xl text-chalk transition hover:bg-chalk/10"
              >
                {s}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
