"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type FocusEvent, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

type TooltipState = {
  text: string;
  x: number;
  y: number;
};

export type GitHubGraphProps = {
  username: string;
  months?: number;
  cellSize?: number;
  cellGap?: number;
  showLegend?: boolean;
  showWeekdayLabels?: boolean;
  showMonthLabels?: boolean;
  colors?: string[];
  className?: string;
};

const DEFAULT_COLORS = [
  "var(--color-gh-0)",
  "var(--color-gh-1)",
  "var(--color-gh-2)",
  "var(--color-gh-3)",
  "var(--color-gh-4)",
];

const WEEKDAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
const ESTIMATED_WEEKS = 53;
const MOBILE_BREAKPOINT = "(max-width: 1023px)";
const MOBILE_GRAPH = {
  months: 7,
  cellSize: 8,
  cellGap: 2,
  showWeekdayLabels: false,
} as const;

function useMobileGraphLayout() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia(MOBILE_BREAKPOINT);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(MOBILE_BREAKPOINT).matches,
    () => false,
  );
}

function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function ordinal(day: number): string {
  if (day >= 11 && day <= 13) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

function formatContributionDate(dateStr: string): string {
  const date = parseDate(dateStr);
  const month = date.toLocaleString("en", { month: "short" });
  return `${ordinal(date.getDate())} ${month} ${date.getFullYear()}`;
}

function formatTooltip(dateStr: string, count: number): string {
  const noun = count === 1 ? "contribution" : "contributions";
  return `${count} ${noun} on ${formatContributionDate(dateStr)}`;
}

function levelFromCount(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function buildWeeks(days: ContributionDay[]) {
  if (days.length === 0) return [] as (ContributionDay | null)[][];
  const weeksCount = Math.ceil(days.length / 7);
  const weeks: (ContributionDay | null)[][] = Array.from({ length: weeksCount }, () =>
    Array.from({ length: 7 }, () => null),
  );
  days.forEach((day, index) => {
    const week = Math.floor(index / 7);
    const weekday = index % 7;
    if (week < weeksCount) weeks[week][weekday] = day;
  });
  return weeks;
}

function getMonthLabels(weeks: (ContributionDay | null)[][]) {
  const labels: { weekIndex: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const firstDay = week.find((d) => d !== null);
    if (!firstDay) return;
    const month = parseDate(firstDay.date).getMonth();
    if (month !== lastMonth) {
      labels.push({
        weekIndex: wi,
        label: parseDate(firstDay.date).toLocaleString("en", { month: "short" }),
      });
      lastMonth = month;
    }
  });
  return labels;
}

export function GitHubGraph({
  username,
  months = 12,
  cellSize = 11,
  cellGap = 3,
  showLegend = true,
  showWeekdayLabels = true,
  showMonthLabels = true,
  colors = DEFAULT_COLORS,
  className,
}: GitHubGraphProps) {
  const isMobileLayout = useMobileGraphLayout();
  const gridRef = useRef<HTMLDivElement>(null);
  const [days, setDays] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const resolvedMonths = isMobileLayout ? MOBILE_GRAPH.months : months;
  const resolvedCellSize = isMobileLayout ? MOBILE_GRAPH.cellSize : cellSize;
  const resolvedCellGap = isMobileLayout ? MOBILE_GRAPH.cellGap : cellGap;
  const resolvedShowWeekdayLabels = isMobileLayout
    ? MOBILE_GRAPH.showWeekdayLabels
    : showWeekdayLabels;

  useEffect(() => {
    const controller = new AbortController();
    async function fetchContributions() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = (await res.json()) as {
          contributions?: Array<{ date: string; count: number; level?: number }>;
        };
        setDays(
          (data.contributions ?? []).map((item) => ({
            date: item.date,
            count: item.count,
            level: item.level ?? levelFromCount(item.count),
          })),
        );
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Could not load GitHub activity.");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchContributions();
    return () => controller.abort();
  }, [username]);

  const visibleDays = useMemo(() => {
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - resolvedMonths);
    cutoff.setHours(0, 0, 0, 0);
    return days.filter((day) => parseDate(day.date) >= cutoff);
  }, [days, resolvedMonths]);

  const weeks = useMemo(() => buildWeeks(visibleDays), [visibleDays]);
  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks]);

  const weekCount = weeks.length || (isMobileLayout ? 31 : ESTIMATED_WEEKS);
  const labelWidth = resolvedShowWeekdayLabels ? 28 : 0;
  const gridWidth = weekCount * (resolvedCellSize + resolvedCellGap) - resolvedCellGap;
  const gridHeight = 7 * resolvedCellSize + 6 * resolvedCellGap;
  const cellStyle = { width: resolvedCellSize, height: resolvedCellSize };

  function showTooltip(
    target: HTMLElement,
    text: string,
  ) {
    const grid = gridRef.current;
    if (!grid) return;
    const gridRect = grid.getBoundingClientRect();
    const cellRect = target.getBoundingClientRect();
    setTooltip({
      text,
      x: cellRect.left - gridRect.left + cellRect.width / 2,
      y: cellRect.top - gridRect.top - 4,
    });
  }

  function handleCellMouseEnter(
    event: MouseEvent<HTMLElement>,
    dateStr: string,
    count: number,
  ) {
    showTooltip(event.currentTarget, formatTooltip(dateStr, count));
  }

  function handleCellFocus(event: FocusEvent<HTMLElement>, dateStr: string, count: number) {
    showTooltip(event.currentTarget, formatTooltip(dateStr, count));
  }

  return (
    <div className={cn("w-full max-w-full lg:w-fit", className)} aria-label={`GitHub contributions for ${username}`}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <p className="text-xs font-medium text-[var(--color-ink-muted)]">GitHub activity</p>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--color-ink-subtle)] hover:text-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
        >
          @{username}
        </a>
      </div>

      {loading && (
        <div
          className="animate-pulse rounded-[var(--radius-md)] bg-[var(--color-paper-muted)]"
          style={{ width: gridWidth + labelWidth + 4, height: gridHeight + (showLegend ? 24 : 0) }}
        />
      )}
      {error && !loading && (
        <p className="text-xs text-[var(--color-ink-muted)]">{error}</p>
      )}

      {!loading && !error && weeks.length > 0 && (
        <>
          {showMonthLabels && (
            <div className="flex gap-1">
              {resolvedShowWeekdayLabels && <div className="shrink-0" style={{ width: labelWidth }} />}
              <div
                className="relative mb-1.5 h-3.5 text-[10px] leading-none text-[var(--color-ink-subtle)]"
                style={{ width: gridWidth }}
              >
                {monthLabels.map(({ weekIndex, label }) => (
                  <span
                    key={`${label}-${weekIndex}`}
                    className="absolute top-0 whitespace-nowrap"
                    style={{ left: weekIndex * (resolvedCellSize + resolvedCellGap) }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div
            ref={gridRef}
            className="relative flex w-full gap-1 overflow-x-visible"
            onMouseLeave={() => setTooltip(null)}
          >
            {resolvedShowWeekdayLabels && (
              <div
                className="flex shrink-0 flex-col justify-between py-0.5 text-[9px] leading-none text-[var(--color-ink-subtle)]"
                style={{ width: labelWidth, height: gridHeight }}
              >
                {WEEKDAY_LABELS.map((lbl, i) => (
                  <span key={i} style={{ height: resolvedCellSize }}>
                    {lbl}
                  </span>
                ))}
              </div>
            )}

            <div className="inline-flex shrink-0" style={{ gap: resolvedCellGap }}>
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col" style={{ gap: resolvedCellGap }}>
                  {week.map((day, di) =>
                    day ? (
                      <div
                        key={day.date}
                        className="rounded-[2px] hover:ring-1 hover:ring-[var(--color-ink)]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
                        style={{
                          ...cellStyle,
                          backgroundColor: colors[Math.min(day.level, 4)],
                        }}
                        role="img"
                        aria-label={formatTooltip(day.date, day.count)}
                        onMouseEnter={(event) => handleCellMouseEnter(event, day.date, day.count)}
                        onFocus={(event) => handleCellFocus(event, day.date, day.count)}
                        onBlur={() => setTooltip(null)}
                        tabIndex={0}
                      />
                    ) : (
                      <div key={`e-${wi}-${di}`} style={cellStyle} aria-hidden="true" />
                    ),
                  )}
                </div>
              ))}
            </div>

            {tooltip && (
              <div
                role="tooltip"
                className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-[4px] bg-[var(--color-ink)] px-2 py-1.5 text-[10px] leading-none text-[var(--color-paper)] shadow-[0_4px_12px_var(--color-shadow)]"
                style={{ left: tooltip.x, top: tooltip.y }}
              >
                {tooltip.text}
              </div>
            )}
          </div>

          {showLegend && (
            <div className="mt-1.5 flex items-center justify-end gap-1.5 text-[10px] text-[var(--color-ink-subtle)]">
              <span>Less</span>
              {colors.map((c, i) => (
                <div
                  key={i}
                  className="rounded-[2px]"
                  style={{ ...cellStyle, backgroundColor: c }}
                  aria-hidden="true"
                />
              ))}
              <span>More</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
