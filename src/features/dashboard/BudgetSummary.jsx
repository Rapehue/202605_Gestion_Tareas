import Card from '@/components/ui/Card';

import {
  Coins,
  TrendingUp,
  CircleDollarSign,
  Percent
} from 'lucide-react';

import './BudgetSummary.css';

const BudgetSummary = ({ summary }) => {

  const presupuesto =
    Number(summary?.presupuestoTotal || 0);

  const concedido =
    Number(summary?.importeConcedido || 0);

  const pendiente =
    presupuesto - concedido;

  const porcentaje =
    presupuesto > 0
      ? ((concedido / presupuesto) * 100).toFixed(1)
      : 0;

  return (

    <Card className="budget-card">

      <div className="budget-header">

        <Coins size={20} />

        <h3>
          Resumen Económico
        </h3>

      </div>

      <div className="budget-grid">

        <div className="budget-item">

          <CircleDollarSign size={18} />

          <div>

            <span>Presupuesto</span>

            <strong>
              {presupuesto.toLocaleString('es-ES')} €
            </strong>

          </div>

        </div>

        <div className="budget-item">

          <TrendingUp size={18} />

          <div>

            <span>Concedido</span>

            <strong>
              {concedido.toLocaleString('es-ES')} €
            </strong>

          </div>

        </div>

        <div className="budget-item">

          <Coins size={18} />

          <div>

            <span>Pendiente</span>

            <strong>
              {pendiente.toLocaleString('es-ES')} €
            </strong>

          </div>

        </div>

        <div className="budget-item">

          <Percent size={18} />

          <div>

            <span>Ejecución</span>

            <strong>
              {porcentaje}%
            </strong>

          </div>

        </div>

      </div>

      <div className="budget-progress">

        <div
          className="budget-progress-fill"
          style={{
            width: `${porcentaje}%`
          }}
        />

      </div>

    </Card>

  );

};

export default BudgetSummary;