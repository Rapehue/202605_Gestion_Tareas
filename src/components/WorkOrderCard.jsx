import { useState } from 'react';
import { useHitos } from '../hooks/useHitos';

const WorkOrderCard = ({ workOrder, onEdit }) => {

  const [open, setOpen] = useState(false);

  // 🔥 Hook de hitos
  const {
    data: hitos = [],
    loading,
    addHito,
    editHito
  } = useHitos(workOrder?.id);

  if (!workOrder) return null;

  // 🔒 asegurar array
  const safeHitos = Array.isArray(hitos) ? hitos : [];

  // 📊 cálculos financieros
  const totalImporte = safeHitos.reduce(
    (s, h) => s + Number(h.importe || 0),
    0
  );

  const totalPorcentaje = safeHitos.reduce(
    (s, h) => s + Number(h.porcentaje || 0),
    0
  );

  const concedido = safeHitos
    .filter(h => h.estado === 'CONCEDIDO_VB')
    .reduce((s, h) => s + Number(h.importe || 0), 0);

  const progress = totalImporte
    ? (concedido / totalImporte) * 100
    : 0;

  const porcentajeExcedido = totalPorcentaje > 100;

  const desviacion = Math.abs(totalImporte - (workOrder.precio || 0));
  const warningImporte = desviacion > 1;

  // ➕ crear hito
  const handleCreateHito = async () => {
    await addHito({
      id_work_order: workOrder.id,
      codigo: `H-${safeHitos.length + 1}`,
      descripcion: '',
      porcentaje: 0,
      importe: 0,
      estado: 'EN_CURSO'
    });
  };

  // ✏ editar campo
  const updateField = async (id, field, value) => {

    const updated = safeHitos.map(h =>
      h.id === id ? { ...h, [field]: value } : h
    );

    const newTotal = updated.reduce(
      (s, h) => s + Number(h.porcentaje || 0),
      0
    );

    if (newTotal > 100) {
      alert('El porcentaje total no puede superar 100%');
      return;
    }

    await editHito(id, { [field]: value });
  };

  return (
    <div className="card wo-card">

      {/* HEADER */}
      <div className="wo-header">

        <div>
          <strong>{workOrder.codigo}</strong>
          <div className="wo-sub">
            {workOrder.proveedor}
          </div>
        </div>

        <div className="wo-right">
          <span>{workOrder.precio} €</span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(workOrder);
            }}
          >
            Editar
          </button>

          <button
            onClick={() => setOpen(!open)}
          >
            {open ? 'Cerrar' : 'Ver'}
          </button>
        </div>

      </div>

      {/* PROGRESS */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="progress-text">
        {Math.round(progress)}% facturado
      </div>

      {/* WARNINGS */}
      {porcentajeExcedido && (
        <div className="warning">
          ⚠ Exceso de porcentaje
        </div>
      )}

      {warningImporte && (
        <div className="warning">
          ⚠ Importe de hitos no cuadra con la WO
        </div>
      )}

      {/* HITOS */}
      {open && (
        <div className="hitos-section">

          <div className="hitos-header">
            <h4>Hitos</h4>

            <button
              className="btn-primary"
              onClick={handleCreateHito}
            >
              + Hito
            </button>
          </div>

          {loading && <p>Cargando hitos...</p>}

          <table className="hitos-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Descripción</th>
                <th>%</th>
                <th>Importe</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              {safeHitos.map(h => (
                <tr key={h.id}>

                  <td>{h.codigo}</td>

                  <td>
                    <input
                      value={h.descripcion}
                      onChange={e =>
                        updateField(h.id, 'descripcion', e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      value={h.porcentaje}
                      onChange={e =>
                        updateField(h.id, 'porcentaje', e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      value={h.importe}
                      onChange={e =>
                        updateField(h.id, 'importe', e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <select
                      value={h.estado}
                      onChange={e =>
                        updateField(h.id, 'estado', e.target.value)
                      }
                    >
                      <option value="EN_CURSO">En curso</option>
                      <option value="SOLICITADO_VB">Solicitado VB</option>
                      <option value="CONCEDIDO_VB">Concedido VB</option>
                    </select>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}

    </div>
  );
};

export default WorkOrderCard;