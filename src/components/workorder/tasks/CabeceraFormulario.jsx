import React, { useState, useRef, useEffect } from 'react';
import { 
  Hash, Layers, PlayCircle, AlertCircle, ChevronDown,
  Hourglass, Play, Ban, CheckCircle2,
  Palette, Database, Cpu, Clock, FileText, Terminal, HelpCircle
} from 'lucide-react';
import './CabeceraFormulario.css';

// 🟢 Opciones de Prioridad
const OPCIONES_PRIORIDAD = [
  { value: 'BAJA', label: 'Baja', color: '#10b981' },
  { value: 'MEDIA', label: 'Media', color: '#f59e0b' },
  { value: 'ALTA', label: 'Alta', color: '#f97316' },
  { value: 'MUY_ALTA', label: 'Muy Alta', color: '#ef4444' },
  { value: 'CRITICA', label: 'Crítica', color: '#111827' }
];

// 🔵 Opciones de Estado
const OPCIONES_ESTADO = [
  { value: 'PENDIENTE', label: 'Pendiente', IconoOpt: Hourglass, color: '#6b7280' },
  { value: 'EN_CURSO', label: 'En Curso', IconoOpt: Play, color: '#0284c7' },
  { value: 'BLOQUEADA', label: 'Bloqueada', IconoOpt: Ban, color: '#ef4444' },
  { value: 'FINALIZADA', label: 'Finalizada', IconoOpt: CheckCircle2, color: '#10b981' }
];

// 🟣 Opciones de Tipo de Tareas (NUEVO)
const OPCIONES_TIPO = [
  { value: 'DISENO', label: 'Diseño', desc: 'Análisis y diseño de las modificaciones a realizar', IconoOpt: Palette, color: '#ec4899' }, // Rosa
  { value: 'MODELADO', label: 'Modelado', desc: 'Cambios en el modelo de datos físico (tablas Teradata)', IconoOpt: Database, color: '#3b82f6' }, // Azul
  { value: 'POWERCENTER', label: 'PowerCenter', desc: 'Desarrollos de ETL con la herramienta Informatica PowerCenter', IconoOpt: Cpu, color: '#8b5cf6' }, // Morado
  { value: 'CONTROLM', label: 'Control-M', desc: 'Planificación de ejecución automática con CONTROL-M', IconoOpt: Clock, color: '#f59e0b' }, // Ámbar
  { value: 'DOCUMENTACION', label: 'Documentación', desc: 'Generación de la documentación necesaria para el proyecto', IconoOpt: FileText, color: '#10b981' }, // Verde
  { value: 'SIMULACION', label: 'Simulación', desc: 'Tareas de Simulación de cargas de datos en Producción', IconoOpt: Terminal, color: '#06b6d4' }, // Cian
  { value: 'OTROS', label: 'Otros', desc: 'Cualquier otro tipo de tarea que no encaje con las anteriores', IconoOpt: HelpCircle, color: '#6b7280' } // Gris
];

