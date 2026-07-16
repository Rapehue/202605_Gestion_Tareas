// src/utils/deploymentFlow.js

import { TASK_ENVIRONMENTS } from '@/constants/taskEnvironments';
import { DEPLOYMENT_FLOWS } from '@/constants/deploymentFlows';

/**
 * Devuelve los objetos de entorno
 * correspondientes al flujo solicitado.
 */
export function getDeploymentFlow(flow = 'STANDARD') {

  const values =
    DEPLOYMENT_FLOWS[flow] || [];

  return values

    .map(value =>
      TASK_ENVIRONMENTS.find(
        env => env.value === value
      )
    )

    .filter(Boolean);

}

/**
 * Devuelve únicamente los valores
 * del flujo (TESTING, PREPRODUCCION...)
 */
export function getDeploymentValues(flow = 'STANDARD') {

  return DEPLOYMENT_FLOWS[flow] || [];

}

/**
 * Devuelve un mapa de despliegues.
 *
 * {
 *   TESTING: {...},
 *   PREPRODUCCION: {...}
 * }
 */
export function getDeploymentMap(
  deployments = []
) {

  return deployments.reduce(

    (map, deployment) => {

      map[
        deployment.environment
      ] = deployment;

      return map;

    },

    {}

  );

}

/**
 * Último entorno alcanzado.
 */
export function getCurrentEnvironment(
  deployments = []
) {

  if (!deployments.length)
    return null;

  return deployments[
    deployments.length - 1
  ].environment;

}

/**
 * Último despliegue realizado.
 */
export function getCurrentDeployment(
  deployments = []
) {

  if (!deployments.length)
    return null;

  return deployments[
    deployments.length - 1
  ];

}

/**
 * ¿Está desplegado?
 */
export function isEnvironmentDeployed(
  deployments = [],
  environment
) {

  return deployments.some(

    deployment =>
      deployment.environment ===
      environment

  );

}

/**
 * Devuelve el siguiente entorno
 * donde puede desplegarse.
 */
export function getNextEnvironment(
  deployments = [],
  flow = 'STANDARD'
) {

  const deployed = deployments.map(
    deployment => deployment.environment
  );

  return getDeploymentFlow(flow).find(

    env =>
      !deployed.includes(
        env.value
      )

  ) || null;

}

/**
 * Devuelve las opciones
 * para un Select.
 */
export function getEnvironmentOptions(
  flow = 'STANDARD'
) {

  return getDeploymentFlow(flow).map(

    env => ({

      value: env.value,

      label: `${env.icon} ${env.label}`

    })

  );

}