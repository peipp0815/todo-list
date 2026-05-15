import { createTodo, ListOfProjects } from "./appLogic.js";

function attachCreateTodo() {
  const btn = document.getElementById("add-new-todo");
  btn.addEventListener("click", (e) => {
    createTodo(
      document.getElementById("todo-title").value,
      document.getElementById("todo-description").value,
      document.getElementById("todo-dueDate").value,
      document.getElementById("todo-priority").value,
      "checklist",
    );

    document.getElementById("todo-title").value = "";
    document.getElementById("todo-description").value = "";
    document.getElementById("todo-dueDate").value = "";
    document.getElementById("todo-priority").value = "";
  });
}

function displayTodos(proj) {
  proj.todoList.forEach((td) => {});
}

function displayProjects() {
  ListOfProjects.forEach((proj) => {
    const projects = document.getElementById("projects");
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-container");
    const projectName = document.createElement("h3");
    projectName.textContent = proj.name;
    projectContainer.appendChild(projectName);
    projects.appendChild(projectContainer);
  });
}

export { attachCreateTodo, displayProjects };
