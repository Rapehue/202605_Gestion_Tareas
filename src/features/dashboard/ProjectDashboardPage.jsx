import {
  useProjectDashboard
} from '@/hooks/useProjectDashboard';

import ProjectHealthIndicator from './ProjectHealthIndicator';
import ProjectBudgetWidget from './ProjectBudgetWidget';
import ProjectProgressWidget from './ProjectProgressWidget';
import ProjectBurnupChart from './ProjectBurnupChart';
import ProjectTimeline from './ProjectTimeline';
import ProjectMilestoneSummary from './ProjectMilestoneSummary';

import './ProjectDashboardPage.css';

const ProjectDashboardPage = ({
  projectId
}) => {

  const {
    data,
    loading
  } = useProjectDashboard(
    projectId
  );

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (

    <div
      className="project-dashboard"
    >

      <ProjectHealthIndicator
        data={data}
      />

      <ProjectBudgetWidget
        data={data}
      />

      <ProjectProgressWidget
        data={data}
      />

      <ProjectBurnupChart
        data={data}
      />

      <ProjectMilestoneSummary
        data={data}
      />

      <ProjectTimeline
        data={data}
      />

    </div>

  );

};

export default ProjectDashboardPage;