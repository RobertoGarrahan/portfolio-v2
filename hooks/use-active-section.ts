"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_LOCK_FALLBACK_MS = 850;

export function useActiveSection<T extends string>(
  sectionIds: readonly T[],
  defaultSection: T,
): [T, (id: T) => void] {
  const [activeSection, setActiveSection] = useState<T>(defaultSection);
  const isManualScrollingRef = useRef(false);
  const unlockTimerRef = useRef<number | null>(null);
  const cleanupListenersRef = useRef<(() => void) | null>(null);

  const clearScrollLock = useCallback(() => {
    if (unlockTimerRef.current !== null) {
      window.clearTimeout(unlockTimerRef.current);
      unlockTimerRef.current = null;
    }
    if (cleanupListenersRef.current) {
      cleanupListenersRef.current();
      cleanupListenersRef.current = null;
    }
    isManualScrollingRef.current = false;
  }, []);

  const selectSection = useCallback(
    (id: T) => {
      clearScrollLock();
      setActiveSection(id);
      isManualScrollingRef.current = true;

      const handleScrollEnd = () => {
        clearScrollLock();
      };

      const handleUserInterrupt = () => {
        clearScrollLock();
      };

      window.addEventListener("scrollend", handleScrollEnd, { once: true });
      window.addEventListener("wheel", handleUserInterrupt, {
        passive: true,
        once: true,
      });
      window.addEventListener("touchstart", handleUserInterrupt, {
        passive: true,
        once: true,
      });

      cleanupListenersRef.current = () => {
        window.removeEventListener("scrollend", handleScrollEnd);
        window.removeEventListener("wheel", handleUserInterrupt);
        window.removeEventListener("touchstart", handleUserInterrupt);
      };

      unlockTimerRef.current = window.setTimeout(
        clearScrollLock,
        SCROLL_LOCK_FALLBACK_MS,
      );
    },
    [clearScrollLock],
  );

  useEffect(() => {
    return () => {
      clearScrollLock();
    };
  }, [clearScrollLock]);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visibleSections = new Map<T, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as T;
          if (entry.isIntersecting) {
            visibleSections.set(id, entry);
          } else {
            visibleSections.delete(id);
          }
        }

        if (isManualScrollingRef.current) return;
        if (visibleSections.size === 0) return;

        // If at the bottom of the page, highlight the last section.
        const isAtBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 24;
        if (isAtBottom) {
          setActiveSection(sectionIds[sectionIds.length - 1]);
          return;
        }

        // Pick the intersecting section closest to the sticky header offset.
        let nextActive: T | null = null;
        let smallestTopDistance = Number.POSITIVE_INFINITY;

        for (const id of sectionIds) {
          const entry = visibleSections.get(id);
          if (!entry) continue;
          const distance = Math.abs(entry.boundingClientRect.top - 56);
          if (distance < smallestTopDistance) {
            smallestTopDistance = distance;
            nextActive = id;
          }
        }

        if (nextActive) {
          setActiveSection(nextActive);
        }
      },
      {
        rootMargin: "-15% 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  return [activeSection, selectSection];
}
