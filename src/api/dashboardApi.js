import api from './client';

export const getDashboard = (projectId) =>
  api.get(`/dashboard/${projectId}`);