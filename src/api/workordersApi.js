import api from './client';
import {
  normalizeWorkOrders,
  normalizeWorkOrder,
  // 💡 Imaginemos que añadimos esto para preparar los datos antes de viajar al servidor
  serializeWorkOrder 
} from './normalizers/workOrder';

export const getWorkOrdersByProject = async (projectId) => {
  // Tu lógica aquí es perfecta: consume de la instancia y limpia la salida
  const data = await api.get(`/workorders/proyecto/${projectId}`);
  return normalizeWorkOrders(data);
};

export const createWorkOrder = async (payload) => {
  // 🛡️ Opcional pero recomendado: transformamos el estado del front 
  // al formato crudo que espera la base de datos (ej: fechas a ISOString, IDs limpios)
  const formattedPayload = serializeWorkOrder ? serializeWorkOrder(payload) : payload;
  
  const data = await api.post('/workorders', formattedPayload);
  return normalizeWorkOrder(data);
};

export const updateWorkOrder = async (id, payload) => {
  const formattedPayload = serializeWorkOrder ? serializeWorkOrder(payload) : payload;
  
  const data = await api.put(`/workorders/${id}`, formattedPayload);
  return normalizeWorkOrder(data);
};