import { format, differenceInMinutes, differenceInDays } from 'date-fns';

export default function timeString(date) {
  const today = new Date();
  const dateAt = new Date(date);
  const minDiff = differenceInMinutes(today, dateAt);
  today.setHours(23);
  dateAt.setHours(0);
  const dayDiff = differenceInDays(today, dateAt);

  let dateString = format(dateAt, 'yyyy. MM. dd');
  if (dateAt.getFullYear() === today.getFullYear()) {
    if (dayDiff === 1) {
      dateString = '어제';
    } else if (dayDiff < 1) {
      if (minDiff < 60) {
        dateString = `${minDiff}분전`;
      } else if (minDiff < 60 * 24) {
        dateString = `${Math.floor(minDiff / 60)}시간전`;
      }
    } else {
      dateString = format(dateAt, 'MM. dd');
    }
  }
  return dateString;
}
