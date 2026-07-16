import Select from '@/components/forms/Select';

import {
  getDeploymentFlow
} from '@/utils/deploymentFlow';

const EntornoSelector = ({
  value,
  deploymentFlow = 'STANDARD',
  onChange,
  disabled = false
}) => {

  const options =
    getDeploymentFlow(deploymentFlow)

      .map(env => ({

        value: env.value,

        label: `${env.icon} ${env.label}`

      }));

  return (

    <Select

      value={value || ''}

      options={options}

      disabled={disabled}

      onChange={(e) =>
        onChange(e.target.value)
      }

    />

  );

};

export default EntornoSelector;