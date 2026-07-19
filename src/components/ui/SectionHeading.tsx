import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  title: string;
  accent?: string;
  className?: string;
  onMat?: boolean;
};

export function SectionHeading({
  id,
  title,
  accent,
  className,
  onMat = false,
}: SectionHeadingProps) {
  const textColor = onMat
    ? "text-[var(--color-heading-on-mat)]"
    : "text-[var(--color-ink)]";
  const accentColor = onMat
    ? "text-[var(--color-on-mat)]"
    : "text-[var(--color-accent)]";
  const ruleColor = onMat ? "bg-[var(--color-on-mat)]" : "bg-[var(--color-accent)]";

  return (
    <div
      className={cn("mb-[var(--space-lg)]", onMat && "text-shadow-on-mat", className)}
    >
      <h2
        id={id}
        className={cn("text-xl font-semibold tracking-tight sm:text-2xl", textColor)}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
        {accent && (
          <>
            {" "}
            <span className={cn("font-hand text-[1.08em]", accentColor)}>{accent}</span>
          </>
        )}
      </h2>
      <div className={cn("mt-2 h-0.5 w-10 rounded-full", ruleColor)} aria-hidden="true" />
    </div>
  );
}
