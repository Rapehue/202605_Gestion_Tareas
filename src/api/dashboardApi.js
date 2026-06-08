import api from './client';

export const getDashboard = (projectId) =>
  api.get(`/dashboard/${projectId}`);

export const getDashboardSummary = async () => {

  const data =
    await api.get('/dashboard/summary');

  console.log(
    'DASHBOARD RAW',
    JSON.stringify(data, null, 2)
  );

  return data;
};

export const getProjectDashboard = async (projectId) => {

  if (!projectId) {
    throw new Error('projectId es obligatorio');
  }

  const data = await api.get(
    `/dashboard/${projectId}`
  );

  return data;

};

export const getProjectRoadmap =
  async (projectId) => {

    return api.get(
      `/dashboard/project/${projectId}/roadmap`
    );

  };

  export const getPortfolio =
  async () => {

    return api.get(
      '/dashboard/portfolio'
    );

  };