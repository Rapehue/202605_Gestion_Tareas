import './TaskBadges.css';

const CONFIG = {

  DESARROLLO: {
    icon: '🖥',
    label: 'Desarrollo',
    className: 'env-des'
  },

  PREPRODUCCION: {
    icon: '🧪',
    label: 'Preproducción',
    className: 'env-pre'
  },

  PRODUCCION: {
    icon: '🚀',
    label: 'Producción',
    className: 'env-pro'
  }

};

const EnvironmentBadge = ({
  environment
}) => {

  if (!environment) return null;

  const config =
    CONFIG[environment];

  if (!config) return null;

  return (

    <span
      className={`environment-badge ${config.className}`}
    >

      <span className="environment-icon">
        {config.icon}
      </span>

      <span>
        {config.label}
      </span>

    </span>

  );

};

export default EnvironmentBadge;