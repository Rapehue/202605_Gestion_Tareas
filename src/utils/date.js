export const formatDate = (date) => {

  if (!date) return '--';

  const [year, month, day] =
    date.split('-');

  return `${day}/${month}/${year}`;

};

export const formatDateTime = (datetime) => {

  if (!datetime) return '--';

  const [date, time] =
    datetime.split('T');

  const [year, month, day] =
    date.split('-');

  const [hms, milisecond] =
    time.split('.');

  return `${day}/${month}/${year} ${hms}`;

};

export const calculateWorkingDays = (
  startDate,
  endDate
) => {

  if (!startDate || !endDate)
    return 0;

  const start =
    new Date(startDate);

  const end =
    new Date(endDate);

  let count = 0;

  const current =
    new Date(start);

  while (current <= end) {

    const day =
      current.getDay();

    if (
      day !== 0 &&
      day !== 6
    ) {
      count++;
    }

    current.setDate(
      current.getDate() + 1
    );

  }

  return count;

};