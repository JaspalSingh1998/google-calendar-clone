import {
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";

export default function renderMonth(monthDate) {
  getCalendarDates(monthDate);
}

function getCalendarDates(date) {
  const firstWeekStart = startOfWeek(startOfMonth(date), { weekStartsOn: 1 });
  const endWeekStart = endOfWeek(endOfMonth(date), { weekStartsOn: 1 });
  const dates = eachDayOfInterval({ start: firstWeekStart, end: endWeekStart });
  console.log(firstWeekStart);
  console.log(endWeekStart);
  console.log(dates);
}
