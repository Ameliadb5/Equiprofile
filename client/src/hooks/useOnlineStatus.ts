import { useState, useEffect } from "react";

/**
 * useOnlineStatus — tracks the browser's network connectivity state.
 *
 * Returns `true` when `navigator.onLine` is true (device has network access)
 * and `false` when offline. Updates in real-time via the browser's `online` /
 * `offline` events.
 *
 * Used to show a green/grey online indicator next to the current user's name
 * in the sidebar and mobile header.
 */
export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== "undefined" ? navigator.onLine : true,
  );

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}

/**
 * getActivityStatus — derives a status label from a user's last-updated timestamp.
 *
 * Used in the admin user list to show a coloured dot indicating how recently
 * a user was active. Because real-time WebSocket presence is not implemented,
 * this uses `updatedAt` as a best-effort proxy (the database updates this
 * whenever any user record changes — e.g. settings saves, plan changes).
 *
 * Thresholds:
 *   • "online"  — updated within the last 5 minutes
 *   • "recent"  — updated within the last 24 hours
 *   • "offline" — older than 24 hours (or no date available)
 */
export type ActivityStatus = "online" | "recent" | "offline";

export function getActivityStatus(updatedAt: Date | string | null | undefined): ActivityStatus {
  if (!updatedAt) return "offline";
  const ms = Date.now() - new Date(updatedAt).getTime();
  if (ms < 5 * 60 * 1000) return "online";        // < 5 min
  if (ms < 24 * 60 * 60 * 1000) return "recent";  // < 24 h
  return "offline";
}

/** Tailwind class (and accessible title) for each activity status dot. */
export const ACTIVITY_DOT: Record<ActivityStatus, { dot: string; title: string }> = {
  online:  { dot: "bg-green-500",  title: "Online (active within 5 min)" },
  recent:  { dot: "bg-amber-400",  title: "Recently active (within 24 h)" },
  offline: { dot: "bg-gray-400",   title: "Offline" },
};
