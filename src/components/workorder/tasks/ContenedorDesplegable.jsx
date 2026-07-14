import { ChevronDown, Copy } from 'lucide-react';
import './ContenedorDesplegable.css';

const ContenedorDesplegable = ({
  children,
  Icono,
  titulo,
  subtitulo,
  badges,
  isOpenExternal,
  onDuplicate,
  initiallyOpen = false, // 👈 ¡Añádela aquí con un valor por defecto!
  onToggle
}) => {
  const isOpen = isOpenExternal ?? initiallyOpen;

  const handleToggle = () => {
    onToggle?.();
  };

  return (
    <div className="desplegable-card">
      {/* CABECERA */}
      <button type="button" onClick={handleToggle} className="desplegable-header">
        {/* ICONO */}
        <div className="desplegable-icono-wrapper">
          {Icono && <Icono className="desplegable-icono" />}
        </div>

        {/* TEXTO */}
        <div className="desplegable-textos">
          <h2 className="desplegable-titulo">{titulo}</h2>
          {subtitulo && <p className="desplegable-subtitulo">{subtitulo}</p>}
        </div>

        {/* COLUMNA 3 NUEVA: BADGES (Ubicado entre texto y acciones) */}
        {badges && (
          <div className="desplegable-badges-columna">
            {badges}
          </div>
        )}

        {/* FLECHA */}
        <div className="desplegable-actions">

          <button
            type="button"
            className="duplicate-button"
            onClick={(e) => {

              e.stopPropagation();
              console.log('DUPLICAR');
              onDuplicate?.();

            }}
          >

            <Copy size={16} />

          </button>

          <div
            className={`desplegable-flecha ${isOpen ? 'is-open' : ''
              }`}
          >

            <ChevronDown />

          </div>

        </div>
      </button>

      {/* CONTENIDO */}
      <div className={`desplegable-contenido ${isOpen ? 'is-open' : ''}`}>
        <div className="desplegable-interior">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ContenedorDesplegable;