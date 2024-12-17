import { format, add } from 'date-fns';
import { DATE_FORMAT } from '../constants';

export const formatDate = (date: Date | string, dateFormat?: string) =>
  format(date, dateFormat || DATE_FORMAT);
export const getToday = () => format(new Date(), DATE_FORMAT);
export const getTomorrow = () =>
  format(add(new Date(), { days: 1 }), DATE_FORMAT);
export const getProgressiveDates = (days: number): string[] =>
  Array.from({ length: days }, (_, i) =>
    format(add(new Date(), { days: i }), DATE_FORMAT)
  );
