import { useNavigate } from 'react-router-dom'; // 👈 Importamos el enrutador
import DataTable from '@/components/datatable/DataTable';
import { Badge } from '@/components';

const ProyectoTable = ({
  data = [], // 👈 Sincronizado con 'data'. Le ponemos un array vacío por defecto por seguridad
  loading
}) => {
  const navigate = useNavigate(); // 👈 Inicializamos la navegación

  const columns = [
    {
      key: 'codigo',
      label: 'Código'
    },
    {
      key: 'nombre',
      label: 'Nombre'
    },
    {
      key: 'estado',
      label: 'Estado',
      render: (value) => (
        <Badge>
          {value}
        </Badge>
      )
    },
    {
      key: 'gestor[0].nombre_completo',
      label: 'Gestor'
    }
  ];

  // 💡 Función que se ejecuta al pulsar una fila. 
  // Normalmente tu DataTable genérico devolverá el objeto completo 'row' al hacer clic.
  const handleRowClick = (proyecto) => {
    if (proyecto?.id) {
      navigate(`/proyectos/${proyecto.id}`); // 🚀 Redirige a la URL /proyectos/1
    }
  };


  return (
    <DataTable
      columns={columns}
      data={data} // 👈 Sincronizado
      loading={loading}
      onRowClick={handleRowClick} // 👈 Conectado a la navegación automática
    />
  );
};

export default ProyectoTable;