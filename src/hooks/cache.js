const store = new Map();

/**
 * Estructura:
 * key → {
 *   data,
 *   promise,
 *   error,
 *   listeners: Set<fn>
 * }
 */

export const getEntry = (key) => store.get(key);

export const setEntry = (key, value) => {
  store.set(key, value);
};

export const subscribe = (key, cb) => {
  const entry = store.get(key);
  if (!entry) return () => {};

  entry.listeners.add(cb);
  return () => entry.listeners.delete(cb);
};

export const notify = (key) => {
  const entry = store.get(key);
  if (!entry) return;
  entry.listeners.forEach(fn => fn());
};