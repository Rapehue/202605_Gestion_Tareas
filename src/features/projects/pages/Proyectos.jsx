import { Page, PageHeader, Stack } from '@/layout';

import { Card, Button, ProyectoTable } from '@/components';

// 1. Importamos tu hook de caché y la función de la API
import { useQuery } from '@/hooks/useQuery'; // Ajusta la ruta si es necesario
import { getProyectos } from '@/api/proyectosApi'; // O la ruta correcta de tu API
import { useState } from 'react';
import ProyectoModal from '@/components/ProyectoModal';

const Proyectos = () => {

  const [openModal, setOpenModal] = useState(false);

  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  // 2. Consumimos los datos usando tu gestor de caché
  const {
    data,
    loading,
    error,
    refetch
  } = useQuery(
    'listado-proyectos',
    async () => {

      const res =
        await getProyectos();

      return res.data || res;

    }
  );

  const handleCreate = () => {
    setProyectoSeleccionado(null);
    setOpenModal(true);
  };

  const handleEdit = (project) => {
    setProyectoSeleccionado(project);
    setOpenModal(true);
  };

  return (
    <Page>

      <Stack gap="lg">

        <PageHeader
          title="Proyectos"
          subtitle="Gestión integral de proyectos"
          actions={
            <Button
              onClick={() => {
                setProyectoSeleccionado(null);
                setOpenModal(true);
              }}
            >
              Nuevo Proyecto
            </Button>
          }
        />

        <Card>
          {/* 3. Pasamos los estados correspondientes a la tabla */}
          <ProyectoTable
            data={data || []}
            loading={loading}
            error={error}
            onRefresh={refetch}
          />

        </Card>

      </Stack>
      <ProyectoModal
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        proyecto={proyectoSeleccionado}
        onSaved={refetch}
      />
    </Page>

  );
};

export default Proyectos;