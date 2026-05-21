import { toNumber } from "../../utils/number";

export const normalizeHito = (h = {}) => ({
  id: toNumber(h.id) || 0,
  // 💡 Traducimos las propiedades del servidor a camelCase
  workOrderId: toNumber(h.id_work_order) || 0,

  codigo: h.codigo || '',
  descripcion: h.descripcion || '',

  porcentaje: toNumber(h.porcentaje) || 0,
  importe: toNumber(h.importe) || 0,

  estado: h.estado || 'EN_CURSO',

  // 🕒 Fechas de control de Visto Bueno (VB) formateadas limpiamente
  fechaSolicitudVb: h.fecha_solicitud_vb || null,
  fechaConcesionVb: h.fecha_concesion_vb || null
});

export const normalizeHitos = (data) => {
  if (!Array.isArray(data)) return [];
  return data.map(normalizeHito);
};

/**
 * 🔄 Serializador / Desnormalizador
 * Revierte el objeto limpio de React al formato snake_case estricto de la Base de Datos
 */
export const serializeHito = (h = {}) => ({
  id_work_order: h.workOrderId,
  codigo: h.codigo,
  descripcion: h.descripcion,
  porcentaje: h.porcentaje,
  importe: h.importe,
  estado: h.estado,
  fecha_solicitud_vb: h.fechaSolicitudVb,
  fecha_concesion_vb: h.fechaConcesionVb
});