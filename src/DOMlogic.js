import {
  createTodo,
  ListOfProjects,
  defaultProject,
  createProject,
  deleteProject,
} from "./appLogic.js";

function attachCreateTodo() {
  const btn = document.getElementById("add-new-todo");
  btn.addEventListener("click", () => {
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

    displayTodos(defaultProject);
  });
}

function displayTodos(proj) {
  const todosContainers = document.querySelectorAll("[data-projectid]");

  todosContainers.forEach((element) => {
    if (element.getAttribute("data-projectid") === proj.id) {
      const todosContainer = element;
      todosContainer.textContent = "";
      proj.todoList.forEach((td) => {
        const todoContainer = document.createElement("div");
        todoContainer.classList.add("todo-container");

        const todoTitle = document.createElement("div");
        todoTitle.textContent = td.title;
        todoContainer.appendChild(todoTitle);

        const todoDueDate = document.createElement("div");
        todoDueDate.textContent = td.dueDate;
        todoContainer.appendChild(todoDueDate);

        todosContainer.appendChild(todoContainer);
      });
    }
  });
}

function displayProjects() {
  const projects = document.getElementById("projects");
  projects.textContent = "";
  ListOfProjects.forEach((proj) => {
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-container");
    const projectName = document.createElement("h3");
    projectName.textContent = proj.name;
    projectContainer.appendChild(projectName);

    if (proj.deletable === true) {
      const deleteprojectBtn = document.createElement("button");
      deleteprojectBtn.classList.add("delete-project");
      deleteprojectBtn.textContent = "X";
      projectContainer.appendChild(deleteprojectBtn);
      deleteprojectBtn.addEventListener("click", () => {
        deleteProject(proj, false);
        displayProjects();
      });
    }

    const todosContainer = document.createElement("div");
    todosContainer.classList.add("todos-container");
    todosContainer.setAttribute("data-projectid", proj.id);
    projectContainer.appendChild(todosContainer);

    projects.appendChild(projectContainer);

    displayTodos(proj);
  });
}

function attachCreateProject() {
  const btns = document.querySelectorAll(".add-new-project");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      createProject(document.getElementById("project-name").value);

      document.getElementById("project-name").value = "";

      displayProjects();
    });
  });
}

export { attachCreateTodo, displayProjects, displayTodos, attachCreateProject };
