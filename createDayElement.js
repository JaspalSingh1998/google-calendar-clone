const dayTemplate = document.getElementById("day-template");
export default function createDayElement(date, options = {}) {
  const { isCurrentMonth = true } = options;
  const dayElement = dayTemplate.content
    .cloneNode(true)
    .querySelector("[data-day-wrapper]");

  if (!isCurrentMonth) {
    dayElement.classList.add("non-month-day");
  }

  const dayNumberElement = dayElement.querySelector("[data-day-number]");
  dayNumberElement.textContent = date.getDate();

  return dayElement;
}
