const EVENTS_KEY = "CALENDAR.events";

let events = JSON.parse(localStorage.getItem(EVENTS_KEY)) || [];

export function addEvent(event) {
  events.push(event);
  save();
}

function save() {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}
