import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// 💡 Interceptor mágico: extrae el .data automáticamente de todas las respuestas
apiClient.interceptors.response.use(
  (response) => response.data, 
  (error) => {
    // Aquí puedes centralizar errores globales (ej: si es 401, redirigir a Login)
    console.error('Error en la API:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;