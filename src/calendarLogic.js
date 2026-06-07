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
    let btn = document.createElement("button");
    btn.textContent += "";
    days.appendChild(btn);
  }

  for (let i = 1; i <= numberOfDays; i++) {
    let btn = document.createElement("button");
    let currentDate = new Date(getYear(date), getMonth(date), i);
    btn.dataset.date = formatISO(currentDate, { representation: "date" });
    btn.textContent += i;
    days.appendChild(btn);

    if (
      currentDate.getFullYear() === new Date().getFullYear() &&
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getDate() === new Date().getDate()
    ) {
      btn.classList.add("current-date");
    }
    const ListOfTodaysTodos = [];
    let todoDueOnThisDay = false;
    ListOfTodos.forEach((todo) => {
      if (btn.dataset.date === todo.dueDate) {
        btn.classList.add("todo-due-on-this-day");
        ListOfTodaysTodos.push(todo);
        console.log(ListOfTodaysTodos);
        todoDueOnThisDay = true;
      }
    });
    if (todoDueOnThisDay === true) {
      btn.addEventListener("click", () => {
        btn.setAttribute("command", "show-modal");
        btn.setAttribute("commandfor", "calendar-todo-list");
        displayTodosInCalendar(ListOfTodaysTodos);
      });
    } else {
      btn.classList.remove("todo-due-on-this-day");
    }
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

function displayTodosInCalendar(list) {
  console.log(list);
  const container = document.getElementById("calendar-todos-container");
  container.textContent = "";
  list.forEach((todo) => {
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("calendar-todo-container");
    const selectedKeys = [
      "title",
      "description",
      "dueDate",
      "priority",
      "done",
    ];

    for (const key in todo) {
      if (selectedKeys.includes(key)) {
        const propContainer = document.createElement("div");
        propContainer.textContent = `${capitalizeFirstLetter(key)}: ${todo[key]}`;
        todoContainer.appendChild(propContainer);
      }
    }
    container.appendChild(todoContainer);
  });
}

function resetDate() {
  date = new Date();
}

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export { displayCalendar, CalendarNav, resetDate };
