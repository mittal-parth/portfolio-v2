"use client";

import { resumeLink, socialMedia } from "@/data/portfolio";
import { socialIconMap } from "@/lib/icons";
import { LinkPreview } from "@/components/ui/LinkPreview";
import { useLayoutMode } from "@/components/layout/LayoutModeProvider";
import { cn } from "@/lib/utils";

export function Footer() {
  const { mode } = useLayoutMode();
  const year = new Date().getFullYear();
  const onMat = mode === "canvas";

  return (
    <footer
      className={cn(
        "mt-[var(--space-3xl)] pb-[var(--space-2xl)] text-center",
        onMat && "text-shadow-on-mat",
      )}
    >
      <div className="mb-[var(--space-md)] flex justify-center gap-3">
        {socialMedia.map((social) => {
          const Icon = socialIconMap[social.platform];
          return (
            <a
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border-2 shadow-[2px_3px_0_var(--color-shadow)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
                onMat
                  ? "border-[var(--color-on-mat)]/40 bg-[var(--color-mat)]/50 text-[var(--color-on-mat)]"
                  : "border-[var(--color-sticker-outline)] bg-[var(--color-paper)] text-[var(--color-ink)]",
              )}
            >
              <Icon size={16} aria-hidden="true" />
            </a>
          );
        })}
      </div>
      <p
        className={cn(
          "font-hand text-lg",
          onMat ? "text-[var(--color-heading-on-mat)]" : "text-[var(--color-ink-muted)]",
        )}
      >
        made on a canvas
      </p>
      <p
        className={cn(
          "mt-2 text-sm",
          onMat ? "text-[var(--color-on-mat)]/85" : "text-[var(--color-ink-muted)]",
        )}
      >
        <LinkPreview href={resumeLink} title="Resume" description="Parth Mittal's resume">
          <span className={onMat ? "marker-link !text-[var(--color-on-mat)]" : undefined}>Resume</span>
        </LinkPreview>
        {" · "}© {year} Parth Mittal
      </p>
    </footer>
  );
}
