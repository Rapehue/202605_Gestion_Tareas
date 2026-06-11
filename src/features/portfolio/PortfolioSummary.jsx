import {
  FolderKanban,
  Coins,
  CircleDollarSign,
  TriangleAlert,
  ShieldAlert
} from 'lucide-react';

import Card from '@/components/ui/Card';

import './PortfolioSummary.css';

const PortfolioSummary = ({
  projects = []
}) => {

  const totalProjects =
    projects.length;

  const presupuestoTotal =
    projects.reduce(
      (acc, p) =>
        acc +
        Number(
          p.presupuesto || 0
        ),
      0
    );

  const facturadoTotal =
    projects.reduce(
      (acc, p) =>
        acc +
        Number(
          p.facturado || 0
        ),
      0
    );

  const totalAlerts =
    projects.reduce(
      (acc, p) =>
        acc +
        Number(
          p.alerts || 0
        ),
      0
    );

  const proyectosAltoRiesgo =
    projects.filter(
      p => p.risk === 'ALTO'
    ).length;

  return (

    <div className="portfolio-summary">

      <Card className="portfolio-kpi-card">

        <FolderKanban size={24} />

        <div>

          <span>
            Proyectos
          </span>

          <strong>
            {totalProjects}
          </strong>

        </div>

      </Card>

      <Card className="portfolio-kpi-card">

        <Coins size={24} />

        <div>

          <span>
            Presupuesto
          </span>

          <strong>

            {presupuestoTotal.toLocaleString('es-ES')} €

          </strong>

        </div>

      </Card>

      <Card className="portfolio-kpi-card">

        <CircleDollarSign size={24} />

        <div>

          <span>
            Facturado
          </span>

          <strong>

            {facturadoTotal.toLocaleString('es-ES')} €

          </strong>

        </div>

      </Card>

      <Card className="portfolio-kpi-card">

        <TriangleAlert size={24} />

        <div>

          <span>
            Alertas
          </span>

          <strong>
            {totalAlerts}
          </strong>

        </div>

      </Card>

      <Card
        className={`
          portfolio-kpi-card
          portfolio-risk-card
          ${proyectosAltoRiesgo > 0
            ? 'high-risk'
            : ''
          }
        `}
      >

        <ShieldAlert size={24} />

        <div>

          <span>
            Riesgo Alto
          </span>

          <strong>
            {proyectosAltoRiesgo}
          </strong>

        </div>

      </Card>

    </div>

  );

};

export default PortfolioSummary;