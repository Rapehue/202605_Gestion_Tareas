import React from 'react';
import './form.css';

/**
 * DateInput - Componente reutilizable para selección de fechas
 * @param {string} name - Nombre del atributo en el estado del formulario
 * @param {string} value - Fecha actual en formato 'YYYY-MM-DD' o null/vacío
 * @param {function} onChange - Manejador para actualizar el formulario
 * @param {boolean} error - Aplica estilos visuales de error si es true
 * @param {string} min - Fecha mínima seleccionable (ej: '2026-01-01')
 * @param {string} max - Fecha máxima seleccionable
 * @param {boolean} disabled - Deshabilita el campo
 */
const DateInput = ({
  name,
  value,
  onChange,
  error = false,
  min,
  max,
  disabled = false,
  ...rest // Absorbe propiedades como required, autoFocus, etc.
}) => {
  
  // Si el valor viene como un objeto Date de JS, lo convertimos a string 'YYYY-MM-DD'
  // Si viene nulo o undefined, nos aseguramos de pasar un string vacío para mantener el input controlado
  const formattedValue = value instanceof Date 
    ? value.toISOString().split('T')[0] 
    : (value ?? '');

  const inputClassName = `custom-date-input ${error ? 'has-error' : ''}`;

  return (
    <input
      id={name}
      name={name}
      type="date"
      value={formattedValue}
      onChange={onChange}
      min={min}
      max={max}
      disabled={disabled}
      className={inputClassName}
      {...rest}
    />
  );
};

export default DateInput;