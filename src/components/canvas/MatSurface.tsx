import { cn } from "@/lib/utils";

type MatSurfaceProps = {
  variant?: "fixed" | "panel";
  className?: string;
  children?: React.ReactNode;
};

function RulerTicks({
  axis,
  count,
  majorEvery = 5,
}: {
  axis: "top" | "bottom" | "left" | "right";
  count: number;
  majorEvery?: number;
}) {
  const isHorizontal = axis === "top" || axis === "bottom";
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const isMajor = i % majorEvery === 0 && i > 0;
        const pos = 8 + i * (isHorizontal ? 52 : 48);
        if (isHorizontal) {
          return (
            <g key={`${axis}-${i}`}>
              <line
                x1={pos}
                y1={axis === "top" ? 6 : 794}
                x2={pos}
                y2={axis === "top" ? (isMajor ? 20 : 12) : isMajor ? 788 : 796}
                stroke="var(--color-grid-major)"
                strokeWidth="1"
              />
              {isMajor && (
                <text
                  x={pos}
                  y={axis === "top" ? 32 : 778}
                  textAnchor="middle"
                  fill="var(--color-grid-major)"
                  fontSize="9"
                  fontFamily="system-ui, sans-serif"
                >
                  {i}
                </text>
              )}
            </g>
          );
        }
        return (
          <g key={`${axis}-${i}`}>
            <line
              x1={axis === "left" ? 6 : 994}
              y1={pos}
              x2={axis === "left" ? (isMajor ? 20 : 12) : isMajor ? 988 : 996}
              y2={pos}
              stroke="var(--color-grid-major)"
              strokeWidth="1"
            />
            {isMajor && (
              <text
                x={axis === "left" ? 28 : 972}
                y={pos + 3}
                textAnchor="middle"
                fill="var(--color-grid-major)"
                fontSize="9"
                fontFamily="system-ui, sans-serif"
              >
                {i}
              </text>
            )}
          </g>
        );
      })}
    </>
  );
}

function MatSvgOverlay() {
  const degrees = [15, 30, 45, 60];
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.2]"
      preserveAspectRatio="none"
      viewBox="0 0 1000 800"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Diagonal guides */}
      <line x1="0" y1="800" x2="1000" y2="0" stroke="var(--color-grid-major)" strokeWidth="0.8" />
      <line x1="0" y1="680" x2="880" y2="0" stroke="var(--color-grid-major)" strokeWidth="0.6" />
      <line x1="120" y1="800" x2="1000" y2="120" stroke="var(--color-grid-major)" strokeWidth="0.6" />

      {/* Crosshair registration marks at major grid intersections */}
      {[240, 480, 720].map((x) =>
        [160, 320, 480, 640].map((y) => (
          <g key={`cross-${x}-${y}`}>
            <line x1={x - 6} y1={y} x2={x + 6} y2={y} stroke="var(--color-grid-major)" strokeWidth="0.8" />
            <line x1={x} y1={y - 6} x2={x} y2={y + 6} stroke="var(--color-grid-major)" strokeWidth="0.8" />
          </g>
        )),
      )}

      {/* Bottom-left degree arcs */}
      {degrees.map((deg, i) => {
        const r = 80 + i * 55;
        const endX = 80 + r * Math.cos(((90 - deg) * Math.PI) / 180);
        const endY = 720 - r * Math.sin(((90 - deg) * Math.PI) / 180);
        return (
          <g key={`bl-${deg}`}>
            <path
              d={`M 80 720 A ${r} ${r} 0 0 1 ${endX} ${endY}`}
              fill="none"
              stroke="var(--color-grid-major)"
              strokeWidth="1"
            />
            <text
              x={endX + 4}
              y={endY - 2}
              fill="var(--color-grid-major)"
              fontSize="10"
              fontFamily="system-ui, sans-serif"
            >
              {deg}°
            </text>
          </g>
        );
      })}

      {/* Bottom-right degree arcs */}
      {degrees.map((deg, i) => {
        const r = 80 + i * 55;
        const endX = 920 - r * Math.cos(((90 - deg) * Math.PI) / 180);
        const endY = 720 - r * Math.sin(((90 - deg) * Math.PI) / 180);
        return (
          <g key={`br-${deg}`}>
            <path
              d={`M 920 720 A ${r} ${r} 0 0 0 ${endX} ${endY}`}
              fill="none"
              stroke="var(--color-grid-major)"
              strokeWidth="1"
            />
            <text
              x={endX - 4}
              y={endY - 2}
              textAnchor="end"
              fill="var(--color-grid-major)"
              fontSize="10"
              fontFamily="system-ui, sans-serif"
            >
              {deg}°
            </text>
          </g>
        );
      })}

      <RulerTicks axis="top" count={18} />
      <RulerTicks axis="bottom" count={18} />
      <RulerTicks axis="left" count={14} />
      <RulerTicks axis="right" count={14} />

      {/* Faint cut scratches */}
      {[
        "M 180 220 L 195 235",
        "M 420 510 L 438 528",
        "M 680 180 L 698 198",
        "M 820 420 L 835 440",
        "M 310 680 L 325 695",
      ].map((d, i) => (
        <path
          key={`scratch-${i}`}
          d={d}
          fill="none"
          stroke="var(--color-grid-major)"
          strokeWidth="0.5"
          opacity="0.5"
        />
      ))}
    </svg>
  );
}

export function MatSurface({ variant = "fixed", className, children }: MatSurfaceProps) {
  const isFixed = variant === "fixed";

  return (
    <div
      className={cn(
        isFixed
          ? "pointer-events-none fixed inset-0 -z-10 overflow-hidden"
          : "relative overflow-hidden rounded-[var(--radius-xl)]",
        className,
      )}
      aria-hidden={isFixed ? true : undefined}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 120% 90% at 50% 45%, var(--color-mat) 0%, var(--color-mat-deep) 100%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-grid-minor) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-grid-minor) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-grid-major) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-grid-major) 1px, transparent 1px)
          `,
          backgroundSize: "120px 120px",
        }}
      />
      <MatSvgOverlay />
      {children}
    </div>
  );
}
