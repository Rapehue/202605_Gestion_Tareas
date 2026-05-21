import { Page, PageHeader, Grid, Stack } from '@/layout';
import { Card } from '@/components/';

// 1. Importamos tu hook personalizado de datos
import { useDashboard } from '@/hooks/useDashboard';

const Dashboard = () => {

  // 2. Ejecutamos el hook. (Si es global, podemos pasar un id general o manejarlo vacío según tu API)
  // useQuery suele retornar un objeto con { data, loading, error } o similar.
  const { data: metrics, loading, error } = useDashboard('global');

  // 3. Controlamos los estados de carga y error para que la app no rompa
  if (loading) return <Page><p>Cargando estadísticas globales...</p></Page>;
  if (error) return <Page><p className="warning">Error al cargar las métricas del panel.</p></Page>;

  // 4. Extraemos los valores con valores por defecto por seguridad si la API tarda o viene vacía
  const kpis = metrics?.kpis || { totalProyectos: 0, totalWo: 0, importePendiente: 0, eficiencia: 0 };
  const facturacion = metrics?.facturacion || [];
  const actividades = metrics?.actividades || [];

  return (
    <Page>

      <Stack gap="lg">

        <PageHeader
          title="Dashboard"
          subtitle="Resumen global de actividad"
        />

        <Grid columns={4}>

          <Card>
            <div className="kpi-stat">
              <span className="kpi-label">Proyectos Activos</span>
              <strong className="kpi-value">{kpis.totalProyectos}</strong>
            </div>
          </Card>

          <Card>
            <div className="kpi-stat">
              <span className="kpi-label">Work Orders Totales</span>
              <strong className="kpi-value">{kpis.totalWo}</strong>
            </div>
          </Card>

          <Card>
            <div className="kpi-stat">
              <span className="kpi-label">Importe Pendiente</span>
              <strong className="kpi-value">{kpis.importePendiente} €</strong>
            </div>
          </Card>

          <Card>
            <div className="kpi-stat">
              <span className="kpi-label">Eficiencia Media</span>
              <strong className="kpi-value">{kpis.eficiencia}%</strong>
            </div>
          </Card>

        </Grid>

        <Grid columns={2}>

          <Card>
            <h3>Facturación</h3>
            {/* Aquí es donde conectarás tu librería de gráficos (Recharts, Chart.js, etc.) */}
            <div className="chart-placeholder">
              Gráfico de ingresos: {facturacion.length} meses registrados.
            </div>
          </Card>

          <Card>
            <h3>Actividad reciente</h3>
            <ul className="activity-list">
              {actividades.map((act) => (
                <li key={act.id} className="activity-item">
                  <span>{act.descripcion}</span>
                  <small>{act.fecha}</small>
                </li>
              ))}
              {actividades.length === 0 && <li>No hay actividad registrada recientemente.</li>}
            </ul>
          </Card>

        </Grid>

      </Stack>

    </Page>
  );
};

export default Dashboard;