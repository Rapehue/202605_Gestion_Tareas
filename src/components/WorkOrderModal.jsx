import Modal from './Modal';
import WorkOrderForm from './WorkOrderForm';

const WorkOrderModal = ({ open, onClose, workOrder, projectId, onSaved }) => {

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose}>

      <h2 style={{ marginBottom: 16 }}>
        {workOrder ? 'Editar Work Order' : 'Nueva Work Order'}
      </h2>

      <WorkOrderForm
        initialData={workOrder}
        projectId={projectId}
        onSaved={onSaved}
      />

    </Modal>
  );
};

export default WorkOrderModal;