import api from './client';
import {
  normalizeWorkOrders,
  normalizeWorkOrder
} from './normalizers/workOrder';

export const getWorkOrdersByProject = async (projectId) => {
  const data = await api.get(`/workorders/proyecto/${projectId}`);
  return normalizeWorkOrders(data);
};

export const createWorkOrder = async (payload) => {
  const data = await api.post('/workorders', payload);
  return normalizeWorkOrder(data);
};

export const updateWorkOrder = async (id, payload) => {
  const data = await api.put(`/workorders/${id}`, payload);
  return normalizeWorkOrder(data);
};