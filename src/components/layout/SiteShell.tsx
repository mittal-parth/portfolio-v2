"use client";

import { useEffect } from "react";
import { CanvasBackground } from "@/components/canvas/CanvasBackground";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { Footer } from "@/components/layout/Footer";
import { ScatterDecor } from "@/components/decor/ScatterDecor";
import { ProfileSection } from "@/components/sections/Profile";
import { TimelineSection } from "@/components/sections/Timeline";
import { AchievementsSection } from "@/components/sections/Achievements";
import { ProjectsSection } from "@/components/sections/Projects";
import {
  LayoutModeProvider,
  useLayoutMode,
} from "@/components/layout/LayoutModeProvider";
import { cn } from "@/lib/utils";

function SiteContent() {
  const { mode } = useLayoutMode();

  useEffect(() => {
    document.body.dataset.layout = mode;
  }, [mode]);

  return (
    <>
      {mode === "canvas" && <CanvasBackground />}
      <div
        className={cn(
          "relative mx-auto min-h-screen w-full px-4 py-6 sm:px-6",
          mode === "canvas" ? "max-w-[var(--content-max-canvas)]" : "max-w-[var(--content-max-clean)]",
        )}
      >
        {mode === "canvas" && <ScatterDecor />}
        <FloatingNav />
        <main className="space-y-[var(--space-2xl)] lg:space-y-[var(--space-3xl)]">
          <ProfileSection />
          <TimelineSection />
          <AchievementsSection />
          <ProjectsSection />
        </main>
        <Footer />
      </div>
    </>
  );
}

export function SiteShell() {
  return (
    <LayoutModeProvider>
      <SiteContent />
    </LayoutModeProvider>
  );
}
