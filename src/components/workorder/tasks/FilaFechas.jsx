import React from 'react';
import { Calendar } from 'lucide-react';
import './FilaFechas.css';

// Subcomponente interno para cada selector de fecha individual
const CampoFecha = ({ titulo, obligatorio, comentario, value, onChange }) => {
  return (
    <div className="campo-fecha-container">
      {/* Etiqueta / Label con Icono, Título y Condicionales (Asterisco o Comentario) */}
      <label className="campo-fecha-label">
        <Calendar className="campo-fecha-icono" />
        <span className="campo-fecha-titulo">{titulo}</span>
        {obligatorio ? (
          <span className="campo-fecha-asterisco">*</span>
        ) : (
          comentario && <span className="campo-fecha-comentario">({comentario})</span>
        )}
      </label>

      {/* Contenedor del Input de Fecha con el icono decorativo a la derecha */}
      <div className="campo-fecha-input-wrapper">
        <input
          type="date"
          className="campo-fecha-input"
          value={value}
          onChange={onChange}
        />
        <Calendar className="campo-fecha-input-icono-derecha" />
      </div>
    </div>
  );
};

// Componente Principal Reutilizable (Fila de 2 columnas)
const FilaFechas = ({ fechaIzquierda, fechaDerecha }) => {
  return (
    <div className="fila-fechas-grid">
      {/* Columna Izquierda */}
      <CampoFecha
        titulo={fechaIzquierda.titulo}
        obligatorio={fechaIzquierda.obligatorio}
        comentario={fechaIzquierda.comentario}
        value={fechaIzquierda.value}
        onChange={fechaIzquierda.onChange}
      />
      
      {/* Columna Derecha */}
      <CampoFecha
        titulo={fechaDerecha.titulo}
        obligatorio={fechaDerecha.obligatorio}
        comentario={fechaDerecha.comentario}
        value={fechaDerecha.value}
        onChange={fechaDerecha.onChange}
      />
    </div>
  );
};

export default FilaFechas;