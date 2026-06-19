import './TaskBadges.css';

const PRIORITY_CONFIG = {

  BAJA: {
    label: 'Baja',
    className: 'priority-baja'
  },

  MEDIA: {
    label: 'Media',
    className: 'priority-media'
  },

  ALTA: {
    label: 'Alta',
    className: 'priority-alta'
  },

  CRITICA: {
    label: 'Crítica',
    className: 'priority-critica'
  }

};

const TaskPriorityBadge = ({ priority }) => {

  const config =
    PRIORITY_CONFIG[priority] ||
    PRIORITY_CONFIG.MEDIA;

  return (

    <span
      className={`task-badge ${config.className}`}
    >
      {config.label}
    </span>

  );

};

export default TaskPriorityBadge;