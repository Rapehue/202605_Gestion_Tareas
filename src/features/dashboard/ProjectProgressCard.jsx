import Card from '@/components/ui/Card';

import './ProjectProgressCard.css';

const ProjectProgressCard = ({
  progress
}) => {

  return (

    <Card>

      <h3>
        Avance Global
      </h3>

      <strong>
        {progress.porcentaje}%
      </strong>

      <div className="progress-track">

        <div
          className="progress-fill"
          style={{
            width:
              `${progress.porcentaje}%`
          }}
        />

      </div>

    </Card>

  );

};

export default ProjectProgressCard;