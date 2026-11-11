import { useCallback, useEffect, useRef, useState } from 'react';
import { useAdminAuth } from './AdminAuthContext';

interface State<T> {
  data?: T;
  error?: string;
  loading: boolean;
}

/** Loads data when `deps` change. Keeps the previous data on screen while reloading. */
export function useAdminQuery<T>(fetcher: () => Promise<T>, deps: unknown[]) {
  const { handleError } = useAdminAuth();
  const [state, setState] = useState<State<T>>({ loading: true });
  const [tick, setTick] = useState(0);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: undefined }));
    fetcherRef
      .current()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false });
      })
      .catch((err) => {
        if (!cancelled) setState((s) => ({ ...s, loading: false, error: handleError(err) }));
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);

  const reload = useCallback(() => setTick((t) => t + 1), []);
  return { ...state, reload };
}
