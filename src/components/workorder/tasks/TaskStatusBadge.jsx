import './TaskBadges.css';

const STATUS_CONFIG = {

  PENDIENTE: {
    label: 'Pendiente',
    className: 'status-pendiente'
  },

  EN_CURSO: {
    label: 'En Curso',
    className: 'status-en-curso'
  },

  BLOQUEADA: {
    label: 'Bloqueada',
    className: 'status-bloqueada'
  },

  FINALIZADA: {
    label: 'Finalizada',
    className: 'status-finalizada'
  }

};

const TaskStatusBadge = ({ status }) => {

  const config =
    STATUS_CONFIG[status] ||
    STATUS_CONFIG.PENDIENTE;

  return (

    <span
      className={`task-badge ${config.className}`}
    >
      {config.label}
    </span>

  );

};

export default TaskStatusBadge;