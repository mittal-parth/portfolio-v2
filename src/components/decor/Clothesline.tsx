"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { WashiTape } from "@/components/decor/PushPin";

const ROPE_PATH = "M 0 5 Q 50 30 100 5";
const ROPE_VIEW_H = 36;
const ROPE_Y_ANCHOR = 5;
const ROPE_Y_SAG = 30;

/** Clip spring sits here (ratio from top of visible peg after crop). */
const CLIP_SPRING_RATIO = 0.28;
/** How far the clip jaw overlaps the polaroid top below the wire. */
const CLIP_JAW_OVERLAP_PX = 22;

const WIRE_CONTAINER_H_PX = 64;

function wireYAtPercent(pct: number, containerPx: number): number {
  const t = pct / 100;
  const y =
    (1 - t) ** 2 * ROPE_Y_ANCHOR +
    2 * (1 - t) * t * ROPE_Y_SAG +
    t ** 2 * ROPE_Y_ANCHOR;
  return (y / ROPE_VIEW_H) * containerPx;
}

function slotWirePercent(index: number, total: number): number {
  if (total <= 1) return 50;
  return 10 + (index / (total - 1)) * 80;
}

/** Used for layout math after object-top crop. */
const CLIP_HEIGHT_PX = 88;

export function getHangingLayout(index: number, total: number) {
  const wireY = wireYAtPercent(slotWirePercent(index, total), WIRE_CONTAINER_H_PX);
  const springFromTop = CLIP_HEIGHT_PX * CLIP_SPRING_RATIO;

  return {
    marginTop: wireY + CLIP_JAW_OVERLAP_PX,
    clipTop: -(springFromTop + CLIP_JAW_OVERLAP_PX),
  };
}

export function Clothespin({ className }: { className?: string }) {
  return (
    <div className={cn("relative shrink-0", className)}>
      {/* grip shadow where jaws meet the polaroid */}
      <div
        className="absolute bottom-[8%] left-1/2 z-0 h-2.5 w-[72%] -translate-x-1/2 rounded-full bg-[var(--color-shadow)] opacity-65 blur-[4px]"
        aria-hidden="true"
      />
      <Image
        src="/clip.svg"
        alt=""
        width={88}
        height={140}
        className="relative z-[1] h-[5.5rem] w-12 object-cover object-top drop-shadow-[0_3px_4px_var(--color-clothespin-shadow)] sm:h-24 sm:w-[3.25rem]"
        aria-hidden="true"
      />
    </div>
  );
}

type ClotheslineProps = {
  children: React.ReactNode;
  className?: string;
  swapKey?: number;
};

function RopeWire() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 36"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="rope-roughness" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.45" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      <path
        d={ROPE_PATH}
        fill="none"
        stroke="var(--color-twine-shadow)"
        strokeWidth="2.4"
        strokeLinecap="round"
        transform="translate(0 0.6)"
      />
      <path
        d={ROPE_PATH}
        fill="none"
        stroke="var(--color-twine)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#rope-roughness)"
      />
      <path
        d={ROPE_PATH}
        fill="none"
        stroke="var(--color-twine-highlight)"
        strokeWidth="0.85"
        strokeLinecap="round"
        strokeDasharray="1.8 2.6 0.9 3.1"
        transform="translate(0 -0.25)"
      />
      <path
        d={ROPE_PATH}
        fill="none"
        stroke="var(--color-twine-fiber)"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeDasharray="0.4 1.8"
        transform="translate(0 0.35)"
      />
    </svg>
  );
}

export function Clothesline({ children, className, swapKey = 0 }: ClotheslineProps) {
  const edgeWireY = wireYAtPercent(4, WIRE_CONTAINER_H_PX);

  return (
    <div
      className={cn(
        "relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2",
        className,
      )}
    >
      <div
        key={swapKey}
        className="clothesline-swap relative px-1 sm:px-3 md:px-4"
        role="list"
        aria-live="polite"
      >
        {/* Rope behind clips (z-20), polaroids sit below in document flow */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-16"
          aria-hidden="true"
        >
          <RopeWire />

          <div
            className="absolute left-[3%] z-30"
            style={{ top: `${Math.max(edgeWireY - 8, 2)}px` }}
          >
            <WashiTape className="!relative !h-4 !w-14 opacity-80" rotation={-16} />
          </div>
          <div
            className="absolute right-[3%] z-30"
            style={{ top: `${Math.max(edgeWireY - 8, 2)}px` }}
          >
            <WashiTape className="!relative !h-4 !w-14 opacity-80" rotation={14} />
          </div>
        </div>

        <div className="relative flex items-start justify-center gap-0.5 sm:gap-1.5 md:gap-2.5 lg:gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}

type HangingSlotProps = {
  children: React.ReactNode;
  index: number;
  total?: number;
  className?: string;
};

export function HangingSlot({ children, index, total = 5, className }: HangingSlotProps) {
  const layout = getHangingLayout(index, total);

  return (
    <div
      className={cn(
        "flex min-w-0 max-w-[9.5rem] flex-1 flex-col items-center sm:max-w-[11rem] lg:max-w-[12.5rem]",
        className,
      )}
      style={{ marginTop: layout.marginTop }}
      role="listitem"
    >
      <div className="relative w-full">
        {/* Polaroid entirely below the rope */}
        <div className="relative z-10">{children}</div>

        {/* Clip straddles rope: mostly above, jaw grips polaroid top (z-30 over rope) */}
        <div
          className="pointer-events-none absolute left-1/2 z-30 -translate-x-1/2"
          style={{ top: layout.clipTop }}
        >
          <Clothespin />
        </div>
      </div>
    </div>
  );
}
