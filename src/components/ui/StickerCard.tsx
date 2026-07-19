import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type StickerCardProps = {
  children: ReactNode;
  className?: string;
  rotation?: number;
  as?: "div" | "article" | "section";
  id?: string;
} & React.HTMLAttributes<HTMLElement>;

export function StickerCard({
  children,
  className,
  rotation = -1.2,
  as: Tag = "div",
  id,
  style,
  ...props
}: StickerCardProps) {
  return (
    <Tag
      id={id}
      className={cn("sticker-card rounded-[var(--radius-xl)] p-[var(--space-lg)]", className)}
      style={{ transform: `rotate(${rotation}deg)`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}
