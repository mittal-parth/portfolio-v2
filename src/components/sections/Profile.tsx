"use client";

import Image from "next/image";
import {
  introBullets,
  siteConfig,
  socialMedia,
} from "@/data/portfolio";
import { socialIconMap } from "@/lib/icons";
import { LinkPreview } from "@/components/ui/LinkPreview";
import type { IntroSegment } from "@/data/portfolio";
import { GitHubGraph } from "@/components/sections/GitHubGraph";
import { Polaroid, Stamp, StickyNote, TapedCard } from "@/components/decor/Decor";
import { useLayoutMode } from "@/components/layout/LayoutModeProvider";

function renderSegment(segment: IntroSegment, key: number) {
  switch (segment.type) {
    case "text":
      return <span key={key}>{segment.value}</span>;
    case "hand":
      return (
        <span key={key} className="font-hand text-[var(--color-accent)]">
          {segment.value}
        </span>
      );
    case "link":
      return (
        <LinkPreview
          key={key}
          href={segment.href}
          title={segment.previewTitle ?? segment.label}
          description={segment.previewDescription}
        >
          {segment.label}
        </LinkPreview>
      );
    default:
      return null;
  }
}

function ProfileHeader() {
  return (
    <div className="mb-3 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-sm text-[var(--color-ink-muted)]">
          Hi, I&apos;m{" "}
          <span className="font-semibold text-[var(--color-ink)]">{siteConfig.name}</span>{" "}
          <span aria-hidden="true">👋</span>
        </p>
        <p className="mt-0.5 font-hand text-base text-[var(--color-accent)]">
          {siteConfig.tagline}
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
        {socialMedia.map((social) => {
          const Icon = socialIconMap[social.platform];
          return (
            <Stamp key={social.id} rotation={social.platform === "github" ? 4 : -5} className="!px-1.5 !py-1">
              <a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-6 w-6 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
              >
                <Icon size={14} aria-hidden="true" />
              </a>
            </Stamp>
          );
        })}
      </div>
    </div>
  );
}

function IntroList() {
  return (
    <ul className="space-y-1.5 text-xs leading-relaxed text-[var(--color-ink-muted)] sm:text-sm">
      {introBullets.map((bullet) => (
        <li key={bullet.id} className="flex gap-2">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
          <span>{bullet.segments.map((segment, i) => renderSegment(segment, i))}</span>
        </li>
      ))}
    </ul>
  );
}

function CleanProfile() {
  return (
    <section id="profile" aria-labelledby="profile-heading" className="clean-section animate-fade-up">
      <div className="mb-4 flex items-start gap-4">
        <Image
          src="/assets/profile-pic.jpg"
          alt="Parth Mittal"
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 rounded-[var(--radius-squircle)] border-2 border-[var(--color-sticker-outline)] object-cover"
          priority
        />
        <div className="min-w-0 flex-1">
          <h1 id="profile-heading" className="text-xl font-bold text-[var(--color-ink)]">
            {siteConfig.name}
          </h1>
          <p className="text-sm text-[var(--color-ink-muted)]">{siteConfig.role}</p>
          <div className="mt-2 flex gap-2">
            {socialMedia.map((social) => {
              const Icon = socialIconMap[social.platform];
              return (
                <a
                  key={social.id}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-[var(--color-ink-muted)] hover:text-[var(--color-accent)]"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <IntroList />
      <div className="mt-4 border-t border-[var(--color-paper-muted)] pt-4">
        <GitHubGraph
          username={siteConfig.githubUsername}
          showLegend
          showWeekdayLabels
          showMonthLabels
        />
      </div>
    </section>
  );
}

function CanvasProfile() {
  return (
    <section id="profile" aria-labelledby="profile-heading" className="animate-fade-up">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,11rem)_1fr] lg:items-start">
        <Polaroid rotation={-4} pinned className="mx-auto w-fit lg:mx-0">
          <Image
            src="/assets/profile-pic.jpg"
            alt="Parth Mittal"
            width={140}
            height={140}
            className="h-[8.75rem] w-[8.75rem] object-cover"
            priority
          />
          <p className="mt-2 text-center font-hand text-sm text-[var(--color-ink-muted)]">
            {siteConfig.name}
          </p>
        </Polaroid>

        <div className="min-w-0 space-y-4">
          <ProfileHeader />
          <StickyNote rotation={1.2} color="yellow">
            <IntroList />
          </StickyNote>
          <TapedCard rotation={-0.4}>
            <GitHubGraph
              username={siteConfig.githubUsername}
              showLegend
              showWeekdayLabels
              showMonthLabels
              cellSize={11}
            />
          </TapedCard>
        </div>
      </div>
    </section>
  );
}

export function ProfileSection() {
  const { mode } = useLayoutMode();
  return mode === "canvas" ? <CanvasProfile /> : <CleanProfile />;
}
