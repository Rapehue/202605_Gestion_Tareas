// src/utils/taskProgress.js

import { getCurrentEnvironment } from './deploymentFlow';

/**
 * Calcula el porcentaje de avance
 * de una tarea.
 */
export function getTaskProgress(task) {

  if (!task) return 0;

  switch (task.tipo) {

    case 'POWERCENTER':
      return getPowerCenterProgress(task);

    case 'MODELADO':
      return getModeladoProgress(task);

    default:
      return Number(task.avance || 0);

  }

}

/**
 * PowerCenter
 */
function getPowerCenterProgress(task) {

  if (task.estado === 'PENDIENTE' || task.estado === 'BLOQUEADA')
    return 0;

  if (task.estado === 'FINALIZADA')
    return 100;

  const current =
    getCurrentEnvironment(
      task.deployments || []
    );

  switch (current) {

    case 'TESTING':
      return 50;

    case 'PREPRODUCCION':
      return 75;

    case 'PRODUCCION':
      return 95;

    default:
      return 20;

  }

}

/**
 * Modelado
 */
function getModeladoProgress(task) {

  if (task.estado === 'PENDIENTE' || task.estado === 'BLOQUEADA')
    return 0;

  if (task.estado === 'FINALIZADA')
    return 100;

  const current =
    getCurrentEnvironment(
      task.deployments || []
    );

  switch (current) {

    case 'PREPRODUCCION':
      return 60;

    case 'PRODUCCION':
      return 90;

    default:
      return 25;

  }

}

/**
 * Indica si el avance
 * es automático.
 */
export function isAutomaticProgress(task) {

  return [

    'POWERCENTER',

    'MODELADO'

  ].includes(task?.tipo);

}