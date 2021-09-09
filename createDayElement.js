const dayTemplate = document.getElementById("day-template");
export default function createDayElement(date) {
  const dayElement = dayTemplate.content
    .cloneNode(true)
    .querySelector("[data-day-wrapper]");

  const dayNumberElement = dayElement.querySelector("[data-day-number]");
  dayNumberElement.textContent = date.getDate();

  return dayElement;
}
