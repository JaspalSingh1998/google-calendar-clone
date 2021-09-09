import {
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
} from "date-fns";
import createDayElement from "./createDayElement";

const daysContainer = document.querySelector("[data-calendar-days]");

export default function renderMonth(monthDate) {
  const dayElements = getCalendarDates(monthDate).map((date, index) => {
    return createDayElement(date, {
      isCurrentMonth: isSameMonth(monthDate, date),
    });
  });
  daysContainer.innerHTML = "";
  dayElements.forEach((element) => daysContainer.append(element));
}

function getCalendarDates(date) {
  const firstWeekStart = startOfWeek(startOfMonth(date), { weekStartsOn: 1 });
  const endWeekStart = endOfWeek(endOfMonth(date), { weekStartsOn: 1 });
  return eachDayOfInterval({ start: firstWeekStart, end: endWeekStart });
}
