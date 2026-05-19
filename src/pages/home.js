import { displayProjects } from "../DOMlogic.js";

function homeContent() {
  const mainContent = document.getElementById("main-content");
  mainContent.textContent = "";

  const h1 = document.createElement("h1");
  h1.textContent = "Home";
  mainContent.appendChild(h1);

  const buttons = document.createElement("div");
  buttons.setAttribute("id", "buttons");

  const newTodoButton = document.createElement("button");
  newTodoButton.textContent = "New Todo";
  newTodoButton.setAttribute("command", "show-modal");
  newTodoButton.setAttribute("commandfor", "new-todo");
  newTodoButton.setAttribute("id", "new-todo-btn");
  buttons.appendChild(newTodoButton);

  const newProjectButton = document.createElement("button");
  newProjectButton.textContent = "New Project";
  newProjectButton.setAttribute("command", "show-modal");
  newProjectButton.setAttribute("commandfor", "new-project");
  buttons.appendChild(newProjectButton);

  mainContent.appendChild(buttons);

  const projects = document.createElement("div");
  projects.setAttribute("id", "projects");
  mainContent.appendChild(projects);

  displayProjects();
}

export default homeContent;
