"use client";

import { ExternalLink } from "lucide-react";
import { AiFillGithub } from "@/lib/icons";
import { projects } from "@/data/portfolio";
import { getStackIcon } from "@/lib/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PinnedCard } from "@/components/decor/Decor";
import { placeholderGradient } from "@/lib/utils";

function ProjectPreview({ title }: { title: string }) {
  return (
    <div
      className="relative mb-3 aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-md)] border-2 border-[var(--color-sticker-outline)]"
      style={{ background: placeholderGradient(title) }}
    >
      <div className="flex h-full items-center justify-center">
        <span className="font-hand text-lg text-white/90">{title}</span>
      </div>
    </div>
  );
}

function ProjectCardContent({ project }: { project: (typeof projects)[number] }) {
  return (
    <>
      <ProjectPreview title={project.title} />
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="text-sm font-semibold text-[var(--color-ink)]"
            style={{ overflowWrap: "anywhere", minWidth: 0 }}
          >
            {project.title}
          </h3>
          <div className="flex shrink-0 gap-1">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub for ${project.title}`} className="text-[var(--color-ink-muted)] hover:text-[var(--color-accent)]">
                <AiFillGithub size={14} />
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Live link for ${project.title}`} className="text-[var(--color-ink-muted)] hover:text-[var(--color-accent)]">
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
        {project.highlight && (
          <p className="mt-0.5 text-[11px] font-medium text-[var(--color-accent)]">{project.highlight}</p>
        )}
        <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-ink-muted)]">{project.content}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => {
            const Icon = getStackIcon(tech.name);
            return (
              <span key={tech.name} title={tech.name} className="inline-flex h-6 w-6 items-center justify-center rounded bg-[var(--color-paper-muted)] text-[var(--color-ink-muted)]">
                <Icon size={12} aria-hidden="true" />
                <span className="sr-only">{tech.name}</span>
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}

export function ProjectsSection() {
  const rotations = [-1.5, 1.2, -0.8, 1.6, -1.1, 0.9];

  return (
    <section id="projects" aria-labelledby="projects-heading" className="animate-fade-up">
      <SectionHeading id="projects-heading" title="Projects" accent="pinned up" onMat />
      <div className="grid grid-cols-1 gap-8 min-[520px]:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, i) => (
          <PinnedCard key={project.id} rotation={rotations[i] ?? 0}>
            <ProjectCardContent project={project} />
          </PinnedCard>
        ))}
      </div>
    </section>
  );
}
