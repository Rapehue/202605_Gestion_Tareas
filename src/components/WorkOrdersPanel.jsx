import {
  BriefcaseBusiness,
  Plus,
  AlertCircle
} from 'lucide-react';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

import { useWorkOrders }
  from '../hooks/useWorkOrders';

import WorkOrderCard
  from './WorkOrderCard';

import './WorkOrdersPanel.css';
import { PERMISSIONS } from '@/security/permissions';
import { useEffect } from 'react';

const WorkOrdersPanel = ({
  projectId,
  onCreate,
  onEdit
}) => {

  const {
    data: workOrders = [],
    loading,
    error
  } = useWorkOrders(projectId);

  useEffect(() => {
  console.log('WORK ORDERS MOUNT');
}, []);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <Card className="workorders-panel-state">

        <div className="workorders-loading">

          Cargando Work Orders...

        </div>

      </Card>

    );

  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {

    return (

      <Card className="workorders-panel-state error">

        <div className="workorders-error">

          <AlertCircle size={18} />

          <span>
            Error cargando Work Orders
          </span>

        </div>

      </Card>

    );

  }

  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="workorders-panel">

      {/* ============================================= */}
      {/* HEADER */}
      {/* ============================================= */}

      <div className="workorders-panel-header">

        <div className="workorders-panel-heading">

          <div className="workorders-panel-icon">

            <BriefcaseBusiness size={20} />

          </div>

          <div>

            <h2>
              Work Orders
            </h2>

            <p>
              Gestión operativa y
              económica del proyecto
            </p>

          </div>

        </div>

        {/* {
          can(
            PERMISSIONS.WO_CREATE
          )
          &&
          ( */}
            <Button
              onClick={() => onCreate?.()}
              className="create-wo-btn"
            >

              <Plus size={16} />

              Nueva Work Order

            </Button>
          {/* )
        } */}
      </div>

      {/* ============================================= */}
      {/* EMPTY STATE */}
      {/* ============================================= */}

      {workOrders.length === 0 && (

        <Card className="workorders-empty-state">

          <div className="workorders-empty-icon">

            <BriefcaseBusiness size={28} />

          </div>

          <h3>
            No hay Work Orders
          </h3>

          <p>
            Este proyecto todavía no
            tiene Work Orders asociadas.
          </p>

          <Button
            onClick={() => onCreate?.()}
          >

            <Plus size={16} />

            Crear primera Work Order

          </Button>

        </Card>

      )}

      {/* ============================================= */}
      {/* LIST */}
      {/* ============================================= */}

      {workOrders.length > 0 && (

        <div className="workorders-list">

          {workOrders.map((wo) => (

            <WorkOrderCard
              key={wo.id}
              workOrder={wo}
              onEdit={onEdit}
            />

          ))}

        </div>

      )}

    </div>

  );

};

export default WorkOrdersPanel;