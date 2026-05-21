const store = new Map();

export const getEntry = (key) => store.get(key);

export const setEntry = (key, value) => {
  // Si nos pasan null (para resetear), no destruimos el objeto, solo vaciamos sus datos
  if (value === null) {
    const existing = store.get(key);
    if (existing) {
      existing.data = null;
      existing.error = null;
      existing.promise = null;
      // 💡 Mantenemos los listeners vivos para que nadie se quede colgado
      return;
    }
  }
  store.set(key, value);
};

export const subscribe = (key, cb) => {
  const entry = store.get(key);
  
  // Si por algún motivo el componente se suscribe antes de que exista la entrada,
  // la creamos sobre la marcha para asegurar que el Set de listeners exista.
  if (!entry) {
    store.set(key, {
      data: null,
      promise: null,
      error: null,
      listeners: new Set([cb])
    });
    return () => {
      const e = store.get(key);
      if (e) e.listeners.delete(cb);
    };
  }

  entry.listeners.add(cb);
  return () => entry.listeners.delete(cb);
};

export const notify = (key) => {
  const entry = store.get(key);
  if (!entry) return;
  // Usamos Array.from o un clon del Set para evitar problemas si un listener
  // se desasocia en mitad de la ejecución del bucle
  Array.from(entry.listeners).forEach(fn => fn());
};