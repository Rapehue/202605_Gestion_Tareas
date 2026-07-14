// src/constants/taskTypes.js

export const TASK_TYPES = {

  DISENO: {

    value: 'DISENO',

    label: 'Diseño',

    deployment: false,

    deploymentFlow: null

  },

  MODELADO: {

    value: 'MODELADO',

    label: 'Modelado',

    deployment: true,

    deploymentFlow: 'MODELADO'

  },

  POWERCENTER: {

    value: 'POWERCENTER',

    label: 'PowerCenter',

    deployment: true,

    deploymentFlow: 'STANDARD'

  },

  CONTROLM: {

    value: 'CONTROLM',

    label: 'Control-M',

    deployment: false,

    deploymentFlow: null

  },

  DOCUMENTACION: {

    value: 'DOCUMENTACION',

    label: 'Documentación',

    deployment: false,

    deploymentFlow: null

  },

  SIMULACION: {

    value: 'SIMULACION',

    label: 'Simulación',

    deployment: false,

    deploymentFlow: null

  },

  OTROS: {

    value: 'OTROS',

    label: 'Otros',

    deployment: false,

    deploymentFlow: null

  }

};