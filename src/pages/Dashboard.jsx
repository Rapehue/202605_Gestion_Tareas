import { useDashboard } from '../hooks/useDashboard';

const Dashboard = () => {

  const { data = {}, loading } = useDashboard(1);

  const workOrders = data.workOrders || [];
  const hitos = data.hitos || [];

  // KPIs
  const totalWO = workOrders.length;

  const totalImporte = workOrders.reduce(
    (s, w) => s + Number(w.precio || 0),
    0
  );

  const totalConcedido = hitos
    .filter(h => h.estado === 'CONCEDIDO_VB')
    .reduce((s, h) => s + Number(h.importe || 0), 0);

  const progress = totalImporte
    ? (totalConcedido / totalImporte) * 100
    : 0;

  if (loading) return <p>Cargando...</p>;

  return (
    <div>

      <h2>Dashboard</h2>

      <div className="kpis">

        <div className="card">
          <h4>Work Orders</h4>
          <p>{totalWO}</p>
        </div>

        <div className="card">
          <h4>Total</h4>
          <p>{totalImporte} €</p>
        </div>

        <div className="card">
          <h4>Concedido</h4>
          <p>{totalConcedido} €</p>
        </div>

        <div className="card">
          <h4>Progreso</h4>
          <p>{Math.round(progress)}%</p>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;