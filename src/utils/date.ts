import moment from 'moment';

export const durationDate = (startDateMilliseconds: number, endDateMilliseconds: number) => {
  const startDate = moment(startDateMilliseconds);
  const endDate = moment(endDateMilliseconds);
  return endDate.diff(startDate);
};

export const durationDateString = (startDateMilliseconds: number, endDateMilliseconds: number) => {
  const duration = durationDate(startDateMilliseconds, endDateMilliseconds);
  const days = Math.floor(moment.duration(duration).asDays());
  const hourse = Math.floor(moment.duration(duration).asHours()) - 24 * days;
  return `${days}д ${hourse}ч`;
};

export const dateString = (dateMilliseconds: number) =>
  moment(dateMilliseconds).format('DD.MM.YYYY hh:mm');
