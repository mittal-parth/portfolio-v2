"use client";

import { navSections, resumeLink } from "@/data/portfolio";
import { Button } from "@/components/ui/button";

export function FloatingNav() {
  return (
    <header className="sticky top-4 z-40 mx-auto mb-[var(--space-xl)] flex w-full justify-center px-4">
      <nav
        aria-label="Primary"
        className="flex flex-wrap items-center justify-center gap-1 rounded-full border-2 border-[var(--color-on-mat)]/30 bg-[var(--color-mat)]/80 px-2 py-1.5 shadow-[3px_4px_0_var(--color-shadow)] backdrop-blur-sm"
      >
        {navSections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rounded-full px-3 py-1.5 text-sm font-medium text-[var(--color-on-mat)]/80 transition-colors hover:bg-[var(--color-mat-deep)]/50 hover:text-[var(--color-on-mat)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
          >
            {section.label}
          </a>
        ))}
        <Button asChild size="sm" className="ml-1">
          <a href={resumeLink} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </Button>
      </nav>
    </header>
  );
}
