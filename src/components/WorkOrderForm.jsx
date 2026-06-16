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
  WO_STATUS
} from '@/constants/workOrderStatus';

import './WorkOrderForm.css';
import WorkOrderStatusBadge from './WorkOrderStatusBadge';
import WorkOrderHeader from './workorder/WorkOrderHeader';
import WorkOrderObjectivesSection from './workorder/WorkOrderObjectivesSection';
import WorkOrderPlanningSection from './workorder/WorkOrderPlanningSection';
import WorkOrderFinancialSection from './workorder/WorkOrderFinancialSection';

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

  // const [saving, setSaving] =
  //   useState(false);

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

      console.log(initialData)

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

  const handleSubmit = (e) => e.preventDefault();
  // const handleSubmit = async (e) => {

  //   e.preventDefault();

  //   try {

  //     setSaving(true);

  //     const cleanPayload = {
  //       ...form,
  //       codigo: form.codigo?.trim() || '',
  //       id_proyecto: parseInt(projectId, 10),
  //       precio: Number(form.precio || 0),
  //       jornadas: Number(form.jornadas || 0)
  //     };

  //     let workOrderId;

  //     // =====================================
  //     // WORK ORDER
  //     // =====================================

  //     if (isEdit) {

  //       console.log('✏️ Actualizando WO');

  //       console.log(
  //         'PAYLOAD UPDATE WO:',
  //         cleanPayload
  //       );

  //       await updateWorkOrder(
  //         initialData.id,
  //         cleanPayload
  //       );

  //       workOrderId = initialData.id;

  //     } else {

  //       console.log('➕ Creando WO');

  //       const nuevaWO =
  //         await createWorkOrder(
  //           cleanPayload
  //         );

  //       workOrderId =
  //         nuevaWO.id ||
  //         nuevaWO.id_work_order;

  //     }

  //     // // =====================================
  //     // // HITOS
  //     // // =====================================

  //     // if (hitosForm?.length) {

  //     //   for (const hito of hitosForm) {

  //     //     const payloadHito = {
  //     //       ...hito,
  //     //       id_work_order: workOrderId
  //     //     };

  //     //     if (hito.id) {

  //     //       await updateHito(
  //     //         hito.id,
  //     //         payloadHito
  //     //       );

  //     //     } else {

  //     //       await createHito(
  //     //         payloadHito
  //     //       );

  //     //     }

  //     //   }

  //     // }

  //     onSaved?.();

  //   } catch (error) {

  //     console.error(
  //       'ERROR EN EL PROCESO DE GUARDADO:',
  //       error
  //     );

  //   } finally {

  //     setSaving(false);

  //   }

  // };

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

      <WorkOrderHeader
        form={form}
        onChange={handleChange}
      />

      {/* ========================================== */}
      {/* MAIN GRID */}
      {/* ========================================== */}

      <div className="wo-form-grid">

        {/* ====================================== */}
        {/* IDENTIFICACIÓN */}
        {/* ====================================== */}

        {/* ====================================== */}
        {/* OBJETIVOS */}
        {/* ====================================== */}

        <WorkOrderObjectivesSection
          form={form}
          onChange={handleChange}
        />

        {/* ====================================== */}
        {/* PLANIFICACIÓN */}
        {/* ====================================== */}

        <WorkOrderPlanningSection
          form={form}
          onChange={handleChange}
        />

        {/* ====================================== */}
        {/* ECONÓMICO */}
        {/* ====================================== */}

        <WorkOrderFinancialSection
          form={form}
          onChange={handleChange}
        />

      </div>

      {/* ========================================== */}
      {/* ACTIONS */}
      {/* ========================================== */}

      {/* <div className="wo-form-actions">

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

      </div> */}

    </form>

  );

};

export default WorkOrderForm;