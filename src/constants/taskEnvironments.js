export const TASK_ENVIRONMENTS = [

  {
    value: 'DESARROLLO',
    label: 'Desarrollo',
    icon: '💻',
    description: 'Entorno de desarrollo.',
    deployable: false,
    order: 0
  },

  {
    value: 'TESTING',
    label: 'Testing',
    icon: '🧪',
    description: 'Pruebas funcionales.',
    deployable: true,
    order: 1
  },

  {
    value: 'PREPRODUCCION',
    label: 'Preproducción',
    icon: '📦',
    description: 'Validación final.',
    deployable: true,
    order: 2
  },

  {
    value: 'PRODUCCION',
    label: 'Producción',
    icon: '🚀',
    description: 'Entorno productivo.',
    deployable: true,
    order: 3
  }

];