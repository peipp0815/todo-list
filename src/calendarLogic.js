import {
  getMonth,
  getYear,
  getDaysInMonth,
  lastDayOfMonth,
  startOfMonth,
  subMonths,
  addMonths,
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
    div.dataset.date = currentDate.toDateString();
    div.textContent += i;
    days.appendChild(div);

    if (
      currentDate.getFullYear() === new Date().getFullYear() &&
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getDate() === new Date().getDate()
    ) {
      div.classList.add("current-date");
    }
  }
}

function CalendarNav() {
  const days = document.getElementById("calendar-dates");
  const previous = document.getElementById("calendar-previous");
  const next = document.getElementById("calendar-next");

  document.addEventListener(
    "click",
    function (event) {
      if (!event.target.closest("#calendar-previous")) return;
      console.log(event.target);
      days.textContent = "";
      date = subMonths(date, 1);
      displayCalendar();
    },
    false,
  );

  document.addEventListener(
    "click",
    function (event) {
      if (!event.target.closest("#calendar-next")) return;
      console.log(event.target);
      days.textContent = "";
      date = addMonths(date, 1);
      displayCalendar();
    },
    false,
  );
}

function displayTodosInCalendar() {}

export { displayCalendar, CalendarNav };
