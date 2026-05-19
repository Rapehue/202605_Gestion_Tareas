export const getEstadoVariant = (
  estado
) => {

  switch (estado) {

    case 'Activo':
      return 'success';

    case 'En Curso':
      return 'info';

    case 'Solicitado VB':
      return 'warning';

    case 'Cancelado':
      return 'danger';

    default:
      return 'neutral';
  }

};