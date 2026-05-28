import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Layout Primitives
import Grid from '@/layout/primitives/Grid';
import Stack from '@/layout/primitives/Stack';

// Form Ecosystem
// import { FormSection, FormField } from '@/components/forms';
// Cambia esto temporalmente en ProyectoForm.jsx:
import FormSection from '@/components/forms/FormSection';
import FormField from '@/components/forms/FormField'; // 👈 Apunta directo al archivo físico
// UI Components
import { Button, Card } from '@/components/ui';
import './ProyectoForm.css';

const INITIAL_STATE = {
  codigo: '',
  nombre: '',
  id_usuario_gestor: '',
  id_usuario_peticionario: '',
  id_usuario_product_Owner: '',
  id_usuario_proxy: '',
  id_usuario_LiderD: '',
  id_usuario_LiderV: '',
  plan: '',
  eje: '',
  iniciativa: '',
  subiniciativa: '',
  objetivos: '',
  fecha_inicio: '',
  fecha_fin: ''
};

const validateProjectForm = (data) => {
  const errors = {};
  if (!data.codigo?.trim()) errors.codigo = 'El código es obligatorio';
  if (data.codigo?.length > 9) errors.codigo = 'Máximo 9 caracteres';
  if (!data.nombre?.trim()) errors.nombre = 'El nombre es obligatorio';
  if (data.nombre?.length > 100) errors.nombre = 'Máximo 100 caracteres';

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// 1. Modifica la cabecera del componente para recibir las nuevas props desde el Modal:
const ProyectoForm = ({ initialData, userOptions = {}, onSearchUser, onSubmit, loading = false }) => {
  // const ProyectoForm = ({ initialData, usersMock = [], onSubmit, loading = false }) => {
  const [form, setForm] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});

  // Estado para controlar el texto que escribe el usuario en el buscador de cada rol
  const [searchTerms, setSearchTerms] = useState({
    gestor: '',
    peticionario: '',
    product_Owner: '',
    proxy: '',
    LiderD: '',
    LiderV: ''
  });

  useEffect(() => {
    if (initialData) {
      setForm({ ...INITIAL_STATE, ...initialData });

      // 💡 Eliminamos la dependencia de 'usersMock' que ya no existe
      // Si viene información inicial de edición, puedes dejar los nombres vacíos o mapearlos si tu objeto ya trae el nombre del interviniente
      setSearchTerms({
        gestor: initialData.nombre_gestor || '',
        peticionario: initialData.nombre_peticionario || '',
        product_Owner: initialData.nombre_product_Owner || '',
        proxy: initialData.nombre_proxy || '',
        LiderD: initialData.nombre_LiderD || '',
        LiderV: initialData.nombre_LiderV || '',
      });
    } else {
      setForm(INITIAL_STATE);
    }
  }, [initialData]); // 👈 Deja solo 'initialData' aquí

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  // =====================================================
  // MANEJADOR PARA EL BUSCADOR DINÁMICO
  // =====================================================
  const handleSearchChange = (roleKey, value) => {
    setSearchTerms(prev => ({ ...prev, [roleKey]: value }));
  };

  // Función auxiliar para filtrar la lista global de usuarios según lo que se escribe por rol
  const getFilteredOptions = (searchTerm) => {
    return usersMock
      .filter(user => {
        const fullName = (user.nombre_completo || user.nombre || '').toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
      })
      .map(user => ({
        value: user.id,
        label: user.nombre_completo || user.nombre
      }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  // console.log('SUBMIT FORM', form);
  // console.log('ONSUBMIT', onSubmit);

  const { isValid, errors: validationErrors } =
    validateProjectForm(form);

  if (!isValid) {
    setErrors(validationErrors);
    return;
  }

  onSubmit?.(form);
};

  return (
    <form className="project-form" onSubmit={handleSubmit} noValidate>
      {/* Contenedor dividido en 2 columnas principales */}
      <div className="form-split-container">

        {/* ==========================================
          COLUMNA IZQUIERDA: DATOS DEL PROYECTO
          ========================================== */}
        <div className="form-left-panel">

          {/* BLOQUE 1: IDENTIFICACIÓN */}
          <div className="form-card-section">
            <h3 className="section-title-premium">Identificación</h3>
            <div className="grid-inner-12">
              <div className="col-3">
                <FormField
                  label="Código"
                  name="codigo"
                  required
                  maxLength={9}
                  value={form.codigo}
                  error={errors.codigo}
                  onChange={handleInputChange}
                  placeholder="PRY-001"
                />
              </div>
              <div className="col-9">
                <FormField
                  label="Nombre del Proyecto"
                  name="nombre"
                  required
                  maxLength={100}
                  value={form.nombre}
                  error={errors.nombre}
                  onChange={handleInputChange}
                  placeholder="Nombre descriptivo del proyecto"
                />
              </div>
            </div>
          </div>

          {/* BLOQUE 2: CLASIFICACIÓN ESTRATÉGICA */}
          <div className="form-card-section">
            <h3 className="section-title-premium">Clasificación Estratégica</h3>
            <div className="grid-inner-12">
              <div className="col-6">
                <FormField label="Plan" name="plan" maxLength={50} value={form.plan} onChange={handleInputChange} placeholder="Plan asociado" />
              </div>
              <div className="col-6">
                <FormField label="Eje" name="eje" maxLength={50} value={form.eje} onChange={handleInputChange} placeholder="Eje estratégico" />
              </div>
              <div className="col-6">
                <FormField label="Iniciativa" name="iniciativa" maxLength={75} value={form.iniciativa} onChange={handleInputChange} placeholder="Iniciativa" />
              </div>
              <div className="col-6">
                <FormField label="Subiniciativa" name="subiniciativa" maxLength={75} value={form.subiniciativa} onChange={handleInputChange} placeholder="Subiniciativa" />
              </div>
            </div>
          </div>

          {/* BLOQUE 3: PLANIFICACIÓN Y METAS */}
          <div className="form-card-section">
            <h3 className="section-title-premium">Planificación y Metas</h3>
            <div className="grid-inner-12">
              <div className="col-12">
                <FormField
                  label="Objetivos"
                  name="objetivos"
                  type="textarea"
                  rows={3}
                  value={form.objetivos}
                  onChange={handleInputChange}
                  placeholder="Describe los objetivos clave..."
                />
              </div>
              <div className="col-6">
                <FormField label="Fecha de Inicio" name="fecha_inicio" type="date" value={form.fecha_inicio} onChange={handleInputChange} />
              </div>
              <div className="col-6">
                <FormField label="Fecha de Fin" name="fecha_fin" type="date" value={form.fecha_fin} onChange={handleInputChange} />
              </div>
            </div>
          </div>

        </div>

        {/* ==========================================
          COLUMNA DERECHA: GOBIERNO / INTERVINIENTES
          ========================================== */}
        <div className="form-right-panel">
          <div className="form-card-section governance-height">
            <h3 className="section-title-premium">Gobierno y Responsables</h3>
            <p className="section-subtitle">Asigna los líderes e intervinientes de la tabla de usuarios.</p>

            {/* Distribución vertical limpia en una sola fila compacta */}
            <div className="governance-vertical-stack">
              <FormField
                label="Usuario Gestor"
                name="id_usuario_gestor"
                type="autocomplete"
                value={form.id_usuario_gestor}
                searchValue={searchTerms.gestor}
                onSearchChange={(val) => { handleSearchChange('gestor', val); onSearchUser('gestor', val); }}
                onChange={handleInputChange}
                options={userOptions.gestor || []}
              />

              <FormField
                label="Usuario Peticionario"
                name="id_usuario_peticionario"
                type="autocomplete"
                value={form.id_usuario_peticionario}
                searchValue={searchTerms.peticionario}
                onSearchChange={(val) => { handleSearchChange('peticionario', val); onSearchUser('peticionario', val); }}
                onChange={handleInputChange}
                options={userOptions.peticionario || []}
              />

              <FormField
                label="Product Owner"
                name="id_usuario_product_Owner"
                type="autocomplete"
                value={form.id_usuario_product_Owner}
                searchValue={searchTerms.product_Owner}
                onSearchChange={(val) => { handleSearchChange('product_Owner', val); onSearchUser('product_Owner', val); }}
                onChange={handleInputChange}
                options={userOptions.product_Owner || []}
              />

              <FormField
                label="Proxy"
                name="id_usuario_proxy"
                type="autocomplete"
                value={form.id_usuario_proxy}
                searchValue={searchTerms.proxy}
                onSearchChange={(val) => { handleSearchChange('proxy', val); onSearchUser('proxy', val); }}
                onChange={handleInputChange}
                options={userOptions.proxy || []}
              />

              <FormField
                label="Líder D"
                name="id_usuario_LiderD"
                type="autocomplete"
                value={form.id_usuario_LiderD}
                searchValue={searchTerms.LiderD}
                onSearchChange={(val) => { handleSearchChange('LiderD', val); onSearchUser('LiderD', val); }}
                onChange={handleInputChange}
                options={userOptions.LiderD || []}
              />

              <FormField
                label="Líder V"
                name="id_usuario_LiderV"
                type="autocomplete"
                value={form.id_usuario_LiderV}
                searchValue={searchTerms.LiderV}
                onSearchChange={(val) => { handleSearchChange('LiderV', val); onSearchUser('LiderV', val); }}
                onChange={handleInputChange}
                options={userOptions.LiderV || []}
              />
            </div>
          </div>
        </div>

      </div>

      {/* ACCIONES DEL FORMULARIO PIE */}
      <div className="project-form-actions">
        <button type="submit" className="btn-save-project" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Proyecto'}
        </button>
      </div>
    </form>
  );
};

// Cambia el bloque final de tu ProyectoForm.jsx por este:
ProyectoForm.propTypes = {
  initialData: PropTypes.object,
  userOptions: PropTypes.object,     // 👈 Añadido
  onSearchUser: PropTypes.func,      // 👈 Añadido
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default ProyectoForm;