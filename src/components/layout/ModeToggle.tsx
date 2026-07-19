"use client";

import { cn } from "@/lib/utils";
import { useLayoutMode, type LayoutMode } from "@/components/layout/LayoutModeProvider";

const modes: { id: LayoutMode; label: string }[] = [
  { id: "canvas", label: "Canvas" },
  { id: "clean", label: "Clean" },
];

export function ModeToggle({ className }: { className?: string }) {
  const { mode, setMode } = useLayoutMode();

  return (
    <div
      className={cn(
        "flex rounded-full border border-[var(--color-ink-subtle)]/25 bg-[var(--color-paper-muted)] p-0.5",
        className,
      )}
      role="group"
      aria-label="Layout mode"
    >
      {modes.map((m) => (
        <button
          key={m.id}
          type="button"
          onClick={() => setMode(m.id)}
          aria-pressed={mode === m.id}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
            mode === m.id
              ? "bg-[var(--color-paper)] text-[var(--color-ink)] shadow-sm"
              : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]",
          )}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
