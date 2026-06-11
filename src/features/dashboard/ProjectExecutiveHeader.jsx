import Card from '@/components/ui/Card';

import {
  ShieldAlert,
  TrendingUp,
  Bell,
  Coins
} from 'lucide-react';

import './ProjectExecutiveHeader.css';

const ProjectExecutiveHeader = ({
  dashboard,
  onAlertsClick
}) => {

  const risk =
    dashboard?.risk || {};

  const progress =
    dashboard?.progress || {};

  const alerts =
    dashboard?.alerts || [];

  return (

    <div className="project-executive-header">

      <Card className="executive-project-card">

        <ShieldAlert size={22} />

        <div>

          <span>Riesgo</span>

          <strong>
            {risk.level || 'BAJO'}
          </strong>

        </div>

      </Card>

      <Card className="executive-project-card">

        <TrendingUp size={22} />

        <div>

          <span>Avance</span>

          <strong>
            {progress.porcentaje || 0}%
          </strong>

        </div>

      </Card>

      <Card className="executive-project-card">

        <Coins size={22} />

        <div>

          <span>Consumo</span>

          <strong>
            {Math.round(
              risk.porcentajeConsumido || 0
            )}%
          </strong>

        </div>

      </Card>

      <Card
        className="executive-card executive-card-clickable"
        onClick={() => {
          // console.log('CLICK ALERTAS');
          onAlertsClick?.();
        }}
      >

        <Bell size={22} />

        <div>

          <span>Alertas</span>

          <strong>
            {alerts.length}
          </strong>

        </div>

      </Card>

    </div>

  );

};

export default ProjectExecutiveHeader;