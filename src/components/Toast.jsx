import { useEffect } from 'react';
import '../styles/toast.css';

const Toast = ({ message, type, onClose }) => {

  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`toast ${type}`}>
      {message}
    </div>
  );
};

export default Toast;