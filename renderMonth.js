import { startOfMonth } from "date-fns";

export function renderMonth(monthDate) {
  getCalendarDates(monthDate);
}

function getCalendarDates(date) {
  const firstWeekStart = startOfMonth(date);
  console.log(firstWeekStart);
}
