import { Modal } from '@/components/';

import Stack from '@/layout/primitives/Stack';

import WorkOrderForm
  from './WorkOrderForm';

import HitosTableEditable
  from './HitosTableEditable';

const WorkOrderModal = ({
  open,
  onClose,
  workOrder,
  onSaved
}) => {

  return (

    <Modal
      open={open}
      onClose={onClose}
      title={
        workOrder?.id
          ? 'Editar Work Order'
          : 'Nueva Work Order'
      }
      size="xl"
    >

      <Stack gap="xl">

        <WorkOrderForm
          initialData={workOrder}
        />

        <HitosTableEditable
          workOrderId={workOrder?.id}
        />

      </Stack>

    </Modal>

  );

};

export default WorkOrderModal;