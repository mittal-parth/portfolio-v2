"use client";

import { navSections, resumeLink } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/layout/ModeToggle";
import { useLayoutMode } from "@/components/layout/LayoutModeProvider";
import { cn } from "@/lib/utils";

export function FloatingNav() {
  const { mode } = useLayoutMode();
  const onMat = mode === "canvas";

  return (
    <header className="sticky top-4 z-40 mx-auto mb-[var(--space-xl)] flex w-full justify-center px-4">
      <nav
        aria-label="Primary"
        className={cn(
          "flex flex-wrap items-center justify-center gap-1 rounded-full border-2 px-2 py-1.5 shadow-[3px_4px_0_var(--color-shadow)] backdrop-blur-sm",
          onMat
            ? "border-[var(--color-on-mat)]/30 bg-[var(--color-mat)]/80"
            : "border-[var(--color-sticker-outline)] bg-[var(--color-paper)]/95",
        )}
      >
        {navSections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
              onMat
                ? "text-[var(--color-on-mat)]/80 hover:bg-[var(--color-mat-deep)]/50 hover:text-[var(--color-on-mat)]"
                : "text-[var(--color-ink-muted)] hover:bg-[var(--color-paper-muted)] hover:text-[var(--color-ink)]",
            )}
          >
            {section.label}
          </a>
        ))}
        <ModeToggle className="ml-1" />
        <Button asChild size="sm" className="ml-1">
          <a href={resumeLink} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </Button>
      </nav>
    </header>
  );
}