const CeldaCabecera = ({ Icono, titulo, obligatorio, esSelect, opciones, value, onChange, esPrioridad, esEstado, esTipo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // selectores activos
  const prioridadSeleccionada = OPCIONES_PRIORIDAD.find(opt => opt.value === value) || OPCIONES_PRIORIDAD[0];
  const estadoSeleccionado = OPCIONES_ESTADO.find(opt => opt.value === value) || OPCIONES_ESTADO[0];
  const tipoSeleccionado = OPCIONES_TIPO.find(opt => opt.value === value) || OPCIONES_TIPO[OPCIONES_TIPO.length - 1];

  return (
    <div className="cabecera-celda-container">
      <label className="cabecera-celda-label">
        {Icono && <Icono className="cabecera-celda-icono" />}
        <span className="cabecera-celda-titulo">{titulo}</span>
        {obligatorio && <span className="cabecera-celda-asterisco">*</span>}
      </label>

      <div className="cabecera-control-wrapper">
        
        {/* CASO 1: DROPDOWN DE PRIORIDAD */}
        {esPrioridad ? (
          <div className="custom-dropdown-container" ref={dropdownRef}>
            <button type="button" className={`cabecera-control custom-dropdown-trigger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
              <div className="dropdown-opcion-contenido">
                <span className="prioridad-circulo" style={{ backgroundColor: prioridadSeleccionada.color }} />
                {prioridadSeleccionada.label}
              </div>
              <ChevronDown className="dropdown-flecha" />
            </button>
            {isOpen && (
              <ul className="dropdown-menu-lista">
                {OPCIONES_PRIORIDAD.map((opt) => (
                  <li key={opt.value}>
                    <button type="button" className={`dropdown-menu-item ${value === opt.value ? 'selected' : ''}`} onClick={() => { onChange({ target: { value: opt.value } }); setIsOpen(false); }}>
                      <span className="prioridad-circulo" style={{ backgroundColor: opt.color }} />
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : 
        
        /* CASO 2: DROPDOWN DE ESTADO */
        esEstado ? (
          <div className="custom-dropdown-container" ref={dropdownRef}>
            <button type="button" className={`cabecera-control custom-dropdown-trigger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
              <div className="dropdown-opcion-contenido">
                {React.createElement(estadoSeleccionado.IconoOpt, { className: "estado-icono-interior", style: { color: estadoSeleccionado.color } })}
                {estadoSeleccionado.label}
              </div>
              <ChevronDown className="dropdown-flecha" />
            </button>
            {isOpen && (
              <ul className="dropdown-menu-lista">
                {OPCIONES_ESTADO.map((opt) => (
                  <li key={opt.value}>
                    <button type="button" className={`dropdown-menu-item ${value === opt.value ? 'selected' : ''}`} onClick={() => { onChange({ target: { value: opt.value } }); setIsOpen(false); }}>
                      {React.createElement(opt.IconoOpt, { className: "estado-icono-interior", style: { color: opt.color } })}
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : 

        /* CASO 3: DROPDOWN DE TIPO DE TAREA (CON EXPLICACIONES DOBLE FILA) */
        esTipo ? (
          <div className="custom-dropdown-container" ref={dropdownRef}>
            <button type="button" className={`cabecera-control custom-dropdown-trigger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
              <div className="dropdown-opcion-contenido">
                {React.createElement(tipoSeleccionado.IconoOpt, { className: "estado-icono-interior", style: { color: tipoSeleccionado.color } })}
                {tipoSeleccionado.label}
              </div>
              <ChevronDown className="dropdown-flecha" />
            </button>
            {isOpen && (
              <ul className="dropdown-menu-lista tipo-menu-ajuste">
                {OPCIONES_TIPO.map((opt) => (
                  <li key={opt.value}>
                    <button type="button" className={`dropdown-menu-item item-doble-fila ${value === opt.value ? 'selected' : ''}`} onClick={() => { onChange({ target: { value: opt.value } }); setIsOpen(false); }}>
                      {React.createElement(opt.IconoOpt, { className: "estado-icono-interior", style: { color: opt.color } })}
                      <div className="tipo-textos-bloque">
                        <span className="tipo-label-principal">{opt.label}</span>
                        <span className="tipo-descripcion-secundaria">{opt.desc}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) :
        
        /* CASO 4: SELECT NORMAL */
        esSelect ? (
          <select className="cabecera-control cabecera-select" value={value} onChange={onChange}>
            {opciones && opciones.map((opt, i) => (
              <option key={i} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ) : (
          /* CASO 5: INPUT NORMAL */
          <div className="cabecera-input-icon-container">
            {Icono && <Icono className="cabecera-input-icono-interior" />}
            <input type="text" className="cabecera-control cabecera-input" value={value} onChange={onChange} />
          </div>
        )}
      </div>
    </div>
  );
};

const CabeceraFormulario = ({ configCampos }) => {
  const iconosPredefinidos = [Hash, Layers, PlayCircle, AlertCircle];
  return (
    <div className="cabecera-formulario-grid">
      {configCampos.map((campo, index) => (
        <CeldaCabecera
          key={index}
          Icono={campo.Icono || iconosPredefinidos[index]}
          titulo={campo.titulo}
          obligatorio={campo.obligatorio}
          esSelect={campo.esSelect}
          esPrioridad={campo.esPrioridad}
          esEstado={campo.esEstado}
          esTipo={campo.esTipo} /* 👈 Propiedad añadida */
          opciones={campo.opciones}
          value={campo.value}
          onChange={campo.onChange}
        />
      ))}
    </div>
  );
};

export default CabeceraFormulario;