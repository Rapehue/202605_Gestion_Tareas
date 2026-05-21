import apiClient from './client'; // 👈 Importamos tu cliente configurado

export const getProyectos = () => 
  apiClient.get('/proyectos');

// 🔍 ¡Añadido! Esencial para tu pantalla de detalle del proyecto (/proyectos/:id)
export const getProyectoById = (id) => 
  apiClient.get(`/proyectos/${id}`);

export const createProyecto = (data) => 
  apiClient.post('/proyectos', data);

export const updateProyecto = (id, data) => 
  apiClient.put(`/proyectos/${id}`, data);