import { format } from "date-fns";
import createEventElement from "./createEventElement";
import { addEvent, getEventsForDay } from "./events";
import { openAddEventModal } from "./modal";
import renderMonth from "./renderMonth";

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
        renderMonth(date);
      });
    });

  const dayNumberElement = dayElement.querySelector("[data-day-number]");
  dayNumberElement.textContent = date.getDate();

  if (isCurrentDay) {
    dayNumberElement.classList.add("active");
  }

  const eventContainer = dayElement.querySelector("[data-event-container]");
  eventContainer.innerHTML = "";
  getEventsForDay(date).forEach((event) => {
    eventContainer.append(createEventElement(event));
  });

  return dayElement;
}
