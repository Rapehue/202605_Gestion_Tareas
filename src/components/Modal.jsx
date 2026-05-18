import '../styles/modal.css';

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="modal-close" onClick={onClose}>×</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;