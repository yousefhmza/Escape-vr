import {TReservation} from './constants';

export const now: Date = new Date();
export const todayIso = new Date(
  now.getTime() - now.getTimezoneOffset() * 60000,
)
  .toISOString()
  .substring(0, 10);
export const endOfDay = new Date(todayIso + 'T25:59:59.999');
export const dateAfter7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

export const addMinutes = (date: Date, minutes: number): Date => {
  const newDate: Date = new Date(date.getTime() + minutes * 60000);
  return newDate;
};

export const getFirebaseDateFormat = (date: Date): string => {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

export const formatTime = (time: string): string => {
  if (time.length == 0) return '';
  const [hourString, minute] = time.split(':');
  const hour = +hourString % 24;
  return (hour % 12 || 12) + ':' + minute + (hour < 12 ? ' AM' : ' PM');
};

export const getTimeByMinutes = (time: string): number => {
  const [hourString, minute] = time.split(':');
  const minutes: number = +hourString * 60 + +minute;
  return minutes;
};

export const getTimeFromDate = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const isTimeAvailable = (
  time: string,
  reservations: TReservation[],
): boolean => {
  if (getTimeByMinutes(time) < getTimeByMinutes(getTimeFromDate(new Date())))
    return false;
  const reservationsByMinutes = reservations.map(res => ({
    from: getTimeByMinutes(res.from),
    to: getTimeByMinutes(res.to),
  }));
  const selectedTimeByMinutes = getTimeByMinutes(time);
  for (var res of reservationsByMinutes) {
    if (selectedTimeByMinutes >= res.from && selectedTimeByMinutes <= res.to) {
      return false;
    }
  }
  return true;
};

export const isPeriodAvailable = (
  selectedFrom: string,
  selectedTo: string,
  reservations: TReservation[],
): boolean => {
  const reservationsByMinutes = reservations.map(res => ({
    from: getTimeByMinutes(res.from),
    to: getTimeByMinutes(res.to),
  }));
  const selectedFromByMinutes = getTimeByMinutes(selectedFrom);
  const selectedToByMinutes = getTimeByMinutes(selectedTo);
  for (var res of reservationsByMinutes) {
    if (selectedFromByMinutes <= res.from && selectedToByMinutes >= res.to) {
      return false;
    }
  }
  return true;
};
