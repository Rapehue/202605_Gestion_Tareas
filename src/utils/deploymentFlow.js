// src/utils/deploymentFlow.js

import { DEPLOYMENT_FLOWS } from '@/constants/deploymentFlows';

/**
 * Devuelve el flujo configurado
 */
export function getDeploymentFlow(flow = 'STANDARD') {

  return DEPLOYMENT_FLOWS[flow] || [];

}

/**
 * Devuelve el siguiente entorno donde puede desplegarse
 */
export function getNextEnvironment(
  deployments = [],
  flow = 'STANDARD'
) {

  const deployed =
    deployments.map(d => d.environment);

  return getDeploymentFlow(flow).find(

    env => !deployed.includes(env.value)

  ) || null;

}

/**
 * Devuelve el entorno actual
 * (último despliegue realizado)
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
 * Indica si un entorno ya está desplegado
 */
export function isEnvironmentDeployed(
  deployments,
  environment
) {

  return deployments.some(

    d => d.environment === environment

  );

}

/**
 * Devuelve un mapa
 * { TESTING: true, PREPRODUCCION:false... }
 */
export function getDeploymentMap(
  deployments = []
) {

  return deployments.reduce(

    (map, dep) => {

      map[dep.environment] = dep;

      return map;

    },

    {}

  );

}