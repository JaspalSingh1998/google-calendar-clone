import { subMonths } from "date-fns";
import { addMonths } from "date-fns/esm";
import renderMonth from "./renderMonth.js";

let selectedMonth = Date.now();

document
  .querySelector("[data-next-month-btn]")
  .addEventListener("click", (e) => {
    selectedMonth = addMonths(selectedMonth, 1);
    renderMonth(selectedMonth);
  });

document
  .querySelector("[data-prev-month-btn]")
  .addEventListener("click", (e) => {
    selectedMonth = subMonths(selectedMonth, 1);
    renderMonth(selectedMonth);
  });

document.querySelector("[data-today-btn]").addEventListener("click", (e) => {
  selectedMonth = Date.now();
  renderMonth(selectedMonth);
});

renderMonth(selectedMonth);
