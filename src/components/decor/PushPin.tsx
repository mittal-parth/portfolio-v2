import { cn } from "@/lib/utils";

export function PushPin({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute -top-2 left-1/2 z-10 h-4 w-4 -translate-x-1/2 rotate-[12deg]",
        className,
      )}
      aria-hidden="true"
    >
      <div className="mx-auto h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_1px_2px_var(--color-shadow)]" />
      <div className="mx-auto h-1.5 w-0.5 bg-[var(--color-ink-subtle)]" />
    </div>
  );
}

export function WashiTape({ className, rotation = -8 }: { className?: string; rotation?: number }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute h-5 w-16 bg-[var(--color-marker)] opacity-70",
        className,
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true"
    />
  );
}
