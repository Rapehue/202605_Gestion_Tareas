import Card
from '@/components/ui/Card';

const MyProjectsCard = ({
  data
}) => {

  return (

    <Card>

      <h3>
        Mis proyectos
      </h3>

      {

        data.projects.map(
          project => (

            <div
              key={project.id}
            >

              {project.codigo}
              {' - '}
              {project.nombre}

            </div>

          )
        )

      }

    </Card>

  );

};

export default MyProjectsCard;