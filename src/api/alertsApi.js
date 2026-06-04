import api from './client';

export const getAlerts =
  () => api.get('/alerts');