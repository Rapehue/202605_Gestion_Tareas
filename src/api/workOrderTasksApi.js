import api from './client';

export const getTasksByWorkOrder =
  (id) =>
    api.get(
      `/workordertasks/workorder/${id}`
    );

export const createTask =
  (payload) =>
    api.post(
      '/workordertasks',
      payload
    );

export const updateTask =
  (id, payload) =>
    api.put(
      `/workordertasks/${id}`,
      payload
    );