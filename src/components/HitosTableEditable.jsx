// src/components/hitos/HitosTableEditable.jsx

import { useEffect, useMemo, useState } from 'react';

import {
  getHitosByWorkOrder
} from '@/api/hitosApi';

import Stack from '@/layout/primitives/Stack';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

import HitoCardEditable
  from './hitos/HitoCardEditable';

import HitoSummary
  from './hitos/HitoSummary';

import './HitosTableEditable.css';

const EMPTY_HITO = {
  codigo: '',
  descripcion: '',
  porcentaje: '',
  importe: '',
  estado: 'EN_CURSO',
  fecha_solicitud_vb: '',
  fecha_concesion_vb: ''
};

const HitosTableEditable = ({
  workOrderId,
  workOrderImporte = 0,
  onChangeHitos
}) => {

  const [hitos, setHitos] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadHitos = async () => {

    if (!workOrderId) {
      setHitos([]);
      return;
    }

    try {

      setLoading(true);

      const response =
        await getHitosByWorkOrder(
          workOrderId
        );

      const data =
        response?.data ||
        response ||
        [];

      setHitos(data);

      onChangeHitos?.(data);

    } catch (error) {

      console.error(
        'ERROR LOADING HITOS',
        error
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadHitos();
  }, [workOrderId]);

  const totalPorcentaje =
    useMemo(
      () =>
        hitos.reduce(
          (acc, h) =>
            acc + Number(h.porcentaje || 0),
          0
        ),
      [hitos]
    );

  const totalImporte =
    useMemo(
      () =>
        hitos.reduce(
          (acc, h) =>
            acc + Number(h.importe || 0),
          0
        ),
      [hitos]
    );

  const porcentajeExcedido =
    totalPorcentaje > 100;

  const importeExcedido =
    totalImporte >
    Number(workOrderImporte || 0);

  const handleChange = (
    index,
    field,
    value
  ) => {

    const updated = [...hitos];

    updated[index] = {
      ...updated[index],
      [field]: value
    };

    setHitos(updated);

    onChangeHitos?.(updated);
  };

  const handleAdd = () => {

    const updated = [
      ...hitos,
      { ...EMPTY_HITO }
    ];

    setHitos(updated);

    onChangeHitos?.(updated);
  };

  return (

    <Card className="hitos-editable-card">

      <Stack gap="lg">

        <div className="hitos-header">

          <div>

            <h3>
              Hitos de Facturación
            </h3>

            <p>
              Gestión financiera
              asociada a la Work Order
            </p>

          </div>

          <Button onClick={handleAdd}>
            + Añadir Hito
          </Button>

        </div>

        <HitoSummary
          numeroHitos={hitos.length}
          totalPorcentaje={totalPorcentaje}
          totalImporte={totalImporte}
          porcentajeExcedido={porcentajeExcedido}
          importeExcedido={importeExcedido}
        />

        <div className="hitos-cards-container">

          {!loading &&
            hitos.map(
              (hito, index) => (

                <HitoCardEditable
                  key={
                    hito.id ||
                    index
                  }
                  hito={hito}
                  index={index}
                  onChange={
                    handleChange
                  }
                />

              )
            )}

        </div>

      </Stack>

    </Card>

  );

};

export default HitosTableEditable;