import { format, formatDistanceToNowStrict } from 'date-fns';
import local from 'date-fns/locale/ko';
// ----------------------------------------------------------------------

export function fDate(date: string) {
  return format(new Date(date), 'yyyy/MM/dd');
}

export function fDateTime(date: string) {
  return format(new Date(date), 'yyyy MM dd HH:mm');
}

export function fDateTimeSuffix(date: string) {
  return format(new Date(date), 'yyyy/MMM/dd p');
}

export function fToNow(date: string) {
  //// return formatDistanceToNow(new Date(date), { addSuffix: true, });
  return formatDistanceToNowStrict(new Date(date), {
    locale: local,
    addSuffix: true,
  });
}

export function fDateDash(date: string) {
  return format(new Date(date), 'yyyy-MM-dd');
}

export function fDateChange(date: string) {
  return String(new Date(date).getTime());
}
