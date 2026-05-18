import { useEffect, useState } from 'react';
import '../styles/ProyectoForm.css';
import UserAutocomplete from './UserAutocomplete';
import { createProyecto, updateProyecto } from '../api/proyectosApi';
import { useToast } from '../hooks/useToast';
import WorkOrdersPanel from './WorkOrdersPanel';

const ProyectoForm = ({ initialData, onSaved }) => {

  const isEdit = !!initialData;
  const { showToast, ToastComponent } = useToast();

  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});

  const [form, setForm] = useState({
    codigo: '',
    nombre: '',
    plan: '',
    eje: '',
    iniciativa: '',
    subiniciativa: '',
    objetivos: '',
    fecha_inicio: '',
    fecha_fin: '',

    gestor: null,
    peticionario: null,
    productOwner: null,
    proxy: null,
    liderD: null,
    liderV: null
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      // EDIT MODE
      setForm({
        codigo: initialData.codigo || '',
        nombre: initialData.nombre || '',
        plan: initialData.plan || '',
        eje: initialData.eje || '',
        iniciativa: initialData.iniciativa || '',
        subiniciativa: initialData.subiniciativa || '',
        objetivos: initialData.objetivos || '',
        fecha_inicio: initialData.fecha_inicio || '',
        fecha_fin: initialData.fecha_fin || '',

        gestor: mapUser(initialData.gestor),
        peticionario: mapUser(initialData.peticionario),
        productOwner: mapUser(initialData.productOwner),
        proxy: mapUser(initialData.proxy),
        liderD: mapUser(initialData.liderD),
        liderV: mapUser(initialData.liderV)
      });

    } else {
      // CREATE MODE → RESET TOTAL
      setForm({
        codigo: '',
        nombre: '',
        plan: '',
        eje: '',
        iniciativa: '',
        subiniciativa: '',
        objetivos: '',
        fecha_inicio: '',
        fecha_fin: '',

        gestor: null,
        peticionario: null,
        productOwner: null,
        proxy: null,
        liderD: null,
        liderV: null
      });

      setErrors({});
      setTouched({});
    }
  }, [initialData]);

  const mapUser = (u) =>
    u ? { value: u.id, label: u.nombre_completo } : null;

  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);

    const validation = validate(updated);
    setErrors(validation);
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // 🔥 VALIDACIÓN COMPLETA
  const validate = (data = form) => {
    const e = {};

    if (!data.codigo || data.codigo.length < 3)
      e.codigo = 'Mínimo 3 caracteres';

    if (!data.nombre)
      e.nombre = 'Obligatorio';

    if (!data.plan)
      e.plan = 'Obligatorio';

    if (!data.eje)
      e.eje = 'Obligatorio';

    if (!data.fecha_inicio)
      e.fecha_inicio = 'Obligatorio';

    if (!data.fecha_fin)
      e.fecha_fin = 'Obligatorio';

    if (data.fecha_inicio && data.fecha_fin &&
      data.fecha_fin < data.fecha_inicio)
      e.fecha_fin = 'Fecha inválida';

    // evitar duplicados en roles
    const users = [
      data.gestor?.value,
      data.peticionario?.value,
      data.productOwner?.value
    ].filter(Boolean);

    if (new Set(users).size !== users.length) {
      e.peticionario = 'Usuarios duplicados en roles';
    }

    return e;
  };

  const isValid = Object.keys(validate()).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validate();
    setErrors(validation);

    if (Object.keys(validation).length > 0) return;

    try {
      setLoading(true);

      const payload = {
        ...form,
        id_usuario_gestor: form.gestor?.value,
        id_usuario_peticionario: form.peticionario?.value,
        id_usuario_product_Owner: form.productOwner?.value,
        id_usuario_proxy: form.proxy?.value,
        id_usuario_LiderD: form.liderD?.value,
        id_usuario_LiderV: form.liderV?.value
      };

      if (isEdit) {
        await updateProyecto(initialData.id, payload);
      } else {
        await createProyecto(payload);
      }

      showToast('Proyecto guardado correctamente');
      onSaved();

    } catch {
      showToast('Error al guardar', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>

        {/* IDENTIFICACIÓN */}
        <Section title="Identificación">
          <Field label="Código" error={touched.codigo && errors.codigo}>
            <input value={form.codigo}
              onBlur={() => handleBlur('codigo')}
              onChange={e => handleChange('codigo', e.target.value)} />
          </Field>

          <Field label="Nombre" error={touched.nombre && errors.nombre}>
            <input value={form.nombre}
              onBlur={() => handleBlur('nombre')}
              onChange={e => handleChange('nombre', e.target.value)} />
          </Field>
        </Section>

        {/* CLASIFICACIÓN */}
        <Section title="Clasificación">
          {['plan', 'eje', 'iniciativa', 'subiniciativa'].map(f => (
            <Field key={f} label={f} error={touched[f] && errors[f]}>
              <input value={form[f]}
                onBlur={() => handleBlur(f)}
                onChange={e => handleChange(f, e.target.value)} />
            </Field>
          ))}
        </Section>

        {/* RESPONSABLES */}
        <Section title="Responsables">
          <UserField label="Gestor" value={form.gestor}
            onChange={v => handleChange('gestor', v)} />

          <UserField label="Peticionario" value={form.peticionario}
            error={errors.peticionario}
            onChange={v => handleChange('peticionario', v)} />

          <UserField label="Product Owner" value={form.productOwner}
            onChange={v => handleChange('productOwner', v)} />

          <UserField label="Proxy" value={form.proxy}
            onChange={v => handleChange('proxy', v)} />

          <UserField label="Líder D" value={form.liderD}
            onChange={v => handleChange('liderD', v)} />

          <UserField label="Líder V" value={form.liderV}
            onChange={v => handleChange('liderV', v)} />
        </Section>

        {/* FECHAS */}
        <Section title="Planificación">
          <Field label="Inicio" error={touched.fecha_inicio && errors.fecha_inicio}>
            <input type="date"
              onBlur={() => handleBlur('fecha_inicio')}
              value={form.fecha_inicio}
              onChange={e => handleChange('fecha_inicio', e.target.value)} />
          </Field>

          <Field label="Fin" error={touched.fecha_fin && errors.fecha_fin}>
            <input type="date"
              onBlur={() => handleBlur('fecha_fin')}
              value={form.fecha_fin}
              onChange={e => handleChange('fecha_fin', e.target.value)} />
          </Field>
        </Section>

        {/* OBJETIVOS */}
        <Section title="Objetivos">
          <div className="field full-width">
            <textarea
              value={form.objetivos}
              onChange={e => handleChange('objetivos', e.target.value)}
            />
          </div>
        </Section>

        <button disabled={!isValid || loading}>
          {loading ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
        </button>

      </form>

      {ToastComponent}
    </>
  );
};

// COMPONENTES AUXILIARES

const Section = ({ title, children }) => (
  <div className="section">
    <h4>{title}</h4>
    <div className="grid">{children}</div>
  </div>
);

const Field = ({ label, error, children }) => (
  <div className="field">
    <label>{label}</label>
    {children}
    {error && <span className="error">{error}</span>}
  </div>
);

const UserField = ({ label, error, ...props }) => (
  <Field label={label} error={error}>
    <UserAutocomplete {...props} />
  </Field>
);

export default ProyectoForm;