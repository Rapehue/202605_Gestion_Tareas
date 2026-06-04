import Card from '@/components/ui/Card';

import {
  BriefcaseBusiness,
  Flag,
  Circle,
  CheckCircle2,
  Clock3,
  Ban
} from 'lucide-react';

import './StatusSummary.css';

const StatusSummary = ({ summary }) => {

  const wo = summary?.woPorEstado || {};

  const hitos = summary?.hitosPorEstado || {};

  return (

    <div className="status-summary">

      {/* ========================= */}
      {/* WORK ORDERS */}
      {/* ========================= */}

      <Card className="status-card">

        <div className="status-header">

          <BriefcaseBusiness size={20} />

          <h3>
            Estado de Work Orders
          </h3>

        </div>

        <div className="status-grid">

          <div className="status-item">

            <Circle size={16} />

            <span>Borrador</span>

            <strong>{wo.BORRADOR || 0}</strong>

          </div>

          <div className="status-item">

            <Clock3 size={16} />

            <span>En curso</span>

            <strong>{wo.EN_CURSO || 0}</strong>

          </div>

          <div className="status-item">

            <Flag size={16} />

            <span>Validación</span>

            <strong>{wo.EN_VALIDACION || 0}</strong>

          </div>

          <div className="status-item">

            <CheckCircle2 size={16} />

            <span>Finalizadas</span>

            <strong>{wo.FINALIZADA || 0}</strong>

          </div>

          <div className="status-item">

            <Ban size={16} />

            <span>Canceladas</span>

            <strong>{wo.CANCELADA || 0}</strong>

          </div>

        </div>

      </Card>

      {/* ========================= */}
      {/* HITOS */}
      {/* ========================= */}

      <Card className="status-card">

        <div className="status-header">

          <Flag size={20} />

          <h3>
            Estado de Hitos
          </h3>

        </div>

        <div className="status-grid">

          <div className="status-item">

            <Clock3 size={16} />

            <span>En curso</span>

            <strong>{hitos.EN_CURSO || 0}</strong>

          </div>

          <div className="status-item">

            <Flag size={16} />

            <span>Solicitado VB</span>

            <strong>{hitos.SOLICITADO_VB || 0}</strong>

          </div>

          <div className="status-item">

            <CheckCircle2 size={16} />

            <span>Concedido VB</span>

            <strong>{hitos.CONCEDIDO_VB || 0}</strong>

          </div>

        </div>

      </Card>

    </div>

  );

};

export default StatusSummary;