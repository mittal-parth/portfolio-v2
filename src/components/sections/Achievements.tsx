"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Award, ExternalLink, Medal, Newspaper, RotateCw, Trophy } from "lucide-react";
import { AiFillGithub, AiFillYoutube } from "@/lib/icons";
import { achievements, type Achievement } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Polaroid } from "@/components/decor/Decor";
import { Clothesline, HangingSlot } from "@/components/decor/Clothesline";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 5;
const PAGE_COUNT = Math.ceil(achievements.length / PAGE_SIZE);

const linkIcons = [
  { key: "article" as const, Icon: Newspaper, label: "Article" },
  { key: "project" as const, Icon: ExternalLink, label: "Project" },
  { key: "youtube" as const, Icon: AiFillYoutube, label: "YouTube" },
  { key: "github" as const, Icon: AiFillGithub, label: "GitHub" },
];

type MedalTier = "gold" | "silver" | "bronze" | "neutral";

function getMedalTier(position: string): MedalTier {
  const p = position.toLowerCase();
  if (/\bwinner\b/.test(p) && !/runner/.test(p)) return "gold";
  if (/1st runner|runners up/.test(p)) return "silver";
  if (/2nd runner|\brunner up\b/.test(p)) return "bronze";
  return "neutral";
}

const medalStyles: Record<MedalTier, { Icon: typeof Trophy; color: string }> = {
  gold: { Icon: Trophy, color: "var(--color-medal-gold)" },
  silver: { Icon: Medal, color: "var(--color-medal-silver)" },
  bronze: { Icon: Medal, color: "var(--color-medal-bronze)" },
  neutral: { Icon: Award, color: "var(--color-ink-muted)" },
};

function PositionBadge({ position }: { position: string }) {
  const tier = getMedalTier(position);
  const { Icon, color } = medalStyles[tier];

  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium leading-none text-[var(--color-ink-muted)]">
      <Icon size={11} strokeWidth={2.25} style={{ color }} aria-hidden="true" />
      <span className="line-clamp-1">{position}</span>
    </span>
  );
}

function AchievementPolaroid({ item }: { item: Achievement }) {
  const imageSrc = item.photo ?? item.icon;
  const hasPhoto = Boolean(item.photo);

  return (
    <Polaroid
      rotation={item.rotation ?? 0}
      image={
        hasPhoto ? (
          <Image
            src={imageSrc}
            alt=""
            width={200}
            height={200}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src={item.icon}
              alt=""
              width={48}
              height={48}
              className="h-10 w-10 object-contain opacity-40 sm:h-12 sm:w-12"
            />
          </div>
        )
      }
      caption={
        <>
          <PositionBadge position={item.position} />
          <h3 className="mt-1 line-clamp-2 text-[10px] font-semibold leading-snug text-[var(--color-ink)] sm:text-xs">
            {item.event}
          </h3>
          <p className="mt-0.5 line-clamp-2 text-[9px] leading-relaxed text-[var(--color-ink-muted)] sm:text-[10px]">
            {item.highlight}
          </p>
        </>
      }
      footer={
        <div className="mt-1.5 flex flex-wrap gap-1">
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
                className="flex h-5 w-5 items-center justify-center rounded border border-[var(--color-ink-subtle)]/25 text-[var(--color-ink-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-focus)] sm:h-6 sm:w-6"
              >
                <Icon size={10} aria-hidden="true" />
              </a>
            );
          })}
        </div>
      }
    />
  );
}

export function AchievementsSection() {
  const [page, setPage] = useState(0);

  useEffect(() => {
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith("drag-pos-ach-")) {
        localStorage.removeItem(key);
      }
    }
  }, []);

  const visible = achievements.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="relative animate-fade-up pb-9 sm:pb-10"
    >
      <SectionHeading
        id="achievements-heading"
        title="Achievements"
        accent="stuck on"
        onMat
        className="px-1"
      />

      <Clothesline swapKey={page}>
        {visible.map((item, index) => (
          <HangingSlot key={item.id} index={index} total={visible.length}>
            <AchievementPolaroid item={item} />
          </HangingSlot>
        ))}
      </Clothesline>

      {PAGE_COUNT > 1 && (
        <button
          type="button"
          onClick={() => setPage((p) => (p + 1) % PAGE_COUNT)}
          aria-label={page === 0 ? "Show more wins" : "Show earlier wins"}
          className={cn(
            "clothesline-swap-btn absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full",
            "border border-[var(--color-on-mat)]/12 bg-[var(--color-paper)]/50 text-[var(--color-on-mat)]/50 backdrop-blur-[2px]",
            "hover:border-[var(--color-on-mat)]/25 hover:bg-[var(--color-paper)]/75 hover:text-[var(--color-on-mat)]/80",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
            "active:scale-95",
          )}
        >
          <RotateCw size={14} strokeWidth={2.25} aria-hidden="true" />
        </button>
      )}
    </section>
  );
}
