import React from 'react';
import './form.css';

/**
 * FormSection - Agrupador estructural para organizar campos dentro de un formulario
 * @param {string} title - El título de la sección (ej: "Presupuesto y Jornadas")
 * @param {string} description - Texto de ayuda o contexto para el usuario (opcional)
 * @param {React.ReactNode} children - Los campos del formulario (FormFields) que irán dentro
 */
const FormSection = ({ title, description, children }) => {
  return (
    <section className="form-section-container">
      {/* CABECERA DE LA SECCIÓN */}
      {(title || description) && (
        <div className="form-section-header">
          {title && <h3 className="form-section-title">{title}</h3>}
          {description && <p className="form-section-description">{description}</p>}
        </div>
      )}

      {/* CONTENEDOR DE LOS INPUTS */}
      <div className="form-section-content">
        {children}
      </div>
    </section>
  );
};

export default FormSection;