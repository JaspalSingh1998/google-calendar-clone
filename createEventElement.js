export default function createEventElement(event) {
  return event.isAllDay
    ? createAllDayEventElement(event)
    : createTimedEventElement(event);
}

const allDayEventTemplate = document.getElementById("all-day-event-template");

function createAllDayEventElement(event) {
  const element = allDayEventTemplate.content
    .cloneNode(true)
    .querySelector("[data-event]");

  element.classList.add(event.color);
  element.querySelector("[data-name]").textContent = event.name;
  return element;
}

function createTimedEventElement(event) {}
