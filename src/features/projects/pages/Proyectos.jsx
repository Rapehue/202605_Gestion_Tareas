import { Page, PageHeader, Stack } from '@/layout';

import { Card, Button, ProyectoTable} from '@/components';

const Proyectos = () => {

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

          <ProyectoTable />

        </Card>

      </Stack>

    </Page>
  );
};

export default Proyectos;