import { useState, useCallback } from "react";

const STORAGE_KEY = "ep_recent_routes";
const MAX_RECENT = 4;

/**
 * Persists the last `MAX_RECENT` navigated routes to localStorage so the
 * dashboard can surface "Recent" shortcuts.
 *
 * @returns An object with:
 *  - `recentPaths`  The stored paths, most-recent first.
 *  - `trackVisit`   Call with a path string whenever the user navigates there.
 */
export function useRecentVisits(): {
  recentPaths: string[];
  trackVisit: (path: string) => void;
} {
  const [recentPaths, setRecentPaths] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as string[]) : [];
    } catch {
      return [];
    }
  });

  const trackVisit = useCallback((path: string) => {
    setRecentPaths((prev) => {
      const next = [path, ...prev.filter((p) => p !== path)].slice(0, MAX_RECENT);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // localStorage might be unavailable (e.g. private browsing storage-full)
      }
      return next;
    });
  }, []);

  return { recentPaths, trackVisit };
}
