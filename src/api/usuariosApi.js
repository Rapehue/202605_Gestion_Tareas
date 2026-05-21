import apiClient from './client'; // 👈 Consumimos tu instancia centralizada

export const searchUsuarios = (query) => {
  return apiClient.get('/usuarios/search', {
    // 💡 Al pasarlo en 'params', Axios se encarga de formatear la URL 
    // automáticamente como '?q=...' y de codificar caracteres especiales (URL Encoding)
    params: {
      q: query
    }
  });
};