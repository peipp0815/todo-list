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
    const projid = document.getElementById("todo-project").value;
    console.log(projid);
    createTodo(
      document.getElementById("todo-title").value,
      document.getElementById("todo-description").value,
      document.getElementById("todo-dueDate").value,
      document.getElementById("todo-priority").value,
      "checklist",
      projid,
    );

    document.getElementById("todo-title").value = "";
    document.getElementById("todo-description").value = "";
    document.getElementById("todo-dueDate").value = "";
    document.getElementById("todo-priority").value = "";
    document.getElementById("todo-project").value = defaultProject.id;
    console.log(ListOfProjects);
    const index = ListOfProjects.findIndex((item) => item.id === projid);
    if (index > -1) {
      displayTodos(ListOfProjects[index]);
    }
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

        const checkDone = document.createElement("input");
        checkDone.setAttribute("type", "checkbox");
        checkDone.classList.add("check-done");
        checkDone.addEventListener("click", () => {
          td.changeDone();
          console.log(td);
          if (td.done === true) {
            todoContainer.style.textDecoration = "line-through";
            checkDone.checked = true;
            console.log(td.done);
          } else {
            todoContainer.style.textDecoration = "none";
            checkDone.checked = false;
            console.log(td.done);
          }
        });
        todoContainer.appendChild(checkDone);

        const todoTitle = document.createElement("button");
        todoTitle.textContent = td.title;
        todoTitle.setAttribute("command", "show-modal");
        todoTitle.setAttribute("commandfor", "see-todo");
        todoTitle.addEventListener("click", () => {
          populateSeeTodo(td);
        });
        todoContainer.appendChild(todoTitle);

        const todoDueDate = document.createElement("div");
        todoDueDate.textContent = td.dueDate;
        todoContainer.appendChild(todoDueDate);

        todosContainer.appendChild(todoContainer);

        if (td.done === true) {
          todoContainer.style.textDecoration = "line-through";
          checkDone.checked = true;
          console.log(td.done);
        } else {
          todoContainer.style.textDecoration = "none";
          checkDone.checked = false;
          console.log(td.done);
        }
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
      addProjectsToDropDownList();
    });
  });
}

function dropdownListProjects() {
  console.log("dropdown baby");
  const newTodoForm = document.getElementById("new-todo-form");
  //Create and append select list
  const selectList = document.createElement("select");
  selectList.id = "todo-project";
  newTodoForm.prepend(selectList);

  const label = document.createElement("label");
  label.setAttribute("for", "todo-project");
  label.textContent = "Project";
  newTodoForm.prepend(label);

  //Create and append the options
  for (let i = 0; i < ListOfProjects.length; i++) {
    const option = document.createElement("option");
    option.value = ListOfProjects[i].id;
    option.text = ListOfProjects[i].name;
    selectList.appendChild(option);
  }
}

function addProjectsToDropDownList() {
  const selectList = document.getElementById("todo-project");
  selectList.textContent = "";
  for (let i = 0; i < ListOfProjects.length; i++) {
    const option = document.createElement("option");
    option.value = ListOfProjects[i].id;
    option.text = ListOfProjects[i].name;
    selectList.appendChild(option);
  }
}

function populateSeeTodo(td) {
  document.getElementById("see-todo-title").textContent = td.title;
  document.getElementById("see-todo-description").textContent = td.description;
  document.getElementById("see-todo-dueDate").textContent = td.dueDate;
  document.getElementById("see-todo-priority").textContent = td.priority;
  document.getElementById("see-todo-project").textContent = td.project;
}

export {
  attachCreateTodo,
  displayProjects,
  displayTodos,
  attachCreateProject,
  dropdownListProjects,
};
