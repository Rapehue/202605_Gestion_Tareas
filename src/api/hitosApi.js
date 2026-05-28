import api from './client';
import { normalizeHitos, normalizeHito } from './normalizers/hito';

export const getHitosByWorkOrder = async (workOrderId) => {
  try {
    const data = await api.get(`/hitos/workorder/${workOrderId}`);
    return normalizeHitos(data);
  } catch (error) {
    console.error("🚨 Error crítico en hitosApi:", error.message);
    // Devuelve un array vacío de emergencia para que el modal no se rompa
    return [];
  }
};


export const createHito = async (payload) => {
  const data = await api.post('/hitos', payload);
  return normalizeHito(data);
};

export const updateHito = async (id, payload) => {
  const data = await api.put(`/hitos/${id}`, payload);
  return normalizeHito(data);
};