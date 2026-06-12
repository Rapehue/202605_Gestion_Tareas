import {
  BriefcaseBusiness,
  ChevronDown,
  ChevronUp,
  Pencil,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Euro,
  Percent
} from 'lucide-react';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

import {
  WORKORDER_STATUS
} from '@/utils/workOrderStatus';

import { useState } from 'react';
import { useHitos } from '../hooks/useHitos';

import { formatDate } from '../utils/date'

import './WorkOrderCard.css';
import WorkOrderStatusBadge from './WorkOrderStatusBadge';

const WorkOrderCard = ({
  workOrder,
  onEdit
}) => {

  const [open, setOpen] = useState(false);
  const [editingHito, setEditingHito] = useState(null);

  const {
    data: hitos = [],
    loading,
    addHito,
    editHito
  } = useHitos(workOrder?.id);

  if (!workOrder) return null;

  console.log(
    'WORKORDER CARD',
    workOrder
  );

  const safeHitos = Array.isArray(hitos)
    ? hitos
    : [];

  // =====================================================
  // KPI CALCULATIONS
  // =====================================================

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
    .reduce(
      (s, h) =>
        s + Number(h.importe || 0),
      0
    );

  const progress = totalImporte
    ? (concedido / totalImporte) * 100
    : 0;

  const porcentajeExcedido =
    totalPorcentaje > 100;

  const desviacion = Math.abs(
    totalImporte - (workOrder.precio || 0)
  );

  const warningImporte =
    desviacion > 1;

  // =====================================================
  // CREATE HITO
  // =====================================================

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

  // =====================================================
  // UPDATE FIELD
  // =====================================================

  const updateField = async (
    id,
    field,
    value
  ) => {

    const updated = safeHitos.map(h =>
      h.id === id
        ? { ...h, [field]: value }
        : h
    );

    const newTotal = updated.reduce(
      (s, h) =>
        s + Number(h.porcentaje || 0),
      0
    );

    if (newTotal > 100) {

      alert(
        'El porcentaje total no puede superar 100%'
      );

      return;

    }

    await editHito(id, {
      [field]: value
    });

  };

  // =====================================================
  // STATUS BADGE
  // =====================================================

  const getStatusBadge = () => {

    if (progress >= 100) {
      return (
        <Badge variant="success">
          Completada
        </Badge>
      );
    }

    if (progress > 0) {
      return (
        <Badge variant="warning">
          En progreso
        </Badge>
      );
    }

    return (
      <Badge variant="neutral">
        Pendiente
      </Badge>
    );

  };

  const concedidoImporte =
    safeHitos
      .filter(
        h => h.estado === 'CONCEDIDO_VB'
      )
      .reduce(
        (acc, h) =>
          acc + Number(h.importe || 0),
        0
      );

  const pendienteImporte =
    totalImporte - concedidoImporte;

  const avanceFacturacion =
    totalImporte > 0
      ? Math.round(
        (concedidoImporte / totalImporte) * 100
      )
      : 0;

  const hitosEnCurso =
    safeHitos.filter(
      h => h.estado === 'EN_CURSO'
    ).length;

  const riesgo =
    avanceFacturacion >= 90
      ? 'BAJO'
      : avanceFacturacion >= 60
        ? 'MEDIO'
        : 'ALTO';

  const totalHitos =
    safeHitos.length;


  const hitosSolicitados =
    safeHitos.filter(
      h => h.estado === 'SOLICITADO_VB'
    ).length;

  const proximoHito =
    safeHitos.find(
      h => h.estado !== 'CONCEDIDO_VB'
    );

  return (

    <Card className="workorder-card">

      {/* ========================================== */}
      {/* HEADER */}
      {/* ========================================== */}

      <div className="workorder-header">

        <div className="workorder-header-left">

          <div className="workorder-icon">

            <BriefcaseBusiness size={18} />

          </div>

          <div className="workorder-main-info">

            <div className="workorder-title-row">

              <h3>
                {workOrder.codigo}
              </h3>

              <Badge
                variant={
                  WORKORDER_STATUS[
                    workOrder.estado
                  ]?.variant
                }
              >
                {
                  WORKORDER_STATUS[
                    workOrder.estado
                  ]?.label
                }
              </Badge>

            </div>

            <p>
              {workOrder.proveedor || 'Sin proveedor'}
            </p>

          </div>

        </div>

        <div className="workorder-header-right">

          <div className="workorder-amount">

            <span>
              Presupuesto
            </span>

            <strong>
              {Number(
                workOrder.precio || 0
              ).toLocaleString('es-ES')} €
            </strong>

          </div>

          <Button
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(workOrder);
            }}
          >

            <Pencil size={15} />

            Editar

          </Button>

          <Button
            variant="ghost"
            onClick={() => setOpen(!open)}
          >

            {open
              ? <ChevronUp size={18} />
              : <ChevronDown size={18} />
            }

          </Button>

        </div>

      </div>

      {/* ========================================== */}
      {/* KPIS */}
      {/* ========================================== */}

      <div className="workorder-kpis">

        <div className="wo-kpi">

          <div className="wo-kpi-icon blue">

            <Euro size={16} />

          </div>

          <div>

            <span>
              Facturado
            </span>

            <strong>
              {concedido.toLocaleString('es-ES')} €
            </strong>

          </div>

        </div>

        <div className="wo-kpi">

          <div className="wo-kpi-icon purple">

            <Percent size={16} />

          </div>

          <div>

            <span>
              Progreso
            </span>

            <strong>
              {Math.round(progress)}%
            </strong>

          </div>

        </div>

        <div className="wo-kpi">

          <div className="wo-kpi-icon green">

            <CheckCircle2 size={16} />

          </div>

          <div>

            <span>
              Hitos
            </span>

            <strong>
              {safeHitos.length}
            </strong>

          </div>

        </div>

      </div>

      {/* ========================================== */}
      {/* PROGRESS BAR */}
      {/* ========================================== */}

      <div className="wo-progress-wrapper">

        <div className="wo-progress-bar">

          <div
            className="wo-progress-fill"
            style={{
              width: `${progress}%`
            }}
          />

        </div>

        <span className="wo-progress-label">

          {Math.round(progress)}%
          completado

        </span>

      </div>

      {/* ========================================== */}
      {/* WARNINGS */}
      {/* ========================================== */}

      {(porcentajeExcedido ||
        warningImporte) && (

          <div className="wo-warnings">

            {porcentajeExcedido && (

              <div className="wo-warning-item">

                <AlertTriangle size={16} />

                <span>
                  El porcentaje total
                  supera el 100%
                </span>

              </div>

            )}

            {warningImporte && (

              <div className="wo-warning-item">

                <AlertTriangle size={16} />

                <span>
                  El importe de hitos
                  no coincide con la WO
                </span>

              </div>

            )}

          </div>

        )}

      {/* ========================================== */}
      {/* HITOS */}
      {/* ========================================== */}

      {open && (

        <div className="wo-hitos-section">

          <div className="wo-hitos-header">

            <div>

              <h4>
                Hitos de facturación
              </h4>

              <p>
                Seguimiento financiero y validaciones
              </p>

            </div>

            <Button onClick={handleCreateHito}>

              <Plus size={15} />

              Nuevo Hito

            </Button>

          </div>

          {loading && (

            <div className="wo-loading">
              Cargando hitos...
            </div>

          )}

          {!loading && (

            <>

              {/* RESUMEN */}

              <div className="wo-hitos-summary">

                <div className="wo-summary-card">

                  <span>
                    Pendiente
                  </span>

                  <strong>

                    {pendienteImporte.toLocaleString('es-ES')} €

                  </strong>

                </div>

                <div className="wo-summary-card">

                  <span>
                    En curso
                  </span>

                  <strong>
                    {hitosEnCurso}
                  </strong>

                </div>

                <div className="wo-summary-card">

                  <span>
                    Solicitado. VB
                  </span>

                  <strong>
                    {hitosSolicitados}
                  </strong>

                </div>

                <div
                  className={`
      wo-summary-card
      risk-${riesgo.toLowerCase()}
    `}
                >

                  <span>
                    Riesgo
                  </span>

                  <strong>
                    {riesgo}
                  </strong>

                </div>

              </div>

              {/* GRID DE HITOS */}

              <div className="wo-hitos-grid">

                {safeHitos.map(h => {

                  const isEditing =
                    editingHito === h.id;

                  return (

                    <Card
                      key={h.id}
                      className="wo-hito-card"
                    >

                      {/* CABECERA */}

                      <div className="wo-hito-header">

                        <div className="wo-hito-left">

                          <span className="wo-hito-code">
                            {h.codigo}
                          </span>

                          <WorkOrderStatusBadge
                            status={workOrder.estado}
                          />
                          <span className="wo-hito-progress-badge">

                            {Number(h.porcentaje || 0)}%

                          </span>

                        </div>

                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            setEditingHito(
                              isEditing
                                ? null
                                : h.id
                            )
                          }
                        >

                          {isEditing
                            ? 'Cerrar'
                            : 'Editar'}

                        </Button>

                      </div>

                      {/* DETALLE */}
                      <div className="wo-hito-main-row">

                        <div className="wo-hito-objective">

                          <span>

                            🎯 Objetivo

                          </span>

                          <p>

                            {h.descripcion ||
                              'Sin descripción definida'}

                          </p>

                        </div>

                        <div className="wo-hito-amount">

                          <span>

                            💰 Importe

                          </span>

                          <strong>

                            {Number(
                              h.importe || 0
                            ).toLocaleString('es-ES')} €

                          </strong>

                        </div>

                      </div>

                      {/* FECHAS */}

                      <div className="wo-hito-dates">

                        <div className="wo-hito-date">

                          <span>
                            📅 Inicio WO
                          </span>

                          <strong>

                            {formatDate(
                              workOrder.fechaInicio
                            )}

                          </strong>

                        </div>

                        <div className="wo-hito-date">

                          <span>
                            🏁 Fin WO
                          </span>

                          <strong>

                            {formatDate(
                              workOrder.fechaFin
                            )}

                          </strong>

                        </div>

                      </div>

                      {/* PANEL EDICIÓN */}

                      {isEditing && (

                        <div className="wo-hito-editor">

                          <div className="wo-field">

                            <label>

                              Descripción

                            </label>

                            <textarea
                              rows={4}
                              value={h.descripcion}
                              onChange={(e) =>
                                updateField(
                                  h.id,
                                  'descripcion',
                                  e.target.value
                                )
                              }
                            />

                          </div>

                          <div className="wo-editor-grid">

                            <div className="wo-field">

                              <label>

                                %

                              </label>

                              <input
                                type="number"
                                value={h.porcentaje}
                                onChange={(e) =>
                                  updateField(
                                    h.id,
                                    'porcentaje',
                                    e.target.value
                                  )
                                }
                              />

                            </div>

                            <div className="wo-field">

                              <label>

                                €

                              </label>

                              <input
                                type="number"
                                value={h.importe}
                                onChange={(e) =>
                                  updateField(
                                    h.id,
                                    'importe',
                                    e.target.value
                                  )
                                }
                              />

                            </div>

                          </div>

                          <div className="wo-field">

                            <label>

                              Estado

                            </label>

                            <select
                              value={h.estado}
                              onChange={(e) =>
                                updateField(
                                  h.id,
                                  'estado',
                                  e.target.value
                                )
                              }
                            >

                              <option value="EN_CURSO">
                                En curso
                              </option>

                              <option value="SOLICITADO_VB">
                                Solicitado VB
                              </option>

                              <option value="CONCEDIDO_VB">
                                Concedido VB
                              </option>

                            </select>

                          </div>

                        </div>

                      )}

                    </Card>

                  );

                })}

              </div>

            </>

          )}

        </div>

      )}

    </Card>

  );

};

export default WorkOrderCard;