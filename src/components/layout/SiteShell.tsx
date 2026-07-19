"use client";

import { CanvasBackground } from "@/components/canvas/CanvasBackground";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { Footer } from "@/components/layout/Footer";
import { ScatterDecor } from "@/components/decor/ScatterDecor";
import { ProfileSection } from "@/components/sections/Profile";
import { TimelineSection } from "@/components/sections/Timeline";
import { AchievementsSection } from "@/components/sections/Achievements";
import { ProjectsSection } from "@/components/sections/Projects";

export function SiteShell() {
  return (
    <>
      <CanvasBackground />
      <div className="relative mx-auto min-h-screen w-full max-w-[var(--content-max-canvas)] px-4 py-6 sm:px-6">
        <ScatterDecor />
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
