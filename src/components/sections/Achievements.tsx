"use client";

import Image from "next/image";
import { ExternalLink, Newspaper } from "lucide-react";
import { AiFillGithub, AiFillYoutube } from "@/lib/icons";
import { achievements } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stamp } from "@/components/decor/Decor";
import { useDraggable, useDraggableEnabled } from "@/components/decor/useDraggable";
import { cn } from "@/lib/utils";

const linkIcons = [
  { key: "article" as const, Icon: Newspaper, label: "Article" },
  { key: "project" as const, Icon: ExternalLink, label: "Project" },
  { key: "youtube" as const, Icon: AiFillYoutube, label: "YouTube" },
  { key: "github" as const, Icon: AiFillGithub, label: "GitHub" },
];

function AchievementCard({
  item,
  className,
  draggable = false,
}: {
  item: (typeof achievements)[number];
  className?: string;
  draggable?: boolean;
}) {
  const dragEnabled = useDraggableEnabled() && draggable;
  const { ref, style, dragHandlers } = useDraggable({
    id: `ach-${item.id}`,
    disabled: !dragEnabled,
  });

  return (
    <article
      ref={ref}
      {...(dragEnabled ? dragHandlers : {})}
      className={cn(
        "w-[min(85vw,16rem)] shrink-0 rounded-[var(--radius-lg)] border-4 border-[var(--color-sticker-outline)] bg-[var(--color-paper)] p-3 shadow-[4px_6px_0_var(--color-shadow)]",
        dragEnabled && "cursor-grab active:cursor-grabbing",
        className,
      )}
      style={{
        transform: `${style.transform} rotate(${item.rotation ?? 0}deg)`,
        touchAction: style.touchAction,
      }}
    >
      <div className="mb-2 flex items-start gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[var(--color-sticker-outline)] bg-[var(--color-paper-muted)]">
          <Image src={item.icon} alt="" width={36} height={36} className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0">
          <Stamp rotation={-3} className="!px-1.5 !py-0.5 !text-[10px]">
            {item.position}
          </Stamp>
          <h3 className="mt-1 text-xs font-semibold leading-snug text-[var(--color-ink)]">{item.event}</h3>
        </div>
      </div>
      <p className="text-xs leading-relaxed text-[var(--color-ink-muted)]">{item.highlight}</p>
      <div className="mt-3 flex gap-1.5">
        {linkIcons.map(({ key, Icon, label }) => {
          const href = item[key];
          if (!href) return null;
          return (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} for ${item.event}`}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--color-ink-subtle)]/25 text-[var(--color-ink-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
            >
              <Icon size={13} aria-hidden="true" />
            </a>
          );
        })}
      </div>
    </article>
  );
}

export function AchievementsSection() {
  return (
    <section id="achievements" aria-labelledby="achievements-heading" className="animate-fade-up">
      <SectionHeading
        id="achievements-heading"
        title="Achievements"
        accent="stuck on"
        onMat
        className="px-1"
      />
      <div
        className="achievement-scroll flex gap-4 overflow-x-auto px-1 pb-4 pt-2 snap-x snap-mandatory lg:gap-6"
        role="list"
      >
        {achievements.map((item, index) => (
          <AchievementCard
            key={item.id}
            item={item}
            draggable={index < 3}
            className="snap-start"
          />
        ))}
      </div>
    </section>
  );
}
