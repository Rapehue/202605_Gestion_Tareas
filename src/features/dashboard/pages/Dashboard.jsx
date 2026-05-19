import { Page, PageHeader, Grid, Stack } from '@/layout';

import { Card } from '@/components/';

const Dashboard = () => {

  return (
    <Page>

      <Stack gap="lg">

        <PageHeader
          title="Dashboard"
          subtitle="Resumen global de actividad"
        />

        <Grid columns={4}>

          <Card>
            KPI 1
          </Card>

          <Card>
            KPI 2
          </Card>

          <Card>
            KPI 3
          </Card>

          <Card>
            KPI 4
          </Card>

        </Grid>

        <Grid columns={2}>

          <Card>
            Facturación
          </Card>

          <Card>
            Actividad reciente
          </Card>

        </Grid>

      </Stack>

    </Page>
  );
};

export default Dashboard;