import { format } from "date-fns";
import { v4 as uuidV4 } from "uuid";

const modal = document.querySelector("[data-modal]");
const modalBody = document.querySelector("[data-modal-body]");

const eventModalTemplate = document.getElementById("event-form-template");

export function openAddEventModal(date) {
  const formModalBody = eventModalTemplate.content.cloneNode(true);
  openModal(getEventFormModalBody({ date }, (event) => console.log(event)));
}

export function openEditEventModal(event) {
  const formModalBody = eventModalTemplate.content.cloneNode(true);
  openModal(getEventFormModalBody(event));
}

function getEventFormModalBody(event, saveCallback, deleteCallback) {
  const formModalBody = eventModalTemplate.content.cloneNode(true);

  const isNewEvent = event.id == null;
  formModalBody.querySelector("[data-title]").textContent = isNewEvent
    ? "Add Event"
    : "Edit Event";

  formModalBody.querySelector("[data-date]").textContent = format(
    event.date,
    "M/d/yyyy"
  );

  const form = formModalBody.querySelector("[data-form]");
  form.querySelector("[data-save-btn]").textContent = isNewEvent
    ? "Add"
    : "Update";

  const deleteButton = form.querySelector("[data-delete-btn]");

  if (isNewEvent) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => {
      deleteCallback(event);
      closeModal();
    });
  }

  const nameInput = form.querySelector("[data-name]");
  nameInput.value = event.name || "";

  const startTimeInput = form.querySelector("[data-start-time]");
  const endTimeInput = form.querySelector("[data-end-time]");
  startTimeInput.value = event.startTime;
  endTimeInput.value = event.endTime;

  const allDayCheckbox = form.querySelector("[data-all-day]");
  allDayCheckbox.checked = event.isAllDay;
  startTimeInput.disabled = allDayCheckbox.checked;
  endTimeInput.disabled = allDayCheckbox.checked;

  allDayCheckbox.addEventListener("change", () => {
    startTimeInput.disabled = allDayCheckbox.checked;
    endTimeInput.disabled = allDayCheckbox.checked;
  });

  startTimeInput.addEventListener("change", () => {
    endTimeInput.min = startTimeInput.value;
  });

  const colorRadio = form.querySelector(`[data-color][value="${event.color}"]`);

  if (colorRadio) colorRadio.checked = true;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isAllDay = allDayCheckbox.checked;

    saveCallback({
      id: event.id || uuidV4(),
      name: nameInput.value,
      date: event.date,
      isAllDay,
      startTime: isAllDay ? undefined : startTimeInput.value,
      endTime: isAllDay ? undefined : endTimeInput.value,
      color: form.querySelector("[data-color]:checked").value,
    });

    closeModal();
  });

  return formModalBody;
}

function openModal(bodyContents) {
  modalBody.innerHTML = "";
  modalBody.appendChild(bodyContents);
  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
}
