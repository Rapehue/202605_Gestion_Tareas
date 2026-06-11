export const toNumber = (v) => Number(v) || 0;

export const formatCurrency = (
  value
) => {

  return Number(value || 0)
    .toLocaleString(
      'es-ES',
      {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }
    );

};