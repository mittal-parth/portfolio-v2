"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  educationList,
  experiences,
  type Experience,
} from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkPreview } from "@/components/ui/LinkPreview";
import { TapedCard } from "@/components/decor/Decor";
import { cn } from "@/lib/utils";

function ExperienceCompany({ exp }: { exp: Experience }) {
  const [expanded, setExpanded] = useState(false);
  const latest = exp.positions[0];
  const summary = latest?.content[0]?.text ?? "";
  const hasMore =
    exp.positions.length > 1 || (latest?.content.length ?? 0) > 1;

  return (
    <article className="relative pl-7">
      <div
        className="absolute bottom-0 left-[9px] top-0 w-px border-l border-dashed border-[var(--color-ink-subtle)]/50"
        aria-hidden="true"
      />
      <div className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[var(--color-sticker-outline)] bg-[var(--color-paper)] shadow-[1px_2px_0_var(--color-shadow)]">
        <Image src={exp.logo} alt="" width={14} height={14} className="h-3.5 w-3.5 rounded-full object-cover" />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <LinkPreview href={exp.link} title={exp.organisation}>
            <span className="text-sm font-semibold text-[var(--color-ink)]">{exp.organisation}</span>
          </LinkPreview>
        </div>

        {!expanded && (
          <>
            <p className="text-xs font-medium text-[var(--color-ink-muted)]">
              {latest?.title}
              <span className="text-[var(--color-ink-subtle)]"> · {latest?.duration}</span>
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[var(--color-ink-muted)]">{summary}</p>
          </>
        )}

        {expanded && (
          <div className="mt-2 space-y-4">
            {exp.positions.map((position, pi) => (
              <div key={`${exp.id}-${position.title}`} className="relative pl-3">
                {exp.positions.length > 1 && (
                  <div
                    className="absolute -left-[13px] top-1.5 h-2 w-2 rounded-full bg-[var(--color-accent)]"
                    aria-hidden="true"
                  />
                )}
                <p className="text-xs font-semibold text-[var(--color-ink)]">{position.title}</p>
                <p className="text-[11px] text-[var(--color-ink-subtle)]">{position.duration}</p>
                <ul className="mt-1 space-y-1">
                  {position.content.map((block, bi) => (
                    <li key={`${position.title}-${bi}`} className="text-xs leading-relaxed text-[var(--color-ink-muted)]">
                      {block.link ? (
                        <LinkPreview href={block.link} title={block.text}>{block.text}</LinkPreview>
                      ) : (
                        block.text
                      )}
                    </li>
                  ))}
                </ul>
                {pi < exp.positions.length - 1 && (
                  <div className="absolute -left-[11px] bottom-0 top-4 w-px bg-[var(--color-ink-subtle)]/25" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        )}

        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
          >
            {expanded ? "Show less" : "Show more"}
            <ChevronDown size={14} className={cn("transition-transform", expanded && "rotate-180")} />
          </button>
        )}
      </div>
    </article>
  );
}

function EducationItem({ edu }: { edu: (typeof educationList)[number] }) {
  return (
    <article className="relative pl-7">
      <div className="absolute bottom-0 left-[9px] top-0 w-px border-l border-dashed border-[var(--color-ink-subtle)]/50" aria-hidden="true" />
      <div className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[var(--color-sticker-outline)] bg-[var(--color-paper)]">
        <Image src={edu.icon} alt="" width={14} height={14} className="h-3.5 w-3.5 rounded-full object-cover" />
      </div>
      <div>
        {edu.link ? (
          <LinkPreview href={edu.link} title={edu.title}>
            <span className="text-sm font-semibold text-[var(--color-ink)]">{edu.title}</span>
          </LinkPreview>
        ) : (
          <p className="text-sm font-semibold text-[var(--color-ink)]">{edu.title}</p>
        )}
        <p className="text-xs text-[var(--color-ink-muted)]">
          {edu.degree}{edu.degree && " · "}{edu.duration}
        </p>
        {edu.content.map((line) => (
          <p key={line} className="mt-0.5 text-xs text-[var(--color-ink-muted)]">{line}</p>
        ))}
      </div>
    </article>
  );
}

export function TimelineSection() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="animate-fade-up">
      <TapedCard rotation={0.8}>
        <SectionHeading id="experience-heading" title="Experience" accent="& education" />
        <div className="space-y-5">
          {experiences.map((exp) => (
            <ExperienceCompany key={exp.id} exp={exp} />
          ))}
        </div>
        <div className="my-5 h-px bg-[var(--color-ink-subtle)]/15" />
        <h3 className="mb-4 text-sm font-semibold text-[var(--color-ink)]">Education</h3>
        <div className="space-y-5">
          {educationList.map((edu) => (
            <EducationItem key={edu.id} edu={edu} />
          ))}
        </div>
      </TapedCard>
    </section>
  );
}
