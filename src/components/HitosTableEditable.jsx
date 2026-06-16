// src/components/hitos/HitosTableEditable.jsx

import { useEffect, useMemo, useState } from 'react';

import {
    getHitosByWorkOrder,
    createHito,
    updateHito
} from '@/api/hitosApi';

import Stack from '@/layout/primitives/Stack';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

import HitoCardEditable
  from './hitos/HitoCardEditable';

import HitoSummary
  from './hitos/HitoSummary';

import './HitosTableEditable.css';

// ======================================================
// CONSTANTS
// ======================================================

const ESTADOS = [
    {
        value: 'EN_CURSO',
        label: 'En Curso'
    },
    {
        value: 'SOLICITADO_VB',
        label: 'VB Solicitado'
    },
    {
        value: 'CONCEDIDO_VB',
        label: 'VB Concedido'
    }
];

// 💡 CORREGIDO: Todo el objeto inicial se unifica estrictamente a snake_case
const EMPTY_HITO = {
    codigo: '',
    descripcion: '',
    porcentaje: '',
    importe: '',
    estado: 'EN_CURSO',
    fecha_solicitud_vb: '',
    fecha_concesion_vb: ''
};

// ======================================================
// COMPONENT
// ======================================================

const HitosTableEditable = ({
    workOrderId,
    workOrderImporte = 0,
    onUpdated,
    onChangeHitos // 👈 NUEVA PROP para avisar al formulario padre
}) => {

    const [hitos, setHitos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    // ======================================================
    // LOAD
    // ======================================================

    const loadHitos = async () => {
        if (!workOrderId) return;

        try {
            setLoading(true);
            const response = await getHitosByWorkOrder(workOrderId);
            const data = response?.data || response || [];

            // 🛡️ Mapeo de seguridad: Si el backend nos responde con camelCase en algún campo por error,
            // lo normalizamos inmediatamente a snake_case para que el formulario no falle.
            const normalizedData = (Array.isArray(data) ? data : []).map(hito => ({
                ...hito,
                fecha_solicitud_vb: hito.fecha_solicitud_vb || hito.fechaSolicitudVb || '',
                fecha_concesion_vb: hito.fecha_concesion_vb || hito.fechaConcesionVb || ''
            }));

            setHitos(normalizedData);

        } catch (error) {
            console.error('ERROR LOADING HITOS', error);
            setHitos([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadHitos();
    }, [workOrderId]);

    // ======================================================
    // TOTALS
    // ======================================================

    const totalPorcentaje = useMemo(() => {
        return hitos.reduce(
            (acc, hito) => acc + Number(hito.porcentaje || 0),
            0
        );
    }, [hitos]);

    const totalImporte = useMemo(() => {
        return hitos.reduce(
            (acc, hito) => acc + Number(hito.importe || 0),
            0
        );
    }, [hitos]);

    const porcentajeExcedido = totalPorcentaje > 100;
    const importeExcedido = totalImporte > Number(workOrderImporte || 0);

    // console.log ('Importe Excedido: ' + importeExcedido + '. totalImporte: ' + totalImporte + '. workOrderImporte :' + workOrderImporte)
    // ======================================================
    // CHANGE (CORREGIDO: Detección inteligente de eventos y valores)
    // ======================================================

    // ======================================================
    // CHANGE (CORRECCIÓN DEFINITIVA DE VARIABLES INTERNAS)
    // ======================================================

    // ======================================================
    // CHANGE (CORREGIDO: Sincroniza con el componente Padre)
    // ======================================================
    const handleChange = (index, field, eventOrValue) => {
        const updated = [...hitos];

        let targetField = field;
        if (field === 'fechaSolicitudVb') targetField = 'fecha_solicitud_vb';
        if (field === 'fechaConcesionVb') targetField = 'fecha_concesion_vb';

        let finalValue;
        if (eventOrValue && typeof eventOrValue === 'object' && 'target' in eventOrValue) {
            finalValue = eventOrValue.target.value;
        } else {
            finalValue = eventOrValue;
        }

        if (finalValue === 'Invalid date' || finalValue === undefined || finalValue === null) {
            finalValue = '';
        }

        updated[index] = {
            ...updated[index],
            [targetField]: finalValue
        };

        if (targetField === 'estado') {
            const todayStr = new Date().toISOString().split('T')[0];
            if (finalValue === 'SOLICITADO_VB') updated[index].fecha_solicitud_vb = todayStr;
            if (finalValue === 'CONCEDIDO_VB') {
                if (!updated[index].fecha_solicitud_vb) updated[index].fecha_solicitud_vb = todayStr;
                updated[index].fecha_concesion_vb = todayStr;
            }
            if (finalValue === 'EN_CURSO') {
                updated[index].fecha_solicitud_vb = '';
                updated[index].fecha_concesion_vb = '';
            }
        }

        setHitos(updated);
        // 🌟 Avisamos al padre de los hitos actualizados en tiempo real
        onChangeHitos?.(updated);
    };

    // ======================================================
    // ADD
    // ======================================================

    const handleAdd = () => {
        const updated = [...hitos, { ...EMPTY_HITO }];
        setHitos(updated);
        onChangeHitos?.(updated); // 🌟 Avisamos al padre
    };

    // ======================================================
    // SAVE (CORREGIDO: Eliminación de propiedades duplicadas)
    // ======================================================

    const handleSave = async () => {
        try {
            setSaving(true);

            for (const hito of hitos) {

                // 1. Forzamos el formato correcto YYYY-MM-DD o NULL real para MySQL
                // Si el campo está vacío o es un string inválido, mandamos NULL (sin comillas)
                const cleanFechaSolicitud =
                    !hito.fecha_solicitud_vb || hito.fecha_solicitud_vb === 'Invalid date'
                        ? null
                        : hito.fecha_solicitud_vb;

                const cleanFechaConcesion =
                    !hito.fecha_concesion_vb || hito.fecha_concesion_vb === 'Invalid date'
                        ? null
                        : hito.fecha_concesion_vb;

                // 2. Construimos el payload inicial
                const payload = {
                    ...hito,
                    id_work_order: workOrderId,
                    fecha_solicitud_vb: cleanFechaSolicitud,
                    fecha_concesion_vb: cleanFechaConcesion
                };

                // 3. 💣 PURGA TOTAL: Eliminamos los residuos en camelCase para evitar el conflicto en el ORM
                delete payload.fechaSolicitudVb;
                delete payload.fechaConcesionVb;
                delete payload.workOrderId; // Quitamos también este si la BD usa id_work_order

                // 🔍 Verificamos en consola que el objeto vaya limpio y estrictamente en snake_case
                // console.log('🚀 Payload definitivo enviado a la API:', payload);

                if (hito.id) {
                    const response = await updateHito(hito.id, payload);
                    // console.log('UPDATE RESPONSE', response);
                } else {
                    await createHito(payload);
                }
            }

            await loadHitos();
            onUpdated?.();

        } catch (error) {
            console.error('ERROR SAVING HITOS', error);
        } finally {
            setSaving(false);
        }
    };

    // ======================================================
    // RENDER
    // ======================================================

    return (
        <Card className="hitos-editable-card">
            <Stack gap="lg">

                {/* HEADER */}
                <div className="hitos-header">
                    <div>
                        <h3>Hitos de Facturación</h3>
                        <p>Gestión financiera asociada a la Work Order</p>
                    </div>
                    <Button onClick={handleAdd} className="btn-add-hito">
                        + Añadir Hito
                    </Button>
                </div>

                {/* WARNINGS */}
                {porcentajeExcedido && (
                    <div className="warning-box text-danger">
                        ⚠ El total de porcentajes supera el 100%
                    </div>
                )}

                {importeExcedido && (
                    <div className="warning-box text-danger">
                        ⚠ El importe total supera el importe original de la Work Order
                    </div>
                )}

                {/* SUMMARY CARDS */}
                <HitoSummary

  numeroHitos={hitos.length}

  totalPorcentaje={totalPorcentaje}

  totalImporte={totalImporte}

  porcentajeExcedido={porcentajeExcedido}

  importeExcedido={importeExcedido}

/>

                {/* LISTA DE HITOS EDITABLES */}
                <div className="hitos-cards-container">

  {loading && (

    <div className="hitos-loading-status">

      Cargando hitos financieros...

    </div>

  )}

  {!loading && hitos.map((hito, index) => (

    <HitoCardEditable

      key={hito.id || index}

      hito={hito}

      index={index}

      onChange={handleChange}

    />

  ))}

</div>

                {/* ACCIONES PIE */}
                {workOrderId && (
                    <div className="hitos-actions">
                        <Button onClick={handleSave} className="btn-save-hitos">
                            {saving ? 'Guardando cambios...' : 'Guardar Hitos Financieros'}
                        </Button>
                    </div>
                )}

            </Stack>
        </Card>
    );
};

export default HitosTableEditable;