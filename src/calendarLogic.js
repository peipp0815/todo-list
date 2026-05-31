import {
  getMonth,
  getYear,
  getDaysInMonth,
  lastDayOfMonth,
  startOfMonth,
} from "date-fns";

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

function displayCalendarHeader() {
  const currentMonthName = document.getElementById("current-date");
  currentMonthName.textContent = `${months[getMonth(date)]} ${getYear(date)}`;
}

function displayCalendar() {
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

export { displayCalendarHeader, displayCalendar };
