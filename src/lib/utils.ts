import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Deterministic hue from a string seed for placeholder thumbnails. */
export function seedHue(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

export function placeholderGradient(seed: string): string {
  const h = seedHue(seed);
  return `linear-gradient(135deg, oklch(55% 0.12 ${h}), oklch(42% 0.1 ${(h + 40) % 360}))`;
}
