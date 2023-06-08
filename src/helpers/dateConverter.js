import { format } from 'date-fns';
import { uk } from 'date-fns/esm/locale';

export const dateConverter = timestamp => {
  const date = new Date(timestamp.toDate());
  return format(Date.parse(date), 'dd MMMM, yyyy | HH:mm', { locale: uk });
};
