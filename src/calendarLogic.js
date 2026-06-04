import {
  getMonth,
  getYear,
  getDaysInMonth,
  lastDayOfMonth,
  startOfMonth,
  subMonths,
  addMonths,
  formatISO,
} from "date-fns";
import { ListOfTodos } from "./appLogic.js";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();

function displayCalendar() {
  const currentMonthName = document.getElementById("current-date");
  currentMonthName.textContent = `${months[getMonth(date)]} ${getYear(date)}`;

  const firstDay = startOfMonth(date);
  const firstDayIndex = firstDay.getDay() ? firstDay.getDay() : 7;
  const lastDay = lastDayOfMonth(date);
  const numberOfDays = getDaysInMonth(date);
  const days = document.getElementById("calendar-dates");

  for (let x = 1; x < firstDayIndex; x++) {
    let div = document.createElement("div");
    div.textContent += "";
    days.appendChild(div);
  }

  for (let i = 1; i <= numberOfDays; i++) {
    let div = document.createElement("div");
    let currentDate = new Date(getYear(date), getMonth(date), i);
    div.dataset.date = formatISO(currentDate, { representation: "date" });
    div.textContent += i;
    days.appendChild(div);

    if (
      currentDate.getFullYear() === new Date().getFullYear() &&
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getDate() === new Date().getDate()
    ) {
      div.classList.add("current-date");
    }

    ListOfTodos.forEach((todo) => {
      if (div.dataset.date === todo.dueDate) {
        div.classList.add("todo-due-on-this-day");
      }
    });
  }
}

function CalendarNav() {
  const previous = document.querySelector("#calendar-previous");
  const next = document.querySelector("#calendar-next");

  previous.addEventListener("click", goBackOneMonth);
  next.addEventListener("click", goForthOneMonth);
}

function goBackOneMonth() {
  const days = document.getElementById("calendar-dates");
  days.textContent = "";
  date = subMonths(date, 1);
  displayCalendar();
  console.log("prev");
}

function goForthOneMonth() {
  const days = document.getElementById("calendar-dates");
  days.textContent = "";
  date = addMonths(date, 1);
  displayCalendar();
  console.log("next");
}

function displayTodosInCalendar(date) {}

function resetDate() {
  date = new Date();
}

export { displayCalendar, CalendarNav, resetDate };
