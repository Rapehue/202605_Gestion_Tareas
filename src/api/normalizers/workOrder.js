import { toNumber } from "../../utils/number";

export const normalizeWorkOrder = (wo = {}) => ({
  id: toNumber(wo.id) || 0,
  // 💡 Traducimos de snake_case (servidor) a camelCase (frontend)
  projectId: toNumber(wo.id_proyecto) || 0, 

  codigo: wo.codigo || '',
  proveedor: wo.proveedor || '',
  descripcion: wo.descripcion || '',

  // Mantén snake_case o cámbialo a camelCase aquí si buscas unificar el proyecto entero:
  fechaInicio: wo.fecha_inicio || null,
  fechaFin: wo.fecha_fin || null,

  jornadas: toNumber(wo.jornadas) || 0,
  precio: toNumber(wo.precio) || 0,

  // 🚦 Añadimos el estado del flujo de trabajo con un fallback seguro
  estado: wo.estado || 'PENDIENTE',

  objetivo: wo.objetivo
});

export const normalizeWorkOrders = (data) => {
  if (!Array.isArray(data)) return [];
   console.log(
    'NORMALIZANDO WO',
    data
  );
  return data.map(normalizeWorkOrder);
};

// revierte el objeto limpio de React al formato crudo que entiende tu Base de Datos
export const serializeWorkOrder = (wo = {}) => ({
  id_proyecto: wo.id_proyecto,
  codigo: wo.codigo,
  proveedor: wo.proveedor,
  descripcion: wo.descripcion,
  fecha_inicio: wo.fechaInicio,
  fecha_fin: wo.fechaFin,
  jornadas: wo.jornadas,
  precio: wo.precio,
  estado: wo.estado,
  objetivo: wo.objetivo
});