export const normalizeRoadmap = (data = []) => {

  return data.map(wo => ({

    id: wo.id,

    codigo: wo.codigo,

    proveedor: wo.proveedor,

    descripcion: wo.descripcion,

    estado: wo.estado,

    fechaInicio: wo.fecha_inicio,

    fechaFin: wo.fecha_fin,

    jornadas: Number(wo.jornadas || 0),

    precio: Number(wo.precio || 0),

    hitos: (wo.hitos || []).map(h => ({

      id: h.id,

      codigo: h.codigo,

      descripcion: h.descripcion,

      porcentaje: Number(h.porcentaje || 0),

      importe: Number(h.importe || 0),

      estado: h.estado,

      fechaSolicitud:
        h.fecha_solicitud_vb,

      fechaConcesion:
        h.fecha_concesion_vb

    }))

  }));

};