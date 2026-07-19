"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";

export type LayoutMode = "canvas" | "clean";

const STORAGE_KEY = "portfolio-layout-mode";

type LayoutModeContextValue = {
  mode: LayoutMode;
  setMode: (mode: LayoutMode) => void;
};

const LayoutModeContext = createContext<LayoutModeContextValue | null>(null);

let listeners: Array<() => void> = [];

function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function notify() {
  listeners.forEach((l) => l());
}

function getSnapshot(): LayoutMode {
  if (typeof window === "undefined") return "canvas";
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "clean" ? "clean" : "canvas";
}

function getServerSnapshot(): LayoutMode {
  return "canvas";
}

export function LayoutModeProvider({ children }: { children: React.ReactNode }) {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setMode = useCallback((next: LayoutMode) => {
    localStorage.setItem(STORAGE_KEY, next);
    notify();
  }, []);

  return (
    <LayoutModeContext.Provider value={{ mode, setMode }}>
      {children}
    </LayoutModeContext.Provider>
  );
}

export function useLayoutMode() {
  const ctx = useContext(LayoutModeContext);
  if (!ctx) throw new Error("useLayoutMode must be used within LayoutModeProvider");
  return ctx;
}
