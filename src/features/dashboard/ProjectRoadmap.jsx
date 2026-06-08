import Card from '@/components/ui/Card';

import {
  useProjectRoadmap
} from '@/hooks/useProjectRoadmap';

import RoadmapRow from './RoadmapRow';

import './ProjectRoadmap.css';

const ProjectRoadmap = ({
  projectId
}) => {

  const {
    data: workOrders,
    loading
  } = useProjectRoadmap(projectId);

  if (loading) {

    return (
      <Card>
        Cargando roadmap...
      </Card>
    );

  }

  return (

    <Card className="roadmap-card">

      <div className="roadmap-header">

        <h3>
          Roadmap del Proyecto
        </h3>

      </div>

      <div className="roadmap-body">

        {workOrders.map(wo => (

          <RoadmapRow
            key={wo.id}
            workOrder={wo}
          />

        ))}

      </div>

    </Card>

  );

};

export default ProjectRoadmap;