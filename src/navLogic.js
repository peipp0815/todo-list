import { displayCalendar, CalendarNav, resetDate } from "./calendarLogic.js";
import { updateProjects } from "./DOMlogic.js";
import calendarContent from "./pages/calendar.js";
import homeContent from "./pages/home.js";
import projectContent from "./pages/projects.js";
import { switchEditToNewTodo } from "./DOMlogic.js";

function makeNavBar() {
  const homeBtn = document.getElementById("nav-home");
  homeBtn.addEventListener("click", () => {
    homeContent();
    updateProjects();
  });

  document.getElementById("nav-calendar").addEventListener("click", () => {
    resetDate();
    calendarContent();
    displayCalendar();
    CalendarNav();
    updateProjects();
    switchEditToNewTodo();
  });
}

function projectsInNavBar() {
  const projBtns = document.getElementById("nav-projects").childNodes;
  projBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      projectContent(btn.dataset.projectid);
      updateProjects();
      switchEditToNewTodo();
    });
  });
}

export { makeNavBar, projectsInNavBar };
