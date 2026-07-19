"use client";

import { createElement, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  getDisplayDomain,
  getFaviconUrl,
  getLinkIcon,
  getLocalFavicon,
} from "@/lib/linkIcons";

type LinkPreviewProps = {
  href: string;
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

function LinkIcon({ href }: { href: string }) {
  const [faviconFailed, setFaviconFailed] = useState(false);
  const brandIcon = getLinkIcon(href);
  const local = getLocalFavicon(href);

  if (brandIcon) {
    return createElement(brandIcon, {
      size: 20,
      "aria-hidden": true,
      className: "shrink-0 text-[var(--color-ink)]",
    });
  }

  if (local && !faviconFailed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={local}
        alt=""
        width={20}
        height={20}
        className="h-5 w-5 shrink-0 rounded-sm object-cover"
        onError={() => setFaviconFailed(true)}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={getFaviconUrl(href)}
      alt=""
      width={20}
      height={20}
      className="h-5 w-5 shrink-0 rounded-sm"
      onError={() => setFaviconFailed(true)}
    />
  );
}

export function LinkPreview({
  href,
  children,
  title,
  description,
  className,
}: LinkPreviewProps) {
  const domain = getDisplayDomain(href);

  return (
    <HoverCard openDelay={120} closeDelay={80}>
      <HoverCardTrigger asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className ?? "marker-link"}
        >
          {children}
        </a>
      </HoverCardTrigger>
      <HoverCardContent side="top" align="start" className="w-64">
        <div className="flex items-start gap-3 p-3">
          <LinkIcon href={href} />
          <div className="min-w-0">
            {title && (
              <p className="text-sm font-semibold leading-snug text-[var(--color-ink)]">
                {title}
              </p>
            )}
            {description && (
              <p className="mt-1 text-xs leading-relaxed text-[var(--color-ink-muted)]">
                {description}
              </p>
            )}
            <p className="mt-1.5 truncate text-xs text-[var(--color-ink-subtle)]">{domain}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export function MarkerLink(props: LinkPreviewProps) {
  return <LinkPreview {...props} className="marker-link" />;
}
