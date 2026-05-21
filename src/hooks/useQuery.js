import { useEffect, useState } from 'react';
import { getEntry, setEntry, subscribe, notify } from './cache';

export const useQuery = (key, fetcher) => {
  const [state, setState] = useState({
    data: null, // Dejarlo en null o heredar el tipo es más limpio si controlas las guardias
    loading: true,
    error: null
  });

  // Pasamos 'active' como parámetro para saber si este hilo de ejecución sigue vigente
  const load = async (activeRef) => {
    let entry = getEntry(key);

    // 🔥 cache hit
    if (entry?.data) {
      if (activeRef.current) {
        setState({ data: entry.data, loading: false, error: null });
      }
      return;
    }

    // 🔥 request en curso
    if (entry?.promise) {
      await entry.promise;
      if (!activeRef.current) return; // Si la key cambió mientras esperábamos, abortamos
      
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

      if (activeRef.current) {
        setState({ data, loading: false, error: null });
      }
    } catch (err) {
      entry.error = err;
      entry.promise = null;

      notify(key);

      if (activeRef.current) {
        setState({ data: null, loading: false, error: err });
      }
    }
  };

  useEffect(() => {
    // Bandera de control local para este ciclo del efecto
    const activeRef = { current: true };

    // Setear loading cada vez que la key cambia para no mostrar datos viejos
    setState({ data: null, loading: true, error: null });

    load(activeRef);

    const unsub = subscribe(key, () => {
      if (activeRef.current) {
        const entry = getEntry(key);
        setState({
          data: entry?.data,
          loading: false,
          error: entry?.error
        });
      }
    });

    // Limpieza: cuando la key cambie, marcamos este efecto como inactivo
    return () => {
      activeRef.current = false;
      unsub();
    };
  }, [key]);

  const refetch = () => {
    setEntry(key, null);
    const activeRef = { current: true };
    load(activeRef);
  };

  return {
    ...state,
    refetch
  };
};