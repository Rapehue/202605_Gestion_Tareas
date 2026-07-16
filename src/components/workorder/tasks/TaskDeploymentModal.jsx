import { useEffect, useState } from 'react';

import Modal from '@/components/Modal';
import Button from '@/components/ui/Button';
import Select from '@/components/forms/Select';
import TextArea from '@/components/ui/TextArea';

import {
  getDeploymentFlow
} from '@/utils/deploymentFlow';

const TaskDeploymentModal = ({
  open,
  onClose,
  onSave,
  availableEnvironments,
  deploymentFlow = 'STANDARD'
}) => {

  const [environment, setEnvironment] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {

    if (!open) return;

    setEnvironment(
      availableEnvironments?.[0] || ''
    );

    setComments('');

  }, [open, availableEnvironments]);

  const envOptions =
    getDeploymentFlow(deploymentFlow)

      .filter(env =>
        availableEnvironments.includes(
          env.value
        )
      )

      .map(env => ({

        value: env.value,

        label: `${env.icon} ${env.label}`

      }));

  const handleSave = () => {

    if (!environment) return;

    onSave({

      environment,

      comments,

      deployment_date: new Date()

    });

  };

  return (

    <Modal
      open={open}
      onClose={onClose}
      title="Registrar despliegue"
    >

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >

        <Select
          label="Entorno"
          value={environment}
          options={envOptions}
          onChange={e =>
            setEnvironment(e.target.value)
          }
        />

        <TextArea
          label="Comentarios"
          rows={4}
          value={comments}
          onChange={e =>
            setComments(e.target.value)
          }
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem'
          }}
        >

          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancelar
          </Button>

          <Button
            onClick={handleSave}
            disabled={!environment}
          >
            Registrar
          </Button>

        </div>

      </div>

    </Modal>

  );

};

export default TaskDeploymentModal;