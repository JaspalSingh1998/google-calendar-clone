import { format } from "date-fns";
import { addEvent } from "./events";
import { openAddEventModal } from "./modal";

const dayTemplate = document.getElementById("day-template");
export default function createDayElement(date, options = {}) {
  const {
    isCurrentMonth = true,
    isCurrentDay = false,
    showWeekName = false,
  } = options;
  const dayElement = dayTemplate.content
    .cloneNode(true)
    .querySelector("[data-day-wrapper]");

  if (!isCurrentMonth) {
    dayElement.classList.add("non-month-day");
  }

  if (showWeekName) {
    dayElement.querySelector("[data-week-name]").textContent = format(
      date,
      "E"
    );
  }

  dayElement
    .querySelector("[data-add-event-btn]")
    .addEventListener("click", () => {
      openAddEventModal(date, (event) => {
        addEvent(event);
      });
    });

  const dayNumberElement = dayElement.querySelector("[data-day-number]");
  dayNumberElement.textContent = date.getDate();

  if (isCurrentDay) {
    dayNumberElement.classList.add("active");
  }

  return dayElement;
}
