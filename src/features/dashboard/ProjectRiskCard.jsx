import Card from '@/components/ui/Card';

import {
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion
} from 'lucide-react';

import './ProjectRiskCard.css';

const ProjectRiskCard = ({
  risk
}) => {

  if (!risk) return null;

  const icon = {

    BAJO: <ShieldCheck size={24} />,
    MEDIO: <ShieldQuestion size={24} />,
    ALTO: <ShieldAlert size={24} />

  };

  return (

    <Card
      className={`risk-card risk-${risk.level.toLowerCase()}`}
    >

      <div className="risk-header">

        {icon[risk.level]}

        <div>

          <span>
            Riesgo Proyecto
          </span>

          <strong>
            {risk.level}
          </strong>

        </div>

      </div>

      <div className="risk-score">

        Score:
        {' '}
        {risk.score}/100

      </div>

    </Card>

  );

};

export default ProjectRiskCard;