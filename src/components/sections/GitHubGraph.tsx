"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type ContributionDay = {
  date: string;
  count: number;
  level: number;
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
};

const DEFAULT_COLORS = [
  "var(--color-gh-0)",
  "var(--color-gh-1)",
  "var(--color-gh-2)",
  "var(--color-gh-3)",
  "var(--color-gh-4)",
];

const WEEKDAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

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
    const month = new Date(firstDay.date).getMonth();
    if (month !== lastMonth) {
      labels.push({
        weekIndex: wi,
        label: new Date(firstDay.date).toLocaleString("en", { month: "short" }),
      });
      lastMonth = month;
    }
  });
  return labels;
}

export function GitHubGraph({
  username,
  months = 6,
  cellSize = 12,
  cellGap = 3,
  showLegend = true,
  showWeekdayLabels = true,
  showMonthLabels = true,
  colors = DEFAULT_COLORS,
}: GitHubGraphProps) {
  const [days, setDays] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<string | null>(null);

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
    cutoff.setMonth(cutoff.getMonth() - months);
    return days.filter((day) => new Date(day.date) >= cutoff);
  }, [days, months]);

  const weeks = useMemo(() => buildWeeks(visibleDays), [visibleDays]);
  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks]);

  const labelWidth = showWeekdayLabels ? 28 : 0;
  const gridWidth = weeks.length * (cellSize + cellGap);

  return (
    <div aria-label={`GitHub contributions for ${username}`}>
      <div className="mb-2 flex items-baseline justify-between gap-2">
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
        <div className="h-20 animate-pulse rounded-[var(--radius-md)] bg-[var(--color-paper-muted)]" />
      )}
      {error && !loading && (
        <p className="text-xs text-[var(--color-ink-muted)]">{error}</p>
      )}

      {!loading && !error && (
        <>
          {showMonthLabels && (
            <div
              className="relative mb-1 text-[10px] text-[var(--color-ink-subtle)]"
              style={{ marginLeft: labelWidth, width: gridWidth }}
            >
              {monthLabels.map(({ weekIndex, label }) => (
                <span
                  key={`${label}-${weekIndex}`}
                  className="absolute top-0"
                  style={{ left: weekIndex * (cellSize + cellGap) }}
                >
                  {label}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-1 overflow-x-auto pb-1">
            {showWeekdayLabels && (
              <div
                className="flex shrink-0 flex-col justify-between py-0.5 text-[9px] leading-none text-[var(--color-ink-subtle)]"
                style={{ width: labelWidth, gap: cellGap, height: 7 * cellSize + 6 * cellGap }}
              >
                {WEEKDAY_LABELS.map((lbl, i) => (
                  <span key={i} style={{ height: cellSize }}>
                    {lbl}
                  </span>
                ))}
              </div>
            )}

            <div className="inline-flex" style={{ gap: cellGap }}>
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col" style={{ gap: cellGap }}>
                  {week.map((day, di) =>
                    day ? (
                      <div
                        key={day.date}
                        className={cn("rounded-[2px]")}
                        style={{
                          width: cellSize,
                          height: cellSize,
                          backgroundColor: colors[Math.min(day.level, 4)],
                        }}
                        role="img"
                        aria-label={`${day.date}: ${day.count} contributions`}
                        onMouseEnter={() =>
                          setTooltip(
                            `${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`,
                          )
                        }
                        onMouseLeave={() => setTooltip(null)}
                        onFocus={() =>
                          setTooltip(
                            `${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`,
                          )
                        }
                        onBlur={() => setTooltip(null)}
                        tabIndex={0}
                      />
                    ) : (
                      <div key={`e-${wi}-${di}`} style={{ width: cellSize, height: cellSize }} />
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>

          {tooltip && (
            <p className="mt-1 text-[10px] text-[var(--color-ink-subtle)]" aria-live="polite">
              {tooltip}
            </p>
          )}

          {showLegend && (
            <div className="mt-2 flex items-center justify-end gap-1.5 text-[10px] text-[var(--color-ink-subtle)]">
              <span>Less</span>
              {colors.map((c, i) => (
                <div
                  key={i}
                  className="rounded-[2px]"
                  style={{ width: cellSize, height: cellSize, backgroundColor: c }}
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
