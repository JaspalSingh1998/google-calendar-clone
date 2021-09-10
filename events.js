import { isSameDay } from "date-fns";

const EVENTS_KEY = "CALENDAR.events";

let events = JSON.parse(localStorage.getItem(EVENTS_KEY)) || [];

export function addEvent(event) {
  events.push(event);
  save();
}

export function getEventsForDay(date) {
  return events
    .filter((event) => isSameDay(event.date, date))
    .sort(compareEvents);
}

function compareEvents(eventA, eventB) {
  if (eventA.isAllDay && eventB.isAllDay) {
    return 0;
  } else if (eventA.isAllDay) {
    return -1;
  } else if (eventB.isAllDay) {
    return 1;
  } else {
    return (
      eventTimeToNumber(eventA.startTime) - eventTimeToNumber(eventB.startTime)
    );
  }
}

function eventTimeToNumber(time) {
  parseFloat(time.replace(":", "."));
}

function save() {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}
