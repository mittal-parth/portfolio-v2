import { Coffee, Pencil, Ruler, Scissors, Star } from "lucide-react";

const stickers = [
  { Icon: Scissors, top: "18%", left: "4%", rotate: -12, label: "Scissors sticker" },
  { Icon: Ruler, top: "42%", left: "2%", rotate: 8, label: "Ruler sticker" },
  { Icon: Pencil, top: "68%", left: "5%", rotate: -6, label: "Pencil sticker" },
  { Icon: Coffee, top: "28%", right: "4%", rotate: 10, label: "Coffee sticker" },
  { Icon: Star, top: "58%", right: "3%", rotate: -14, label: "Star sticker" },
];

export function MarginStickers() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden xl:block" aria-hidden="true">
      {stickers.map(({ Icon, top, left, right, rotate, label }) => (
        <div
          key={label}
          className="absolute flex h-12 w-12 items-center justify-center rounded-xl border-4 border-[var(--color-sticker-outline)] bg-[var(--color-paper)] text-[var(--color-accent)] shadow-[3px_4px_0_var(--color-shadow)]"
          style={{
            top,
            left,
            right,
            transform: `rotate(${rotate}deg)`,
          }}
        >
          <Icon size={20} strokeWidth={2.2} aria-hidden="true" />
        </div>
      ))}
    </div>
  );
}
