import { useState } from 'react';
import Modal from './Modal';
import ProyectoForm from './ProyectoForm';

const CreateProyectoModal = ({ onCreated }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        + Nuevo Proyecto
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ProyectoForm
          onCreated={() => {
            onCreated();
            setOpen(false); // cerrar modal tras crear
          }}
        />
      </Modal>
    </>
  );
};

export default CreateProyectoModal;