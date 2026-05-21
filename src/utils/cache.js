// Configuración por defecto: los datos expiran a los 5 minutos (en milisegundos)
const DEFAULT_TTL = 5 * 60 * 1000;

class CacheService {
  constructor() {
    // Usamos un Map nativo de JavaScript para almacenar los datos en memoria limpia
    this.store = new Map();
  }

  /**
   * Guarda un valor en la caché asociado a una clave única
   * @param {string} key - La clave o URL de la petición
   * @param {any} data - Los datos devueltos por la API (ya normalizados)
   * @param {number} ttl - Tiempo de vida en milisegundos (opcional)
   */
  set(key, data, ttl = DEFAULT_TTL) {
    const expiresAt = Date.now() + ttl;
    this.store.set(key, { data, expiresAt });
  }

  /**
   * Recupera los datos de la caché si existen y no han expirado
   * @param {string} key - La clave o URL a consultar
   * @returns {any|null} Los datos cacheados o null si expiró o no existe
   */
  get(key) {
    const cached = this.store.get(key);

    if (!cached) return null;

    // 🕒 Comprobamos si el tiempo de vida ha expirado
    if (Date.now() > cached.expiresAt) {
      this.store.delete(key); // Limpieza automática si está caducado
      return null;
    }

    return cached.data;
  }

  /**
   * Elimina una clave específica (Crucial para la invalidación tras un POST/PUT)
   * @param {string} key - La clave a borrar
   */
  delete(key) {
    this.store.delete(key);
  }

  /**
   * Borra todas las entradas por completo (Útil para cierres de sesión)
   */
  clear() {
    this.store.clear();
  }
}

// Exportamos una única instancia (Patrón Singleton) para que todo el ERP
// comparta exactamente el mismo almacén de memoria.
export const cache = new CacheService();