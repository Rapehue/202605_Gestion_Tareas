import { useState } from 'react';
import HitosInlineTable from './HitosInlineTable';

const WorkOrderRow = ({ workOrder }) => {

  const [open, setOpen] = useState(false);

  return (
    <div className="wo-card">

      {/* HEADER */}
      <div className="wo-header" onClick={() => setOpen(!open)}>

        <div>
          <strong>{workOrder.codigo}</strong> - {workOrder.proveedor}
        </div>

        <div>
          {workOrder.precio} €
        </div>

      </div>

      {/* BODY */}
      {open && (
        <div className="wo-body">

          <p>{workOrder.descripcion}</p>

          <HitosInlineTable workOrderId={workOrder.id} />

        </div>
      )}

    </div>
  );
};

export default WorkOrderRow;