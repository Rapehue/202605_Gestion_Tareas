import Card from '@/components/ui/Card';

import {
  AlertTriangle,
  Info
} from 'lucide-react';

import './ProjectAlerts.css';

const ProjectAlerts = ({
  alerts = []
}) => {

  if (!alerts.length) {

    return (
      <Card>

        No existen alertas activas

      </Card>
    );

  }

  return (

    <Card>

      <h3>
        Alertas Operativas
      </h3>

      <div className="alerts-list">

        {alerts.map(
          (alert, index) => (

            <div
              key={index}
              className={`alert-item alert-${alert.type}`}
            >

              {alert.type === 'info'
                ? <Info size={18} />
                : <AlertTriangle size={18} />
              }

              <div>

                <strong>
                  {alert.title}
                </strong>

                <span>
                  {alert.description}
                </span>

              </div>

            </div>

          )
        )}

      </div>

    </Card>

  );

};

export default ProjectAlerts;