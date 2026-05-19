import DataTable
  from '@/components/datatable/DataTable';

import { Badge }
  from '@/components';

const ProyectoTable = ({
  projects,
  loading,
  onOpen
}) => {

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
      key: 'cliente',
      label: 'Cliente'
    }

  ];

  return (
    <DataTable
      columns={columns}
      data={projects}
      loading={loading}
      onRowClick={onOpen}
    />
  );
};

export default ProyectoTable;