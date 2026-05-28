import React, { useState, useRef, useEffect } from 'react';
import Select from './Select';
import DateInput from './DateInput';
import CurrencyInput from './CurrencyInput';
import './form.css';

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  options = [],
  rows = 3,
  searchValue = '',       // 👈 Nuevo: Texto que escribe el usuario para buscar
  onSearchChange,        // 👈 Nuevo: Callback cuando el usuario escribe en el buscador
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const inputClassName = `form-control ${error ? 'is-invalid' : ''}`;

  // Cerrar la lista de resultados si el usuario hace clic fuera del buscador
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Buscar el label correspondiente al ID seleccionado para mostrarlo cuando el menú esté cerrado
  const selectedOption = options.find(opt => opt.value === value);
  const displayInputValue = isOpen ? searchValue : (selectedOption?.label || searchValue || '');

  return (
    <div className="form-field-container" ref={containerRef}>
      {label && (
        <label htmlFor={name} className="form-field-label">
          {label} {required && <span className="required-asterisk">*</span>}
        </label>
      )}

      {/* ===================================================== */}
      {/* CASO 1: AUTOCOMPLETE / BUSCADOR DINÁMICO */}
      {/* ===================================================== */}
      {type === 'autocomplete' ? (
        <div className="autocomplete-wrapper">
          <input
            id={name}
            name={name}
            type="text"
            className={inputClassName}
            placeholder={placeholder || "Escribe para buscar..."}
            value={displayInputValue}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setIsOpen(true);
              onSearchChange?.(e.target.value);
            }}
            {...rest}
          />
          
          {/* Desplegable flotante con los usuarios filtrados */}
          {isOpen && options.length > 0 && (
            <ul className="autocomplete-results-list">
              {options.map((opt) => (
                <li
                  key={opt.value}
                  className={`autocomplete-item ${opt.value === value ? 'selected' : ''}`}
                  onClick={() => {
                    // Simulamos el evento nativo de React para que impacte en tu handleInputChange
                    onChange({
                      target: { name, value: opt.value }
                    });
                    // Seteamos el texto del buscador con el nombre elegido y cerramos
                    onSearchChange?.(opt.label);
                    setIsOpen(false);
                  }}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          )}
          
          {/* Aviso visual si escribe algo y no hay coincidencias */}
          {isOpen && searchValue && options.length === 0 && (
            <div className="autocomplete-no-results">
              No se encontraron usuarios
            </div>
          )}
        </div>
      ) : type === 'select' ? (
        <Select name={name} value={value} onChange={onChange} options={options} placeholder={placeholder} error={!!error} required={required} {...rest} />
      ) : type === 'date' ? (
        <DateInput name={name} value={value} onChange={onChange} error={!!error} required={required} {...rest} />
      ) : type === 'currency' ? (
        <CurrencyInput name={name} value={value} onChange={onChange} error={!!error} placeholder={placeholder} required={required} {...rest} />
      ) : type === 'textarea' ? (
        <textarea id={name} name={name} value={value ?? ''} onChange={onChange} placeholder={placeholder} className={inputClassName} rows={rows} required={required} {...rest} />
      ) : (
        <input id={name} name={name} type={type} value={value ?? ''} onChange={onChange} placeholder={placeholder} className={inputClassName} required={required} {...rest} />
      )}

      {error && <span className="form-field-error-message">{error}</span>}
    </div>
  );
};

export default FormField;