import { useQuery } from './useQuery';
import { getDashboard } from '../api/dashboardApi';

export const useDashboard = (projectId) => {

  return useQuery(
    `dashboard-${projectId}`,
    () => getDashboard(projectId)
  );
};