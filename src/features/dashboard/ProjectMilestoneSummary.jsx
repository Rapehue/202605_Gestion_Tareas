import Card from '@/components/ui/Card';

const ProjectMilestoneSummary = ({
  data
}) => {

  const concedidos =
    data.hitos.filter(
      h =>
        h.estado ===
        'CONCEDIDO_VB'
    ).length;

  const pendientes =
    data.hitos.filter(
      h =>
        h.estado ===
        'SOLICITADO_VB'
    ).length;

  return (

    <Card>

      <h3>
        Hitos
      </h3>

      <div>
        Concedidos:
        {concedidos}
      </div>

      <div>
        Pendientes:
        {pendientes}
      </div>

    </Card>

  );

};

export default ProjectMilestoneSummary;