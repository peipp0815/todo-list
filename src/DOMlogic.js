import {
  createTodo,
  ListOfProjects,
  defaultProject,
  createProject,
  deleteProject,
  reassignProject,
} from "./appLogic.js";

function attachCreateTodo() {
  const btn = document.getElementById("add-new-todo");
  btn.addEventListener("click", domCreateTodo);
}

function domCreateTodo() {
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
}

function populateEditTodo(td) {
  document.getElementById("todo-title").value = td.title;
  document.getElementById("todo-description").value = td.description;
  document.getElementById("todo-dueDate").value = td.dueDate;
  document.getElementById("todo-priority").value = td.priority;
  document.getElementById("todo-project").value = td.projid;
}

function editTodo() {
  const btn = document.getElementById("add-new-todo");
  const projid = btn.getAttribute("data-projid");
  const tdid = btn.getAttribute("data-tdid");
  const projIndex = ListOfProjects.findIndex((item) => item.id === projid);
  console.log("here");
  if (projIndex > -1) {
    console.log("fer");
    const proj = ListOfProjects[projIndex];
    const tdIndex = proj.todoList.findIndex((item) => item.id === tdid);
    if (tdIndex > -1) {
      const td = proj.todoList[tdIndex];
      console.log(td);
      td.title = document.getElementById("todo-title").value;
      td.description = document.getElementById("todo-description").value;
      td.dueDate = document.getElementById("todo-dueDate").value;
      td.priority = document.getElementById("todo-priority").value;
      if (projid !== document.getElementById("todo-project").value) {
        const newProjid = document.getElementById("todo-project").value;
        const newProjIndex = ListOfProjects.findIndex(
          (item) => item.id === newProjid,
        );
        if (newProjIndex > -1) {
          const newProj = ListOfProjects[newProjIndex];
          reassignProject(td, newProj);
          console.log(projid);
          console.log(newProjid);
          displayTodos(newProj);
          console.log(ListOfProjects);
        }
      }

      displayTodos(proj);
    }
  }

  document.getElementById("todo-title").value = "";
  document.getElementById("todo-description").value = "";
  document.getElementById("todo-dueDate").value = "";
  document.getElementById("todo-priority").value = "";
  document.getElementById("todo-project").value = defaultProject.id;
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
        todoTitle.setAttribute("commandfor", "new-todo");
        todoTitle.addEventListener("click", () => {
          populateEditTodo(td);
          const btn = document.getElementById("add-new-todo");
          btn.textContent = "Save changes";
          btn.removeEventListener("click", domCreateTodo);
          btn.addEventListener("click", editTodo);
          btn.setAttribute("data-tdid", td.id);
          btn.setAttribute("data-projid", td.projid);
        });
        todoContainer.appendChild(todoTitle);

        const todoDueDate = document.createElement("button");
        todoDueDate.textContent = td.dueDate;
        todoDueDate.classList.add("todo-dueDate-in-project");
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

function switchEditToNewTodo() {
  const btn = document.getElementById("new-todo-btn");
  btn.addEventListener("click", () => {
    const btn2 = document.getElementById("add-new-todo");
    btn2.removeEventListener("click", editTodo);
    btn2.addEventListener("click", domCreateTodo);
  });
}

export {
  attachCreateTodo,
  displayProjects,
  displayTodos,
  attachCreateProject,
  dropdownListProjects,
  switchEditToNewTodo,
};
