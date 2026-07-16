import api from './client';
import {
  normalizeWorkOrders,
  normalizeWorkOrder,
  serializeWorkOrder
} from './normalizers/workOrder';

// ======================================================
// GET WORK ORDERS BY PROJECT
// ======================================================
export const getWorkOrdersByProject = async (projectId) => {
  try {
    const response = await api.get(`/workorders/proyecto/${projectId}`);
    // Aseguramos la compatibilidad tanto si el cliente API devuelve 'response.data' como 'response' directamente
    const rawData = response?.data || response || [];
    return normalizeWorkOrders(rawData);
  } catch (error) {
    console.error(`Error en getWorkOrdersByProject para el proyecto ${projectId}:`, error);
    throw error; // Relanzamos el error para que el hook 'useWorkOrders' pueda capturar el estado de error
  }
};

// ======================================================
// CREATE WORK ORDER
// ======================================================
export const createWorkOrder = async (payload) => {
  try {
    // console.log('PAYLOAD RECIBIDO EN FRONT:', payload);
    
    const formattedPayload = typeof serializeWorkOrder === 'function' 
      ? serializeWorkOrder(payload) 
      : payload;
      
    // console.log('PAYLOAD SERIALIZADO HACIA BACKEND:', formattedPayload);
    
    const response = await api.post('/workorders', formattedPayload);
    const rawData = response?.data || response;
    return normalizeWorkOrder(rawData);
  } catch (error) {
    console.error('Error en createWorkOrder:', error);
    throw error;
  }
};

// ======================================================
// UPDATE WORK ORDER
// ======================================================
export const updateWorkOrder = async (id, payload) => {
  try {
    // console.log('PAYLOAD ORIGINAL EN FRONT:', payload);

    const formattedPayload = typeof serializeWorkOrder === 'function'
      ? serializeWorkOrder(payload)
      : payload;

    // console.log('PAYLOAD SERIALIZADO HACIA BACKEND:', formattedPayload);

    const response = await api.put(`/workorders/${id}`, formattedPayload);
    const rawData = response?.data || response;
    return normalizeWorkOrder(rawData);
  } catch (error) {
    console.error(`Error en updateWorkOrder para la WO ${id}:`, error);
    throw error;
  }
};