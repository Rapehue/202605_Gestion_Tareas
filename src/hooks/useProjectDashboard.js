import { useQuery } from './useQuery';

import {
  getProjectDashboard
} from '@/api/dashboardApi';

export const useProjectDashboard = (
  projectId
) => {

  return useQuery(
    `project-dashboard-${projectId}`,
    () =>
      getProjectDashboard(
        projectId
      )
  );

};