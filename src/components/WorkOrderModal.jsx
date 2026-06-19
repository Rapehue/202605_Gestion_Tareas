// src/components/workorders/WorkOrderModal.jsx

import { useState } from 'react';

import { Modal } from '@/components/';
import Stack from '@/layout/primitives/Stack';

import Button from '@/components/ui/Button';

import WorkOrderForm from './WorkOrderForm';
import HitosTableEditable from './HitosTableEditable';

import {
  createWorkOrder,
  updateWorkOrder
} from '@/api/workordersApi';

import {
  createHito,
  updateHito
} from '@/api/hitosApi';
import WorkOrderTasksPanel from './workorder/tasks/WorkOrderTasksPanel';

const WorkOrderModal = ({
  open,
  onClose,
  workOrder,
  onSaved,
  projectId
}) => {

  const [formData, setFormData] =
    useState(null);

  const [hitosForm, setHitosForm] =
    useState([]);

  const [saving, setSaving] =
    useState(false);

  // =====================================================
  // GUARDADO UNIFICADO
  // =====================================================

  const handleSaveTodo = async () => {

    if (!formData) return;

    try {

      setSaving(true);

      const cleanWOData = {

        ...formData,

        codigo:
          formData.codigo
            ? String(formData.codigo).trim()
            : '',

        id_proyecto:
          formData.id_proyecto
            ? parseInt(
              formData.id_proyecto,
              10
            )
            : parseInt(
              projectId,
              10
            ),

        precio:
          Number(
            formData.precio || 0
          ),

        jornadas:
          Number(
            formData.jornadas || 0
          )

      };

      let workOrderId;

      // ==========================================
      // WORK ORDER
      // ==========================================

      if (workOrder?.id) {

        console.log(
          '✏️ Actualizando Work Order'
        );

        const updatedWO =
          await updateWorkOrder(
            workOrder.id,
            cleanWOData
          );

        workOrderId =
          updatedWO?.id ||
          workOrder.id;

      } else {

        console.log(
          '➕ Creando Work Order'
        );

        const nuevaWO =
          await createWorkOrder(
            cleanWOData
          );

        workOrderId =
          nuevaWO.id ||
          nuevaWO.id_work_order;

      }

      console.log(
        'WORK ORDER ID:',
        workOrderId
      );

      // ==========================================
      // HITOS
      // ==========================================

      for (const hito of hitosForm) {

        console.log(
          'Procesando hito:',
          hito
        );

        const payloadHito = {

          ...hito,

          id_work_order:
            workOrderId,

          fecha_solicitud_vb:
            !hito.fecha_solicitud_vb ||
              hito.fecha_solicitud_vb ===
              'Invalid date'
              ? null
              : hito.fecha_solicitud_vb,

          fecha_concesion_vb:
            !hito.fecha_concesion_vb ||
              hito.fecha_concesion_vb ===
              'Invalid date'
              ? null
              : hito.fecha_concesion_vb

        };

        delete payloadHito.fechaSolicitudVb;
        delete payloadHito.fechaConcesionVb;
        delete payloadHito.workOrderId;

        if (hito.id) {

          console.log(
            'UPDATE HITO',
            hito.id
          );

          await updateHito(
            hito.id,
            payloadHito
          );

        } else {

          console.log(
            'CREATE HITO'
          );

          await createHito(
            payloadHito
          );

        }

      }

      console.log(
        '🎉 Proceso completado'
      );

      onSaved?.();

      onClose?.();

    } catch (error) {

      console.error(
        '🚨 Error guardando WO',
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

    <Modal
      open={open}
      onClose={onClose}
      title={
        workOrder?.id
          ? 'Editar Work Order'
          : 'Nueva Work Order'
      }
      size="xl"
    >

      <Stack gap="xl">

        <WorkOrderForm
          initialData={workOrder}
          projectId={projectId}
          isModalControlled={true}
          onChangeForm={setFormData}
        />

        <HitosTableEditable
          workOrderId={workOrder?.id}
          workOrderImporte={
            formData?.precio ||
            workOrder?.precio ||
            0
          }
          onChangeHitos={
            setHitosForm
          }
        />

        <WorkOrderTasksPanel
          workOrderId={workOrder?.id}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '1rem'
          }}
        >

          <Button
            onClick={handleSaveTodo}
            disabled={saving}
            className="btn-primary"
          >

            {
              saving
                ? 'Guardando...'
                : workOrder?.id
                  ? 'Guardar Cambios'
                  : 'Crear Work Order'
            }

          </Button>

        </div>

      </Stack>

    </Modal>

  );

};

export default WorkOrderModal;