import './ProjectTimeline.css';

const ProjectTimeline = ({
  project
}) => {

  if (
    !project?.fecha_inicio ||
    !project?.fecha_fin
  ) {
    return null;
  }

  const start =
    new Date(project.fecha_inicio);

  const end =
    new Date(project.fecha_fin);

  const today =
    new Date();

  const total =
    end - start;

  const elapsed =
    today - start;

  const percentage =
    Math.min(
      100,
      Math.max(
        0,
        (elapsed / total) * 100
      )
    );

  return (

    <div className="project-timeline">

      <h3>
        Timeline Proyecto
      </h3>

      <div className="timeline-bar">

        <div
          className="timeline-fill"
          style={{
            width: `${percentage}%`
          }}
        />

      </div>

      <div className="timeline-labels">

        <span>
          {project.fecha_inicio}
        </span>

        <span>
          {Math.round(percentage)}%
        </span>

        <span>
          {project.fecha_fin}
        </span>

      </div>

    </div>

  );

};

export default ProjectTimeline;