// src/components/workorders/WorkOrderModal.jsx

import { useState } from 'react';
import { Modal } from '@/components/';
import Stack from '@/layout/primitives/Stack';
import Button from '@/components/ui/Button'; // Asegúrate de importar tu botón

import WorkOrderForm from './WorkOrderForm';
import HitosTableEditable from './HitosTableEditable';

import { createWorkOrder } from '@/api/workordersApi';
import { createHito } from '@/api/hitosApi';

const WorkOrderModal = ({
  open,
  onClose,
  workOrder,
  onSaved,
  projectId
}) => {
  // 1. 🌟 Declaramos los estados compartidos aquí en el Modal
  const [formData, setFormData] = useState(null);
  const [hitosForm, setHitosForm] = useState([]);
  const [saving, setSaving] = useState(false);

  // 2. 🚀 FUNCIÓN MAESTRA DE GUARDADO UNIFICADO
  const handleSaveTodo = async () => {
    if (!formData) return;

    try {
      setSaving(true);

      // A. Formateamos el payload de la Work Order
      const cleanWOData = {
        ...formData,
        codigo: formData.codigo ? String(formData.codigo).trim() : '',
        id_proyecto: formData.id_proyecto ? parseInt(formData.id_proyecto, 10) : parseInt(projectId, 10),
        precio: formData.precio ? Number(formData.precio) : 0,
        importe: formData.importe ? Number(formData.importe) : 0
      };

      console.log("1️⃣ Guardando cabecera de la Work Order...");
      const nuevaWO = await createWorkOrder(cleanWOData);
      
      // Extraemos el ID real generado por la Base de Datos
      const nuevoWorkOrderId = nuevaWO.id || nuevaWO.id_work_order;

      // B. Guardamos los hitos secuencialmente vinculados al nuevo ID
      if (hitosForm && hitosForm.length > 0) {
        console.log(`2️⃣ Guardando ${hitosForm.length} hitos para la WO ID: ${nuevoWorkOrderId}`);
        
        for (const hito of hitosForm) {
          const cleanFechaSolicitud = !hito.fecha_solicitud_vb || hito.fecha_solicitud_vb === 'Invalid date' ? null : hito.fecha_solicitud_vb;
          const cleanFechaConcesion = !hito.fecha_concesion_vb || hito.fecha_concesion_vb === 'Invalid date' ? null : hito.fecha_concesion_vb;

          const payloadHito = {
            ...hito,
            id_work_order: nuevoWorkOrderId, // ID inyectado
            fecha_solicitud_vb: cleanFechaSolicitud,
            fecha_concesion_vb: cleanFechaConcesion
          };

          delete payloadHito.fechaSolicitudVb;
          delete payloadHito.fechaConcesionVb;
          delete payloadHito.workOrderId;

          await createHito(payloadHito);
        }
      }

      console.log("🎉 ¡Proceso completado con éxito!");
      onSaved?.(); // Avisa al padre para refrescar la lista general
      onClose();   // Cierra el modal

    } catch (error) {
      console.error("🚨 Error crítico en el guardado conjunto:", error);
    } finally {
      setSaving(false);
    }
  };


  return (
    <Modal
      open={open}
      onClose={onClose}
      title={workOrder?.id ? 'Editar Work Order' : 'Nueva Work Order'}
      size="xl"
    >
      <Stack gap="xl">
        
        {/* FORMULARIO DE CABECERA */}
        <WorkOrderForm
          initialData={workOrder}
          projectId={projectId}
          // 💡 Cada vez que el usuario escriba algo en el form, actualiza el estado del modal
          onChangeForm={(data) => setFormData(data)} 
          isModalControlled={true} // Una bandera para decirle al formulario que no se guarde a sí mismo
        />

        {/* TABLA EDITABLE DE HITOS */}
        <HitosTableEditable
          workOrderId={workOrder?.id}
          workOrderImporte={formData?.precio || workOrder?.precio || 0} // 🎯 ¡Corregido! Lee del estado local
          onChangeHitos={(hitosActualizados) => setHitosForm(hitosActualizados)} // 🎯 ¡Corregido! Sincroniza el array
        />

        {/* BOTÓN ÚNICO DE ACCIÓN AL FINAL DEL MODAL */}
        {!workOrder?.id && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <Button onClick={handleSaveTodo} disabled={saving} className="btn-primary">
              {saving ? 'Guardando todo...' : 'Crear Work Order e Hitos'}
            </Button>
          </div>
        )}

      </Stack>
    </Modal>
  );
};

export default WorkOrderModal;