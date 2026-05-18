import { toNumber } from "../../utils/number";

export const normalizeHito = (h = {}) => ({
  id: toNumber(h.id) || 0,
  id_work_order: toNumber(h.id_work_order) || 0,

  codigo: h.codigo || '',
  descripcion: h.descripcion || '',

  porcentaje: toNumber(h.porcentaje) || 0,
  importe: toNumber(h.importe) || 0,

  estado: h.estado || 'EN_CURSO',

  fecha_solicitud_vb: h.fecha_solicitud_vb || null,
  fecha_concesion_vb: h.fecha_concesion_vb || null
});

export const normalizeHitos = (data) => {
  if (!Array.isArray(data)) return [];
  return data.map(normalizeHito);
};