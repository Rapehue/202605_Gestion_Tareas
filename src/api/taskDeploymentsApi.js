import api from './client';

export const getDeploymentsByTask =
  (taskId) => {

    return api.get(
      `/task-deployments/task/${taskId}`
    );

  };

export const createDeployment =
  (
    taskId,
    payload
  ) => {

    return api.post(
      `/task-deployments/task/${taskId}`,
      payload
    );

  };

export const deleteDeployment =
  (deploymentId) => {

    return api.delete(
      `/task-deployments/${deploymentId}`
    );

  };