function calendarContent() {
  const mainContent = document.getElementById("main-content");
  mainContent.textContent = "";

  const h1 = document.createElement("h1");
  h1.textContent = "Calendar";
  mainContent.appendChild(h1);

  const buttons = document.createElement("div");
  buttons.setAttribute("id", "buttons");

  const newTodoButton = document.createElement("button");
  newTodoButton.textContent = "New Todo";
  newTodoButton.setAttribute("command", "show-modal");
  newTodoButton.setAttribute("commandfor", "new-todo");
  newTodoButton.setAttribute("id", "new-todo-btn");
  buttons.appendChild(newTodoButton);
  mainContent.appendChild(buttons);

  const month = document.createElement("div");
  month.setAttribute("id", "month");
  mainContent.appendChild(month);

  const monthHeader = document.createElement("div");
  monthHeader.id = "month-header";
  month.appendChild(monthHeader);

  const currentDate = document.createElement("span");
  currentDate.id = "current-date";
  monthHeader.appendChild(currentDate);

  const nav = document.createElement("span");
  nav.id = "calendar-navigation";
  monthHeader.appendChild(nav);

  const left = document.createElement("span");
  left.classList.add("iconify");
  left.dataset.icon = "mdi-arrow-left-drop-circle";
  nav.appendChild(left);

  const right = document.createElement("span");
  right.classList.add("iconify");
  right.dataset.icon = "mdi-arrow-right-drop-circle";
  nav.appendChild(right);

  const monthBody = document.createElement("div");
  month.appendChild(monthBody);

  const weekdays = document.createElement("div");
  weekdays.id = "calendar-weekdays";
  monthBody.appendChild(weekdays);

  const mon = document.createElement("div");
  mon.textContent = "MON";
  weekdays.appendChild(mon);

  const tue = document.createElement("div");
  tue.textContent = "TUE";
  weekdays.appendChild(tue);

  const wed = document.createElement("div");
  wed.textContent = "WED";
  weekdays.appendChild(wed);

  const thu = document.createElement("div");
  thu.textContent = "THU";
  weekdays.appendChild(thu);

  const fri = document.createElement("div");
  fri.textContent = "FRI";
  weekdays.appendChild(fri);

  const sat = document.createElement("div");
  sat.textContent = "SAT";
  weekdays.appendChild(sat);

  const sun = document.createElement("div");
  sun.textContent = "SUN";
  weekdays.appendChild(sun);

  const dates = document.createElement("div");
  dates.id = "calendar-dates";
  monthBody.appendChild(dates);
}

export default calendarContent;
