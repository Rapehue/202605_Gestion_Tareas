import { useLocation, Link } from 'react-router-dom';
import './breadcrumbs.css';

// Un diccionario sencillo para traducir las rutas técnicas a nombres limpios
const ROUTE_LABELS = {
  proyectos: 'Proyectos',
  dashboard: 'Dashboard',
  // Si el fragmento es un número de ID, lo interceptaremos dinámicamente
};

const Breadcrumbs = () => {
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);

  // Si estamos en la raíz "/", mostramos directamente el Dashboard fijo
  if (parts.length === 0) {
    return <div className="breadcrumbs">Dashboard</div>;
  }

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {/* Siempre empezamos ofreciendo el enlace de vuelta a la Raíz / Dashboard */}
      <Link to="/" className="breadcrumb-link">Dashboard</Link>

      {parts.map((part, index) => {
        // Vamos reconstruyendo la ruta paso a paso acumulando los fragmentos previos
        // Ejemplo: paso 1 = "/proyectos", paso 2 = "/proyectos/314"
        const routeTo = `/${parts.slice(0, index + 1).join('/')}`;
        
        // Evaluamos si el fragmento actual es un ID numérico (o alfanumérico largo)
        const isId = !isNaN(part) || part.length > 10;
        
        // Si es un ID ponemos "Detalle", si no, buscamos en el diccionario o capitalizamos
        const label = isId 
          ? 'Detalle' 
          : (ROUTE_LABELS[part] || part.charAt(0).toUpperCase() + part.slice(1));

        // El último elemento de la miga es la página actual, no necesita ser un enlace
        const isLast = index === parts.length - 1;

        return (
          <span key={routeTo} className="breadcrumb-item">
            <span className="breadcrumb-separator"> / </span>
            {isLast ? (
              <span className="breadcrumb-current">{label}</span>
            ) : (
              <Link to={routeTo} className="breadcrumb-link">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;