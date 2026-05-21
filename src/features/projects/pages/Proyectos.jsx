import { Page, PageHeader, Stack } from '@/layout';

import { Card, Button, ProyectoTable } from '@/components';

// 1. Importamos tu hook de caché y la función de la API
import { useQuery } from '@/hooks/useQuery'; // Ajusta la ruta si es necesario
import { getProyectos } from '@/api/proyectosApi'; // O la ruta correcta de tu API

const Proyectos = () => {

  // 2. Consumimos los datos usando tu gestor de caché
  const { data, loading, error, refetch } = useQuery('listado-proyectos', async () => {
    const res = await getProyectos();
    // Retornamos el array de datos. Si tu API devuelve { data: [...] }, extraemos res.data
    return res.data || res;
  });

  return (
    <Page>

      <Stack gap="lg">

        <PageHeader
          title="Proyectos"
          subtitle="Gestión integral de proyectos"
          actions={
            <Button>
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

    </Page>
  );
};

export default Proyectos;