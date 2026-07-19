import type { IconType } from "react-icons";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";

const domainIcons: Record<string, IconType> = {
  "linkedin.com": AiFillLinkedin,
  "github.com": AiFillGithub,
  "twitter.com": AiOutlineTwitter,
  "x.com": AiOutlineTwitter,
  "youtube.com": AiFillYoutube,
  "youtu.be": AiFillYoutube,
};

const localFavicons: Record<string, string> = {
  "oracle.com": "/assets/favicons/oracle.svg",
  "nitk.ac.in": "/assets/favicons/nitk.svg",
  "iris.nitk.ac.in": "/assets/favicons/iris.svg",
  "about.iris.nitk.ac.in": "/assets/favicons/iris.svg",
  "polkadot.academy": "/assets/favicons/pba.svg",
};

export function getDomain(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

export function getLinkIcon(href: string): IconType | null {
  const domain = getDomain(href);
  for (const [key, icon] of Object.entries(domainIcons)) {
    if (domain === key || domain.endsWith(`.${key}`)) return icon;
  }
  return null;
}

export function getLocalFavicon(href: string): string | null {
  const domain = getDomain(href);
  for (const [key, path] of Object.entries(localFavicons)) {
    if (domain === key || domain.endsWith(`.${key}`)) return path;
  }
  return null;
}

export function getFaviconUrl(href: string): string {
  const domain = getDomain(href);
  return `https://icons.duckduckgo.com/ip3/${domain}.ico`;
}

export function getDisplayDomain(href: string): string {
  return getDomain(href);
}
