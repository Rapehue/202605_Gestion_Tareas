import {
  FolderKanban,
  BriefcaseBusiness,
  Flag,
  Timer
} from 'lucide-react';

import Card from '@/components/ui/Card';

import './ExecutiveKPIs.css';

const ExecutiveKPIs = ({ summary }) => {

  return (

    <div className="executive-kpis">

      <Card className="exec-kpi-card">

        <FolderKanban size={28} />

        <div>

          <span>Proyectos</span>

          <strong>
            {summary?.proyectos || 0}
          </strong>

        </div>

      </Card>

      <Card className="exec-kpi-card">

        <BriefcaseBusiness size={28} />

        <div>

          <span>Work Orders</span>

          <strong>
            {summary?.workOrders || 0}
          </strong>

        </div>

      </Card>

      <Card className="exec-kpi-card">

        <Flag size={28} />

        <div>

          <span>Hitos</span>

          <strong>
            {summary?.hitos || 0}
          </strong>

        </div>

      </Card>

      <Card className="exec-kpi-card">

        <Timer size={28} />

        <div>

          <span>Jornadas</span>

          <strong>
            {summary?.totalJornadas?.toLocaleString('es-ES') || 0}
          </strong>

        </div>

      </Card>

    </div>

  );

};

export default ExecutiveKPIs;