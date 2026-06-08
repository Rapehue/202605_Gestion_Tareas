import Card from '@/components/ui/Card';
import { ShieldAlert } from 'lucide-react';

import './ProjectRiskCard.css';

const ProjectRiskCard = ({ risk }) => {

  const level =
    risk?.level || 'BAJO';

  return (

    <Card
      className={`risk-card risk-${level.toLowerCase()}`}
    >

      <ShieldAlert size={24} />

      <div>

        <span>
          Riesgo Proyecto
        </span>

        <strong>
          {level}
        </strong>

      </div>

    </Card>

  );

};

export default ProjectRiskCard;