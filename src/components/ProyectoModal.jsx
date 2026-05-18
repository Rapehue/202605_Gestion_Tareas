import Modal from './Modal';
import ProyectoForm from './ProyectoForm';

const ProyectoModal = ({ open, onClose, onSaved, proyecto }) => {

  const isEdit = !!proyecto;

  const handleSaved = () => {
    onSaved();   // refresca tabla
    onClose();   // 🔥 cierra modal
  };

  return (
    <Modal open={open} onClose={onClose}>

      <div style={{ marginBottom: 15 }}>
        <h2>
          {isEdit ? 'Editar Proyecto' : 'Nuevo Proyecto'}
        </h2>
        <p style={{ color: '#6b7280', fontSize: 14 }}>
          {isEdit
            ? 'Modifica los datos del proyecto'
            : 'Completa la información para crear un nuevo proyecto'}
        </p>
      </div>

      <ProyectoForm
        key={proyecto?.id || 'new'} // 🔥 fuerza remount completo
        initialData={proyecto}
        onSaved={handleSaved}
      />

    </Modal>
  );
};

export default ProyectoModal;