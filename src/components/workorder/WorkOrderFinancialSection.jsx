import {
  Euro,
  Calculator
} from 'lucide-react';

import {
  Card,
  Input
} from '@/components/ui';

import './WorkOrderFinancialSection.css';

const WorkOrderFinancialSection = ({
  form,
  onChange
}) => {

  const jornadas =
    Number(form.jornadas || 0);

  const precio =
    Number(form.precio || 0);

  const tarifaMedia =
    jornadas > 0
      ? precio / jornadas
      : 0;

  return (

    <Card className="wo-form-card">

      <div className="wo-form-section-title">

        <Euro size={18} />

        <span>

          Información económica

        </span>

      </div>

      <div className="wo-financial-grid">

        <Input
          label="Importe WO (€)"
          type="number"
          min="0"
          step="0.01"
          value={form.precio || ''}
          onChange={(e) =>
            onChange(
              'precio',
              e.target.value
            )
          }
        />

      </div>

      {
        jornadas > 0 &&
        precio > 0 && (

          <div className="wo-financial-summary">

            <Calculator size={16} />

            <span>

              Tarifa media estimada:

              <strong>

                {' '}

                {
                  tarifaMedia.toLocaleString(
                    'es-ES',
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }
                  )
                }

                €

                / jornada

              </strong>

            </span>

          </div>

        )
      }

    </Card>

  );

};

export default WorkOrderFinancialSection;