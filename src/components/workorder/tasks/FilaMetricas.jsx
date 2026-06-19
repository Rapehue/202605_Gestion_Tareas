import React from 'react';
import { User, Clock, Percent } from 'lucide-react';
import './FilaMetricas.css';

// Subcomponente interno para cada métrica individual
const CeldaMetrica = ({ Icono, titulo, obligatorio, esSelect, opciones, tipoNumero, sufijo, value, onChange }) => {
  return (
    <div className="metrica-celda-container">
      {/* Etiqueta / Label con Icono, Título y Asterisco */}
      <label className="metrica-celda-label">
        {Icono && <Icono className="metrica-celda-icono" />}
        <span className="metrica-celda-titulo">{titulo}</span>
        {obligatorio && <span className="metrica-celda-asterisco">*</span>}
      </label>

      {/* Control: Select o Input Numérico */}
      <div className="metrica-control-wrapper">
        {esSelect ? (
          <select 
            className="metrica-control metrica-select" 
            value={value} 
            onChange={onChange}
          >
            {opciones && opciones.map((opt, i) => (
              <option key={i} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ) : (
          <div className="metrica-input-container">
            {Icono && <Icono className="metrica-input-icono-interior" />}
            <input
              type="number"
              className="metrica-control metrica-input"
              value={value}
              onChange={onChange}
              min="0"
              max={tipoNumero === 'porcentaje' ? '100' : undefined}
            />
            {sufijo && <span className="metrica-input-sufijo">{sufijo}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

// Componente Principal Reutilizable
const FilaMetricas = ({ configResponsable, configJornadas, configAvance }) => {
  return (
    <div className="metrica-formulario-grid">
      {/* Columna 1: Responsable (Selector) */}
      <CeldaMetrica
        Icono={User}
        titulo={configResponsable.titulo}
        obligatorio={configResponsable.obligatorio}
        esSelect={true}
        opciones={configResponsable.opciones}
        value={configResponsable.value}
        onChange={configResponsable.onChange}
      />

      {/* Columna 2: Jornadas / Horas (Numérico) */}
      <CeldaMetrica
        Icono={Clock}
        titulo={configJornadas.titulo}
        obligatorio={configJornadas.obligatorio}
        esSelect={false}
        sufijo="h"
        value={configJornadas.value}
        onChange={configJornadas.onChange}
      />

      {/* Columna 3: Avance (Numérico) */}
      <CeldaMetrica
        Icono={Percent}
        titulo={configAvance.titulo}
        obligatorio={configAvance.obligatorio}
        esSelect={false}
        tipoNumero="porcentaje"
        sufijo="%"
        value={configAvance.value}
        onChange={configAvance.onChange}
      />
    </div>
  );
};

export default FilaMetricas;