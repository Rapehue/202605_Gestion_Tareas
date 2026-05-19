import { useQuery } from './useQuery';
import { getDashboard } from '../api/dashboardApi';

export const useDashboard = (projectId) => {

  const query = useQuery(
    `dashboard-${projectId}`,
    () => getDashboard(projectId)
  );

  return {
    ...query,
    data: {
      workOrders: query.data?.workOrders || [],
      hitos: query.data?.hitos || []
    }
  };
};