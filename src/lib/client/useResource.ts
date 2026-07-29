"use client";

import { useCallback, useEffect, useState } from "react";
import {
  createResource,
  deleteResource,
  listResource,
  type ApiResource,
  updateResource,
} from "./api";

export function useResource<T extends { id: string }>(resource: ApiResource, fallback: T[]) {
  const [items, setItems] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listResource<T>(resource);
      setItems(data);
      setError(null);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to load data.");
    } finally {
      setLoading(false);
    }
  }, [resource]);

  useEffect(() => {
    let active = true;

    listResource<T>(resource)
      .then((data) => {
        if (!active) return;
        setItems(data);
        setError(null);
      })
      .catch((requestError: unknown) => {
        if (!active) return;
        setError(requestError instanceof Error ? requestError.message : "Unable to load data.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [resource]);

  const save = useCallback(
    async (item: T, existingId?: string) => {
      const saved = existingId
        ? await updateResource(resource, existingId, item)
        : await createResource(resource, item);

      setItems((current) => {
        if (!existingId) return [saved as T, ...current];
        return current.map((entry) => (entry.id === existingId ? (saved as T) : entry));
      });
      return saved as T;
    },
    [resource],
  );

  const remove = useCallback(
    async (id: string) => {
      await deleteResource(resource, id);
      setItems((current) => current.filter((entry) => entry.id !== id));
    },
    [resource],
  );

  return { items, setItems, loading, error, refresh, save, remove };
}
