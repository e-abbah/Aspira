// src/hooks/useAutosave.ts
import { useEffect, useRef, useState, useCallback } from "react";
import type { DraftSyncStatus } from "../../types/workspace";

interface UseAutosaveOptions {
  value: string;
  onSave: (value: string) => Promise<void>;
  delayMs?: number;
}

interface UseAutosaveResult {
  status: DraftSyncStatus;
  lastSavedAt: Date | null;
  secondsSinceSave: number;
}

/**
 * Debounces a changing value and persists it via `onSave` after the user
 * stops typing. Tracks sync status and a live "seconds since save" counter
 * for UI feedback (e.g. "Last saved 3 seconds ago").
 */
export function useAutosave({
  value,
  onSave,
  delayMs = 1000,
}: UseAutosaveOptions): UseAutosaveResult {
  const [status, setStatus] = useState<DraftSyncStatus>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [secondsSinceSave, setSecondsSinceSave] = useState(0);

  const isFirstRender = useRef(true);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const save = useCallback(
    async (content: string) => {
      setStatus("syncing");
      try {
        await onSave(content);
        setLastSavedAt(new Date());
        setStatus("saved");
      } catch {
        setStatus("idle");
      }
    },
    [onSave]
  );

  // Debounce saves as `value` changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      save(value);
    }, delayMs);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delayMs]);

  // Tick the "seconds since save" counter
  useEffect(() => {
    if (!lastSavedAt) return;

    const interval = setInterval(() => {
      setSecondsSinceSave(Math.floor((Date.now() - lastSavedAt.getTime()) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [lastSavedAt]);

  return { status, lastSavedAt, secondsSinceSave };
}
