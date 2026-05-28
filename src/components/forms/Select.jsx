import React from 'react';
import './form.css';

/**
 * Select - Componente base reutilizable para menús desplegables
 * @param {string} name - Nombre del atributo para el input
 * @param {any} value - Valor actualmente seleccionado
 * @param {function} onChange - Función que se ejecuta al cambiar la opción
 * @param {Array} options - Listado de opciones: [{ value: 'EN_CURSO', label: 'En Curso' }]
 * @param {string} placeholder - Texto inicial neutro (opcional)
 * @param {boolean} error - Aplica estilos de error si es true
 * @param {boolean} disabled - Deshabilita el control
 */
const Select = ({
  name,
  value,
  onChange,
  options = [],
  placeholder,
  error = false,
  disabled = false,
  ...rest // Absorbe cualquier propiedad nativa extra (className, autoFocus, etc.)
}) => {
  
  // Construimos las clases dinámicas para el diseño del select
  const selectClassName = `custom-select-input ${error ? 'has-error' : ''}`;

  return (
    <select
      name={name}
      value={value ?? ''} // Controla el estado para evitar advertencias de React
      onChange={onChange}
      disabled={disabled}
      className={selectClassName}
      {...rest}
    >
      {/* Si hay un placeholder, lo añadimos como la primera opción deshabilitada */}
      {placeholder && (
        <option value="" disabled hidden={rest.required}>
          {placeholder}
        </option>
      )}

      {/* Renderizado dinámico de las opciones de la API o estáticas */}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;