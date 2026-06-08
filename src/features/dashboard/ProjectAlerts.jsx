import Card from '@/components/ui/Card';

import './ProjectAlerts.css';

const ProjectAlerts = ({
  alerts = []
}) => {

  return (

    <Card>

      <h3>
        Alertas
      </h3>

      {alerts.length === 0 && (
        <p>
          Sin alertas activas
        </p>
      )}

      {alerts.map(
        (alert, idx) => (

          <div
            key={idx}
            className={`alert-row severity-${alert.severity.toLowerCase()}`}
          >

            {alert.message}

          </div>

        )
      )}

    </Card>

  );

};

export default ProjectAlerts;