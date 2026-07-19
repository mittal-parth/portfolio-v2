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

function SocialStamps() {
  return (
    <div className="flex items-center gap-0.5 sm:gap-1">
      {socialMedia.map((social) => {
        const Icon = socialIconMap[social.platform];
        return (
          <Stamp
            key={social.id}
            rotation={social.platform === "github" ? 3 : -3}
            className="!border !px-1 !py-0.5 sm:!border-2 sm:!px-1.5 sm:!py-1"
          >
            <a
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex h-4 w-4 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] sm:h-6 sm:w-6"
            >
              <Icon className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
            </a>
          </Stamp>
        );
      })}
    </div>
  );
}

function MobileTagline() {
  const breakToken = " · NITK'24";
  const breakIndex = siteConfig.tagline.indexOf(breakToken);

  if (breakIndex === -1) {
    return siteConfig.tagline;
  }

  return (
    <>
      {siteConfig.tagline.slice(0, breakIndex)}
      <br />
      {siteConfig.tagline.slice(breakIndex + 3)}
    </>
  );
}

function ProfileHeader() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 lg:items-start lg:gap-x-3">
      <h1
        id="profile-heading"
        className="col-start-1 row-start-1 min-w-0 text-xl font-semibold leading-none tracking-tight text-shadow-on-mat text-[var(--color-heading-on-mat)] sm:text-2xl lg:text-3xl"
      >
        {siteConfig.name}
      </h1>
      <div className="col-start-2 row-start-1 self-center lg:self-start">
        <SocialStamps />
      </div>
      <p className="col-start-1 row-start-2 mt-1.5 hidden font-hand leading-snug text-[var(--color-accent-on-mat)] lg:block lg:text-lg">
        {siteConfig.tagline}
      </p>
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
      <div className="flex flex-col gap-3 sm:gap-4 lg:grid lg:grid-cols-[minmax(0,11rem)_1fr] lg:items-start lg:gap-6">
        <div className="flex items-start gap-3 lg:contents">
          <Polaroid
            rotation={-4}
            pinned
            className="w-fit shrink-0 !rotate-[-2deg] !p-1.5 !pb-5 sm:!p-2 sm:!pb-6 lg:col-start-1 lg:row-start-1 lg:row-span-3 lg:!rotate-[-4deg] lg:!pb-8"
          >
            <Image
              src="/assets/profile-pic.jpg"
              alt="Parth Mittal"
              width={140}
              height={140}
              className="h-16 w-16 object-cover sm:h-20 sm:w-20 lg:h-[8.75rem] lg:w-[8.75rem]"
              priority
            />
          </Polaroid>

          <div className="min-w-0 flex-1 lg:col-start-2 lg:row-start-1">
            <ProfileHeader />
            <p className="mt-3 block w-full font-hand text-base leading-snug text-[var(--color-accent-on-mat)] lg:hidden">
              <MobileTagline />
            </p>
          </div>
        </div>

        <StickyNote
          rotation={1.2}
          color="yellow"
          className="mt-[2pt] w-full max-lg:!rotate-0 p-3 sm:p-4 lg:col-start-2 lg:row-start-2 lg:mt-0 lg:p-4"
        >
          <IntroList />
        </StickyNote>

        <TapedCard
          rotation={-0.4}
          className="w-full max-lg:!rotate-0 lg:col-start-2 lg:row-start-3 lg:w-fit lg:max-w-full [&>div]:p-3"
        >
          <GitHubGraph username={siteConfig.githubUsername} {...githubGraphConfig} className="w-full min-w-0" />
        </TapedCard>
      </div>
    </section>
  );
}
