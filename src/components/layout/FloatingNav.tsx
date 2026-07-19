"use client";

import { navSections, resumeLink } from "@/data/portfolio";
import { Button } from "@/components/ui/button";

export function FloatingNav() {
  return (
    <header className="sticky top-4 z-40 mx-auto mb-[var(--space-xl)] flex w-full justify-center">
      <nav
        aria-label="Primary"
        className="flex max-w-full flex-nowrap items-center justify-center gap-0.5 overflow-x-auto rounded-full border-2 border-[var(--color-on-mat)]/30 bg-[var(--color-mat)]/80 px-1.5 py-1 shadow-[3px_4px_0_var(--color-shadow)] backdrop-blur-sm [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-1 sm:px-2 sm:py-1.5 [&::-webkit-scrollbar]:hidden"
      >
        {navSections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="shrink-0 rounded-full px-2 py-1 text-xs font-medium text-[var(--color-on-mat)]/80 transition-colors hover:bg-[var(--color-mat-deep)]/50 hover:text-[var(--color-on-mat)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] sm:px-3 sm:py-1.5 sm:text-sm"
          >
            {section.label}
          </a>
        ))}
        <Button asChild size="sm" className="ml-0.5 h-7 shrink-0 px-2.5 text-[11px] sm:ml-1 sm:h-8 sm:px-3 sm:text-xs">
          <a href={resumeLink} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </Button>
      </nav>
    </header>
  );
}
