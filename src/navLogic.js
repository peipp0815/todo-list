import { displayCalendar, CalendarNav } from "./calendarLogic.js";
import { updateProjects } from "./DOMlogic.js";
import calendarContent from "./pages/calendar.js";
import homeContent from "./pages/home.js";
import projectContent from "./pages/projects.js";

function makeNavBar() {
  const projBtns = document.getElementById("nav-projects").childNodes;
  projBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      projectContent(btn.dataset.projectid);
      updateProjects();
    });
  });

  const homeBtn = document.getElementById("nav-home");
  homeBtn.addEventListener("click", () => {
    homeContent();
    updateProjects();
  });

  document.getElementById("nav-calendar").addEventListener("click", () => {
    calendarContent();
    displayCalendar();
    CalendarNav();
  });
}

export { makeNavBar };
