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

export function korDate() {
  const curr = new Date();

  // 2. UTC 시간 계산
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;

  // 3. UTC to KST (UTC + 9시간)
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const kr_curr = new Date(utc + KR_TIME_DIFF + KR_TIME_DIFF);
  return kr_curr;
}
