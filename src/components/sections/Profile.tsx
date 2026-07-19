"use client";

import Image from "next/image";
import {
  githubGraphConfig,
  introBullets,
  siteConfig,
  socialMedia,
} from "@/data/portfolio";
import { socialIconMap } from "@/lib/icons";
import { LinkPreview } from "@/components/ui/LinkPreview";
import type { IntroSegment } from "@/data/portfolio";
import { GitHubGraph } from "@/components/sections/GitHubGraph";
import { Polaroid, Stamp, StickyNote, TapedCard } from "@/components/decor/Decor";

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
      <div className="min-w-0 text-shadow-on-mat">
        <h1
          id="profile-heading"
          className="text-2xl font-semibold tracking-tight text-[var(--color-heading-on-mat)] sm:text-3xl"
        >
          {siteConfig.name}
        </h1>
        <p className="mt-1.5 font-hand text-xl text-[var(--color-accent-on-mat)] sm:text-2xl">
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

export function ProfileSection() {
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
        </Polaroid>

        <div className="min-w-0 space-y-4">
          <ProfileHeader />
          <StickyNote rotation={1.2} color="yellow">
            <IntroList />
          </StickyNote>
          <TapedCard rotation={-0.4} className="w-fit max-w-full [&>div]:p-3">
            <GitHubGraph username={siteConfig.githubUsername} {...githubGraphConfig} />
          </TapedCard>
        </div>
      </div>
    </section>
  );
}
