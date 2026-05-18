import { useEffect, useState } from 'react';
import {
  createWorkOrder,
  updateWorkOrder
} from '../api/workordersApi';

const WorkOrderForm = ({ initialData, projectId, onSaved }) => {

  const [form, setForm] = useState({
    proveedor: '',
    codigo: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    jornadas: '',
    precio: ''
  });

  const isEdit = !!initialData;

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        proveedor: '',
        codigo: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        jornadas: '',
        precio: ''
      });
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await updateWorkOrder(initialData.id, form);
    } else {
      await createWorkOrder({
        ...form,
        id_proyecto: projectId
      });
    }

    onSaved?.();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>

      <input
        placeholder="Código"
        value={form.codigo}
        onChange={e => handleChange('codigo', e.target.value)}
        required
      />

      <input
        placeholder="Proveedor"
        value={form.proveedor}
        onChange={e => handleChange('proveedor', e.target.value)}
      />

      <input
        placeholder="Descripción"
        value={form.descripcion}
        onChange={e => handleChange('descripcion', e.target.value)}
      />

      <input
        type="date"
        value={form.fecha_inicio}
        onChange={e => handleChange('fecha_inicio', e.target.value)}
      />

      <input
        type="date"
        value={form.fecha_fin}
        onChange={e => handleChange('fecha_fin', e.target.value)}
      />

      <input
        type="number"
        placeholder="Jornadas"
        value={form.jornadas}
        onChange={e => handleChange('jornadas', e.target.value)}
      />

      <input
        type="number"
        placeholder="Precio"
        value={form.precio}
        onChange={e => handleChange('precio', e.target.value)}
      />

      <button type="submit" className="btn-primary">
        Guardar
      </button>

    </form>
  );
};

export default WorkOrderForm;