import { useEffect, useState } from 'react';

import {
  BriefcaseBusiness,
  Save
} from 'lucide-react';

import Button from '@/components/ui/Button';

import WorkOrderHeader
  from './workorder/WorkOrderHeader';

import WorkOrderObjectivesSection
  from './workorder/WorkOrderObjectivesSection';

import WorkOrderPlanningSection
  from './workorder/WorkOrderPlanningSection';

import WorkOrderFinancialSection
  from './workorder/WorkOrderFinancialSection';

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
  prioridad: 'MEDIA',
  estado: 'BORRADOR'
};

const WorkOrderForm = ({
  initialData,
  onChangeForm,
  isModalControlled = false
}) => {

  const [form, setForm] =
    useState(INITIAL_FORM);

  const isEdit =
    Boolean(initialData?.id);

  // =====================================
  // LOAD
  // =====================================

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

  // =====================================
  // SYNC WITH MODAL
  // =====================================

  useEffect(() => {

    if (isModalControlled) {

      onChangeForm?.(form);

    }

  }, [
    form,
    isModalControlled,
    onChangeForm
  ]);

  // =====================================
  // CHANGE
  // =====================================

  const handleChange = (
    field,
    value
  ) => {

    setForm(prev => ({
      ...prev,
      [field]: value
    }));

  };

  // =====================================
  // RENDER
  // =====================================

  return (

    <div className="workorder-form">

      <div className="wo-form-header">

        <div className="wo-form-header-left">

          <div className="wo-form-icon">

            <BriefcaseBusiness
              size={20}
            />

          </div>

          <div>

            <h2>

              {
                isEdit
                  ? 'Editar Work Order'
                  : 'Nueva Work Order'
              }

            </h2>

            <p>

              Gestión económica y operativa
              de la orden de trabajo

            </p>

          </div>

        </div>

      </div>

      <WorkOrderHeader
        form={form}
        onChange={handleChange}
      />

      <div className="wo-form-grid">

        <WorkOrderObjectivesSection
          form={form}
          onChange={handleChange}
        />

        <WorkOrderPlanningSection
          form={form}
          onChange={handleChange}
        />

        <WorkOrderFinancialSection
          form={form}
          onChange={handleChange}
        />

      </div>

    </div>

  );

};

export default WorkOrderForm;