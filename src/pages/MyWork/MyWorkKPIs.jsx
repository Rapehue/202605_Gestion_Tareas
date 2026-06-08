import Card
from '@/components/ui/Card';

import {
  FolderKanban,
  BriefcaseBusiness,
  Flag,
  Bell
} from 'lucide-react';

import './MyWorkKPIs.css';

const MyWorkKPIs = ({
  data
}) => {

  return (

    <div className="mywork-kpis">

      <Card>

        <FolderKanban />

        <strong>

          {data.projects.length}

        </strong>

        <span>
          Proyectos
        </span>

      </Card>

      <Card>

        <BriefcaseBusiness />

        <strong>

          {data.workOrders.length}

        </strong>

        <span>
          Work Orders
        </span>

      </Card>

      <Card>

        <Flag />

        <strong>

          {data.pendingApprovals.length}

        </strong>

        <span>
          Aprobaciones
        </span>

      </Card>

      <Card>

        <Bell />

        <strong>

          0

        </strong>

        <span>
          Alertas
        </span>

      </Card>

    </div>

  );

};

export default MyWorkKPIs;