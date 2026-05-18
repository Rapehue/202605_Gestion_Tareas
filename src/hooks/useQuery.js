import { useEffect, useState } from 'react';
import { getEntry, setEntry, subscribe, notify } from './cache';

export const useQuery = (key, fetcher) => {

  const [state, setState] = useState({
    data: [],
    loading: true,
    error: null
  });

  const load = async () => {

    let entry = getEntry(key);

    // 🔥 cache hit
    if (entry?.data) {
      setState({ data: entry.data, loading: false, error: null });
      return;
    }

    // 🔥 request en curso
    if (entry?.promise) {
      await entry.promise;
      const updated = getEntry(key);
      setState({
        data: updated.data,
        loading: false,
        error: updated.error
      });
      return;
    }

    // 🔥 nueva petición
    const promise = fetcher();

    entry = {
      data: null,
      error: null,
      promise,
      listeners: new Set()
    };

    setEntry(key, entry);

    try {
      const data = await promise;

      entry.data = data;
      entry.error = null;
      entry.promise = null;

      notify(key);

      setState({ data, loading: false, error: null });

    } catch (err) {

      entry.error = err;
      entry.promise = null;

      notify(key);

      setState({ data: null, loading: false, error: err });
    }
  };

  useEffect(() => {
    load();

    const unsub = subscribe(key, () => {
      const entry = getEntry(key);
      setState({
        data: entry.data,
        loading: false,
        error: entry.error
      });
    });

    return unsub;
  }, [key]);

  const refetch = () => {
    setEntry(key, null);
    load();
  };

  return {
    ...state,
    refetch
  };
};