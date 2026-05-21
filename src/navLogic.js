import { updateProjects } from "./DOMlogic.js";
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
}

export { makeNavBar };
