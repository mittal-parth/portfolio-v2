"use client";

import { Coffee, Pencil, Ruler, Scissors, Star } from "lucide-react";
import { useDraggable, useDraggableEnabled } from "@/components/decor/useDraggable";
import { cn } from "@/lib/utils";

const items = [
  { id: "scissors", Icon: Scissors, top: "12%", left: "3%", rotate: -12 },
  { id: "ruler", Icon: Ruler, top: "38%", left: "1%", rotate: 8 },
  { id: "pencil", Icon: Pencil, top: "62%", left: "4%", rotate: -6 },
  { id: "coffee", Icon: Coffee, top: "22%", right: "3%", rotate: 10 },
  { id: "star", Icon: Star, top: "52%", right: "2%", rotate: -14 },
];

function DraggableSticker({
  id,
  Icon,
  top,
  left,
  right,
  rotate,
  draggable,
}: {
  id: string;
  Icon: typeof Scissors;
  top: string;
  left?: string;
  right?: string;
  rotate: number;
  draggable: boolean;
}) {
  const { ref, style, dragHandlers } = useDraggable({ id, disabled: !draggable });

  return (
    <div
      ref={ref}
      {...(draggable ? dragHandlers : {})}
      className={cn(
        "absolute flex h-12 w-12 items-center justify-center rounded-xl border-4 border-[var(--color-sticker-outline)] bg-[var(--color-paper)] text-[var(--color-accent)] shadow-[3px_4px_0_var(--color-shadow)]",
        draggable && "active:cursor-grabbing",
      )}
      style={{
        top,
        left,
        right,
        transform: draggable
          ? `${style.transform} rotate(${rotate}deg)`
          : `rotate(${rotate}deg)`,
        touchAction: style.touchAction,
        cursor: draggable ? style.cursor : undefined,
      }}
    >
      <Icon size={20} strokeWidth={2.2} aria-hidden="true" />
    </div>
  );
}

export function ScatterDecor() {
  const draggable = useDraggableEnabled();

  return (
    <div className="pointer-events-none absolute inset-0 hidden xl:block" aria-hidden="true">
      <div className="pointer-events-auto absolute inset-0">
        {items.map(({ id, Icon, top, left, right, rotate }) => (
          <DraggableSticker
            key={id}
            id={id}
            Icon={Icon}
            top={top}
            left={left}
            right={right}
            rotate={rotate}
            draggable={draggable}
          />
        ))}
      </div>
    </div>
  );
}
