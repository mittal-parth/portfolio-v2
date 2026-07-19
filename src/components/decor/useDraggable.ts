"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

type DraggableOptions = {
  id: string;
  disabled?: boolean;
};

function readOffset(id: string): { x: number; y: number } {
  try {
    const stored = localStorage.getItem(`drag-pos-${id}`);
    if (stored) return JSON.parse(stored);
  } catch {
    /* ignore */
  }
  return { x: 0, y: 0 };
}

export function useDraggable({ id, disabled = false }: DraggableOptions) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const start = useRef({ x: 0, y: 0, ox: 0, oy: 0 });

  useEffect(() => {
    // Load persisted drag offset after mount (client-only).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration from localStorage
    setOffset(readOffset(id));
  }, [id]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      dragging.current = true;
      start.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [disabled, offset.x, offset.y],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current || disabled) return;
      setOffset({
        x: start.current.ox + (e.clientX - start.current.x),
        y: start.current.oy + (e.clientY - start.current.y),
      });
    },
    [disabled],
  );

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    setOffset((current) => {
      localStorage.setItem(`drag-pos-${id}`, JSON.stringify(current));
      return current;
    });
  }, [id]);

  const style = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    touchAction: disabled ? undefined : ("none" as const),
    cursor: disabled ? undefined : ("grab" as const),
  };

  return {
    ref,
    style,
    dragHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    },
  };
}

function subscribeMediaQuery(query: string, cb: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function useDraggableEnabled() {
  const coarse = useSyncExternalStore(
    (cb) => subscribeMediaQuery("(pointer: coarse)", cb),
    () => window.matchMedia("(pointer: coarse)").matches,
    () => true,
  );
  const reduced = useSyncExternalStore(
    (cb) => subscribeMediaQuery("(prefers-reduced-motion: reduce)", cb),
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  return !coarse && !reduced;
}
