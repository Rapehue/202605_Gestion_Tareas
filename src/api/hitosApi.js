import api from './client';
import { normalizeHitos, normalizeHito } from './normalizers/hito';

export const getHitosByWorkOrder = async (id) => {
  const data = await api.get(`/hitos/workorder/${id}`);
  return normalizeHitos(data);
};

export const createHito = async (payload) => {
  const data = await api.post('/hitos', payload);
  return normalizeHito(data);
};

export const updateHito = async (id, payload) => {
  const data = await api.put(`/hitos/${id}`, payload);
  return normalizeHito(data);
};