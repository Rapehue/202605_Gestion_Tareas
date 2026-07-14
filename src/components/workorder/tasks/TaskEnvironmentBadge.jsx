import { TASK_ENVIRONMENTS } from '@/constants/taskEnvironments';

import './TaskBadges.css';

const TaskEnvironmentBadge = ({ environment }) => {

  if (!environment) return null;

  const config = TASK_ENVIRONMENTS.find(
    env => env.value === environment
  );

  if (!config) return null;

  const className = {
    DESARROLLO: 'env-des',
    TESTING: 'env-test',
    PREPRODUCCION: 'env-pre',
    PRODUCCION: 'env-pro'
  }[config.value];

  return (

    <span
      className={`environment-badge ${className}`}
      title={config.description}
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

export default TaskEnvironmentBadge;