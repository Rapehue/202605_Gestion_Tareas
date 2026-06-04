import Card from '@/components/ui/Card';

import {
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion
} from 'lucide-react';

const ProjectHealthIndicator = ({
  data
}) => {

  const presupuesto =
    data.workOrders.reduce(
      (s, wo) =>
        s + Number(wo.precio || 0),
      0
    );

  const concedido =
    data.hitos
      .filter(
        h =>
          h.estado ===
          'CONCEDIDO_VB'
      )
      .reduce(
        (s, h) =>
          s + Number(h.importe || 0),
        0
      );

  const consumo =
    presupuesto
      ? (concedido / presupuesto) * 100
      : 0;

  let color =
    'green';

  let label =
    'SALUDABLE';

  let Icon =
    ShieldCheck;

  if (consumo > 75) {

    color = 'orange';
    label = 'ATENCIÓN';
    Icon = ShieldQuestion;

  }

  if (consumo > 90) {

    color = 'red';
    label = 'CRÍTICO';
    Icon = ShieldAlert;

  }

  return (

    <Card
      className={`health-card ${color}`}
    >

      <Icon size={42} />

      <div>

        <span>
          Estado General
        </span>

        <strong>
          {label}
        </strong>

      </div>

    </Card>

  );

};

export default ProjectHealthIndicator;