import Card from '@/components/ui/Card';

const ProjectBudgetWidget = ({
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

  return (

    <Card>

      <h3>
        Resumen Económico
      </h3>

      <div>

        Presupuesto:
        {presupuesto.toLocaleString(
          'es-ES'
        )} €

      </div>

      <div>

        Concedido:
        {concedido.toLocaleString(
          'es-ES'
        )} €

      </div>

      <div>

        Pendiente:
        {(presupuesto - concedido)
          .toLocaleString('es-ES')} €

      </div>

    </Card>

  );

};

export default ProjectBudgetWidget;