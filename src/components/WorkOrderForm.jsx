import { useEffect, useState } from 'react';

import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ClipboardList,
  Coins,
  FileText,
  Save,
  Timer
} from 'lucide-react';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

import {
  createWorkOrder,
  updateWorkOrder
} from '../api/workordersApi';

import {
  createHito,
  updateHito
} from '../api/hitosApi';

import './WorkOrderForm.css';

const INITIAL_FORM = {
  proveedor: '',
  codigo: '',
  descripcion: '',
  objetivo: '',
  fecha_inicio: '',
  fecha_fin: '',
  jornadas: '',
  precio: '',
  id_proyecto: '',
  estado: 'BORRADOR'
};

const WorkOrderForm = ({
  initialData,
  projectId,
  onSaved,
  isModalControlled = false, // 👈 AÑADIR AQUÍ (con un valor por defecto)
  onChangeForm               // 👈 AÑADIR AQUÍ
}) => {

  const [form, setForm] =
    useState(INITIAL_FORM);

  const [saving, setSaving] =
    useState(false);

  // 1. Crea un estado en tu formulario para almacenar los hitos que se escriben abajo
  const [hitosForm, setHitosForm] = useState([]);

  const isEdit = !!initialData;

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {

    if (initialData) {

      setForm({
        ...INITIAL_FORM,
        ...initialData
      });

    } else {

      setForm(INITIAL_FORM);

    }

  }, [initialData]);

  // Dentro de WorkOrderForm.jsx:

  // Cada vez que el estado interno 'form' cambie, se lo enviamos al modal
  useEffect(() => {
    if (isModalControlled) {
      onChangeForm?.(form);
    }
  }, [form, isModalControlled, onChangeForm]); // Añadidas dependencias limpias para evitar warnings

  // =====================================================
  // CHANGE
  // =====================================================

  const handleChange = (
    field,
    value
  ) => {

    setForm(prev => ({
      ...prev,
      [field]: value
    }));

  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      const cleanPayload = {
        ...form,
        codigo: form.codigo?.trim() || '',
        id_proyecto: parseInt(projectId, 10),
        precio: Number(form.precio || 0),
        jornadas: Number(form.jornadas || 0)
      };

      let workOrderId;

      // =====================================
      // WORK ORDER
      // =====================================

      if (isEdit) {

        console.log('✏️ Actualizando WO');
        
        console.log(
          'PAYLOAD UPDATE WO:',
          cleanPayload
        );

        await updateWorkOrder(
          initialData.id,
          cleanPayload
        );

        workOrderId = initialData.id;

      } else {

        console.log('➕ Creando WO');

        const nuevaWO =
          await createWorkOrder(
            cleanPayload
          );

        workOrderId =
          nuevaWO.id ||
          nuevaWO.id_work_order;

      }

      // =====================================
      // HITOS
      // =====================================

      if (hitosForm?.length) {

        for (const hito of hitosForm) {

          const payloadHito = {
            ...hito,
            id_work_order: workOrderId
          };

          if (hito.id) {

            await updateHito(
              hito.id,
              payloadHito
            );

          } else {

            await createHito(
              payloadHito
            );

          }

        }

      }

      onSaved?.();

    } catch (error) {

      console.error(
        'ERROR EN EL PROCESO DE GUARDADO:',
        error
      );

    } finally {

      setSaving(false);

    }

  };

  // =====================================================
  // RENDER
  // =====================================================

  return (

    <form
      className="workorder-form"
      onSubmit={handleSubmit}
    >

      {/* ========================================== */}
      {/* HEADER */}
      {/* ========================================== */}

      <div className="wo-form-header">

        <div className="wo-form-header-left">

          <div className="wo-form-icon">

            <BriefcaseBusiness size={20} />

          </div>

          <div>

            <h2>
              {isEdit
                ? 'Editar Work Order'
                : 'Nueva Work Order'}
            </h2>

            <p>
              Gestión económica y
              operativa de la orden
            </p>

          </div>

        </div>

      </div>

      {/* ========================================== */}
      {/* MAIN GRID */}
      {/* ========================================== */}

      <div className="wo-form-grid">

        {/* ====================================== */}
        {/* IDENTIFICACIÓN */}
        {/* ====================================== */}

        <Card className="wo-form-card">

          <div className="wo-form-section-title">

            <ClipboardList size={18} />

            <span>
              Identificación
            </span>

          </div>

          <div className="wo-fields-grid">

            <div className="wo-field">

              <label>
                Código
              </label>

              <div className="wo-input-wrapper">

                <FileText size={16} />

                <input
                  placeholder="WO-2026-001"
                  value={form.codigo}
                  onChange={(e) =>
                    handleChange(
                      'codigo',
                      e.target.value
                    )
                  }
                  required
                />

              </div>

            </div>

            <div className="wo-field">

              <label>
                Proveedor
              </label>

              <div className="wo-input-wrapper">

                <Building2 size={16} />

                <input
                  placeholder="Proveedor"
                  value={form.proveedor}
                  onChange={(e) =>
                    handleChange(
                      'proveedor',
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            <div className="wo-field wo-field-full">

              <label>
                Descripción
              </label>

              <textarea
                rows={4}
                placeholder="Descripción funcional y operativa..."
                value={form.descripcion}
                onChange={(e) =>
                  handleChange(
                    'descripcion',
                    e.target.value
                  )
                }
              />

            </div>

          </div>

        </Card>

        {/* ====================================== */}
        {/* OBJETIVOS */}
        {/* ====================================== */}

        <Card className="wo-form-card">

          <div className="wo-form-section-title">

            <ClipboardList size={18} />

            <span>
              Objetivos y alcance
            </span>

          </div>

          <div className="wo-fields-grid">

            <div className="wo-field wo-field-full">

              <label>
                Objetivos de la Work Order
              </label>

              <textarea
                rows={5}
                placeholder="
Define los objetivos funcionales, operativos y de negocio que se pretenden alcanzar con esta Work Order...
        "
                value={form.objetivo}
                onChange={(e) =>
                  handleChange(
                    'objetivo',
                    e.target.value
                  )
                }
              />

              <small className="wo-help-text">

                Describe el impacto esperado, mejoras,
                automatizaciones o entregables asociados.

              </small>

            </div>

          </div>

        </Card>
        {/* ====================================== */}
        {/* PLANIFICACIÓN */}
        {/* ====================================== */}

        <Card className="wo-form-card">

          <div className="wo-form-section-title">

            <CalendarDays size={18} />

            <span>
              Planificación
            </span>

          </div>

          <div className="wo-fields-grid">

            <div className="wo-field">

              <label>
                Fecha inicio
              </label>

              <input
                type="date"
                value={form.fecha_inicio}
                onChange={(e) =>
                  handleChange(
                    'fecha_inicio',
                    e.target.value
                  )
                }
              />

            </div>

            <div className="wo-field">

              <label>
                Fecha fin
              </label>

              <input
                type="date"
                value={form.fecha_fin}
                onChange={(e) =>
                  handleChange(
                    'fecha_fin',
                    e.target.value
                  )
                }
              />

            </div>

          </div>

        </Card>

        {/* ====================================== */}
        {/* ECONÓMICO */}
        {/* ====================================== */}

        <Card className="wo-form-card">

          <div className="wo-form-section-title">

            <Coins size={18} />

            <span>
              Información económica
            </span>

          </div>

          <div className="wo-fields-grid">

            <div className="wo-field">

              <label>
                Jornadas
              </label>

              <div className="wo-input-wrapper">

                <Timer size={16} />

                <input
                  type="number"
                  placeholder="0"
                  value={form.jornadas}
                  onChange={(e) =>
                    handleChange(
                      'jornadas',
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            <div className="wo-field">

              <label>
                Precio
              </label>

              <div className="wo-input-wrapper">

                <Coins size={16} />

                <input
                  type="number"
                  placeholder="0 €"
                  value={form.precio}
                  onChange={(e) =>
                    handleChange(
                      'precio',
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

          </div>

        </Card>


        {/* ====================================== */}
        {/* GOBIERNO */}
        {/* ====================================== */}
        <Card className="wo-form-card">

          <div className="wo-form-section-title">

            <ClipboardList size={18} />

            <span>
              Gobierno
            </span>

          </div>

          <div className="wo-fields-grid">

            <div className="wo-field">

              <label>
                Estado
              </label>

              <select
                value={form.estado}
                onChange={(e) =>
                  handleChange(
                    'estado',
                    e.target.value
                  )
                }
              >

                <option value="BORRADOR">
                  Borrador
                </option>

                <option value="EN_CURSO">
                  En curso
                </option>

                <option value="EN_VALIDACION">
                  En validación
                </option>

                <option value="FINALIZADA">
                  Finalizada
                </option>

                <option value="CANCELADA">
                  Cancelada
                </option>

              </select>

            </div>

          </div>

        </Card>

      </div>

      {/* ========================================== */}
      {/* ACTIONS */}
      {/* ========================================== */}

      <div className="wo-form-actions">

        <Button
          type="submit"
          className="wo-save-btn"
          disabled={saving}
        >

          <Save size={16} />

          {saving
            ? 'Guardando...'
            : 'Guardar Work Order'}

        </Button>

      </div>

    </form>

  );

};

export default WorkOrderForm;