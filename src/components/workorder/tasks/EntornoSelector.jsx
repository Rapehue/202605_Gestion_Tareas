import Select from '@/components/forms/Select';

import { TASK_ENVIRONMENTS } from '@/constants/taskEnvironments';

const EntornoSelector = ({
  value,
  onChange,
  disabled = false
}) => {

  const options = TASK_ENVIRONMENTS.map(env => ({
    value: env.value,
    label: `${env.icon} ${env.label}`
  }));

  return (

    <Select
      value={value || ''}
      options={options}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    />

  );

};

export default EntornoSelector;