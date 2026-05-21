import { ListOfProjects } from "../appLogic.js";

function projectContent(projid) {
  const projIndex = ListOfProjects.findIndex((item) => item.id === projid);

  if (projIndex > -1) {
    const proj = ListOfProjects[projIndex];

    const mainContent = document.getElementById("main-content");
    mainContent.textContent = "";

    const h1 = document.createElement("h1");
    h1.textContent = proj.name;
    mainContent.appendChild(h1);

    const buttons = document.createElement("div");
    buttons.setAttribute("id", "buttons");

    const newTodoButton = document.createElement("button");
    newTodoButton.textContent = "New Todo";
    newTodoButton.setAttribute("command", "show-modal");
    newTodoButton.setAttribute("commandfor", "new-todo");
    newTodoButton.setAttribute("id", "new-todo-btn");
    buttons.appendChild(newTodoButton);

    const todosContainer = document.createElement("div");
    todosContainer.classList.add("todos-container");
    todosContainer.setAttribute("data-projectid", proj.id);
    mainContent.appendChild(todosContainer);

    displayTodos(proj);
  }
}

export default projectContent;
