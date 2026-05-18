import { useWorkOrders } from '../hooks/useWorkOrders';
import WorkOrderCard from './WorkOrderCard';

const WorkOrdersPanel = ({ projectId, onCreate, onEdit }) => {

  const {
    data: workOrders = [],
    loading,
    error
  } = useWorkOrders(projectId);

  if (loading) return <p>Cargando Work Orders...</p>;
  if (error) return <p>Error cargando Work Orders</p>;

  return (
    <div className="section">

      <div className="section-header">
        <h3>Work Orders</h3>

        <button
          className="btn-primary"
          onClick={() => onCreate?.()}
        >
          + Nueva Work Order
        </button>
      </div>

      {workOrders.length === 0 && (
        <p className="empty">No hay Work Orders</p>
      )}

      <div className="wo-list">
        {workOrders.map(wo => (
          <WorkOrderCard
            key={wo.id}
            workOrder={wo}
            onEdit={onEdit}
          />
        ))}
      </div>

    </div>
  );
};

export default WorkOrdersPanel;