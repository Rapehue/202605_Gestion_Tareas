import { useNavigate } from 'react-router-dom';

const Proyectos = () => {

  const navigate = useNavigate();

  return (
    <div>

      <h2>Proyectos</h2>

      <button
        onClick={() => navigate('/proyectos/1')}
      >
        Ir a proyecto demo
      </button>

    </div>
  );
};

export default Proyectos;