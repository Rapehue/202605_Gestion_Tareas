import React from 'react';
import './form.css';

/**
 * CurrencyInput - Input especializado para importes económicos en el ERP
 * @param {string} name - Nombre del atributo en el estado del formulario
 * @param {number|string} value - El importe numérico actual
 * @param {function} onChange - Manejador para actualizar el formulario
 * @param {boolean} error - Aplica estilos visuales de error si es true
 * @param {string} placeholder - Texto de ayuda gris
 * @param {string} symbol - Símbolo de la divisa (por defecto '€')
 */
const CurrencyInput = ({
  name,
  value,
  onChange,
  error = false,
  placeholder = '0.00',
  symbol = '€',
  ...rest // Absorbe min, max, required, disabled, etc.
}) => {
  
  // Forzamos a que si viene un valor nulo o undefined, se pinte vacío en vez de un NaN o 0 molesto
  const inputValue = value ?? '';

  const handleInputChange = (e) => {
    const { name, value: rawValue } = e.target;

    // Si el usuario borra el campo, pasamos null o hilo vacío para limpiar el estado limpiamente
    if (rawValue === '') {
      onChange({ target: { name, value: '' } });
      return;
    }

    // Convertimos a número flotante para que el estado de React siempre guarde un tipo numérico puro
    const numericValue = parseFloat(rawValue);
    
    onChange({ target: { name, value: numericValue } });
  };

  return (
    <div className={`currency-input-wrapper ${error ? 'has-error' : ''} ${rest.disabled ? 'is-disabled' : ''}`}>
      {/* Input nativo de tipo número, restringiendo decimales a 2 pasos (step) */}
      <input
        id={name}
        name={name}
        type="number"
        step="0.01"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="currency-input-field"
        {...rest}
      />
      {/* Contenedor del símbolo de moneda fijado a la derecha */}
      <span className="currency-input-symbol">{symbol}</span>
    </div>
  );
};

export default CurrencyInput;