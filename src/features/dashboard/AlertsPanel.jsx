import Card from '@/components/ui/Card';

import {
  AlertTriangle,
  AlertCircle
} from 'lucide-react';

import { useAlerts }
  from '@/hooks/useAlerts';

import './AlertsPanel.css';

const AlertsPanel = () => {

  const {
    data = [],
    loading
  } = useAlerts();

  if (loading) {

    return (
      <Card>
        Cargando alertas...
      </Card>
    );

  }

  return (

    <Card className="alerts-card">

      <h3>

        <AlertTriangle size={18} />

        Alertas Activas

      </h3>

      {data.length === 0 && (

        <div className="no-alerts">

          Sin alertas activas

        </div>

      )}

      {data.map((alert, idx) => (

        <div
          key={idx}
          className={`alert-item ${alert.severity}`}
        >

          <AlertCircle size={16} />

          <span>
            {alert.message}
          </span>

        </div>

      ))}

    </Card>

  );

};

export default AlertsPanel;