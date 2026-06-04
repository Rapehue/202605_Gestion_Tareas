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