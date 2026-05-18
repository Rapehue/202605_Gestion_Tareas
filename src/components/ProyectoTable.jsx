import '../styles/Proyectotable.css';

const ProyectoTable = ({ proyectos, onEdit, onView }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>Gestor</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {proyectos.map(p => (
          <tr key={p.id}>
            <td>{p.codigo}</td>
            <td>{p.nombre}</td>
            <td>{p.gestor?.nombre_completo}</td>
            <td>
              <button onClick={() => onEdit(p)}>
                Editar
              </button>

              <button onClick={() => onView(p)}>
                Ver
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProyectoTable;