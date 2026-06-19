import React from 'react';
import './GrupoFormulario.css';

// Subcomponente interno para cada campo individual
const CampoFormulario = ({ Icono, titulo, obligatorio, esTextarea, placeholder, value, onChange }) => {
  return (
    <div className="form-campo-container">
      {/* Etiqueta / Label con Icono, Título y Asterisco */}
      <label className="form-campo-label">
        {Icono && <Icono className="form-campo-icono" />}
        <span className="form-campo-titulo">{titulo}</span>
        {obligatorio && <span className="form-campo-asterisco">*</span>}
      </label>

      {/* Input de texto o Textarea según se requiera */}
      <div className="form-input-wrapper">
        {esTextarea ? (
          <textarea
            className="form-input form-textarea"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={4}
          />
        ) : (
          <input
            type="text"
            className="form-input"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
};

// Componente Principal Reutilizable
const GrupoFormulario = ({ campos }) => {
  return (
    <div className="grupo-formulario-container">
      {campos.map((campo, index) => (
        <CampoFormulario 
          key={index}
          Icono={campo.Icono}
          titulo={campo.titulo}
          obligatorio={campo.obligatorio}
          esTextarea={campo.esTextarea}
          placeholder={campo.placeholder}
          value={campo.value}
          onChange={campo.onChange}
        />
      ))}
    </div>
  );
};

export default GrupoFormulario;