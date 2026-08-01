"use client";

import { useEffect, useState } from "react";
import { getSettings, type SettingsResource } from "./api";

export function useSettings<T>(resource: SettingsResource, fallback: T): { data: T; setData: React.Dispatch<React.SetStateAction<T>>; error: string | null; loading: boolean };
export function useSettings<T>(resource: SettingsResource, fallback?: T): { data: T | undefined; setData: React.Dispatch<React.SetStateAction<T | undefined>>; error: string | null; loading: boolean };
export function useSettings<T>(resource: SettingsResource, fallback?: T) {
  const [data, setData] = useState<T | undefined>(fallback);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getSettings<T>(resource)
      .then((settings) => {
        if (!active) return;
        setData(settings);
        setError(null);
      })
      .catch((requestError: unknown) => {
        if (!active) return;
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load settings.",
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [resource]);

  return { data, setData, error, loading };
}
