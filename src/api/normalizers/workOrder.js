import { toNumber } from "../../utils/number";

export const normalizeWorkOrder = (wo = {}) => ({
  id: toNumber(wo.id) || 0,
  id_proyecto: toNumber(wo.id_proyecto) || 0,

  codigo: wo.codigo || '',
  proveedor: wo.proveedor || '',
  descripcion: wo.descripcion || '',

  fecha_inicio: wo.fecha_inicio || null,
  fecha_fin: wo.fecha_fin || null,

  jornadas: toNumber(wo.jornadas) || 0,
  precio: toNumber(wo.precio) || 0
});

export const normalizeWorkOrders = (data) => {
  if (!Array.isArray(data)) return [];
  return data.map(normalizeWorkOrder);
};