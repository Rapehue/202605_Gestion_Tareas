import Badge from '@/components/ui/Badge';

import './HitoSummary.css';

const HitoSummary = ({
  totalPorcentaje,
  totalImporte,
  numeroHitos,
  porcentajeExcedido,
  importeExcedido
}) => {

  const correcto =
    !porcentajeExcedido &&
    !importeExcedido;

  return (

    <div className="hito-summary">

      <div className="summary-card">

        <span>
          Nº Hitos
        </span>

        <strong>
          {numeroHitos}
        </strong>

      </div>

      <div className="summary-card">

        <span>
          Total %
        </span>

        <strong>
          {totalPorcentaje}%
        </strong>

      </div>

      <div className="summary-card">

        <span>
          Total Importe
        </span>

        <strong>

          {
            Number(
              totalImporte
            ).toLocaleString(
              'es-ES',
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }
            )
          }

          €

        </strong>

      </div>

      <div className="summary-card">

        <span>
          Estado Global
        </span>

        <Badge
          variant={
            correcto
              ? 'success'
              : 'danger'
          }
        >

          {
            correcto
              ? 'Correcto'
              : 'Revisar'
          }

        </Badge>

      </div>

    </div>

  );

};

export default HitoSummary;