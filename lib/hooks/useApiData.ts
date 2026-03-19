"use client";

import { useState, useEffect } from "react";

interface UseApiDataResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook genérico para cargar datos desde los API routes.
 * Gestiona loading, error y refetch automáticamente.
 */
export function useApiData<T>(url: string, initialData: T[] = []): UseApiDataResult<T> {
  const [data, setData]       = useState<T[]>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [tick, setTick]       = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json() as Promise<T[]>;
      })
      .then((d) => { if (!cancelled) setData(d); })
      .catch((err) => { if (!cancelled) setError(String(err)); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [url, tick]);

  const refetch = () => setTick((t) => t + 1);

  return { data, loading, error, refetch };
}

/**
 * Hook para un solo objeto (primer resultado filtrado por ID)
 */
export function useApiItem<T extends { id: string }>(
  url: string,
  id: string
): { item: T | null; loading: boolean } {
  const { data, loading } = useApiData<T>(url);
  const item = data.find((d) => d.id === id) ?? null;
  return { item, loading };
}
