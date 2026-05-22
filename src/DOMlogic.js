import {
  createTodo,
  ListOfProjects,
  defaultProject,
  createProject,
  deleteProject,
  reassignProject,
  deleteTodo,
} from "./appLogic.js";
import { makeNavBar } from "./navLogic.js";

function domCreateTodo() {
  const projid = document.getElementById("todo-project").value;
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

  if (projIndex > -1) {
    const proj = ListOfProjects[projIndex];
    const tdIndex = proj.todoList.findIndex((item) => item.id === tdid);
    if (tdIndex > -1) {
      const td = proj.todoList[tdIndex];

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
          displayTodos(newProj);
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
  const todosContainers = document.querySelectorAll(
    "[data-projectid].todos-container",
  );

  todosContainers.forEach((element) => {
    if (element.getAttribute("data-projectid") === proj.id) {
      const todosContainer = element;
      todosContainer.textContent = "";
      proj.todoList.forEach((td) => {
        const todoContainer = document.createElement("div");
        todoContainer.classList.add("todo-container");
        //create checkmark
        const checkDone = document.createElement("input");
        checkDone.setAttribute("type", "checkbox");
        checkDone.classList.add("check-done");
        checkDone.addEventListener("click", () => {
          td.changeDone();

          if (td.done === true) {
            todoContainer.style.textDecoration = "line-through";
            checkDone.checked = true;
          } else {
            todoContainer.style.textDecoration = "none";
            checkDone.checked = false;
          }
        });
        todoContainer.appendChild(checkDone);
        //create todo title as a button to edit the todo
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
        //assign data-priority to change left border color based on priority
        if (td.priority === "p1") {
          todoContainer.dataset.priority = "p1";
        } else if (td.priority === "p2") {
          todoContainer.dataset.priority = "p2";
        } else if (td.priority === "p3") {
          todoContainer.dataset.priority = "p3";
        } else {
          todoContainer.dataset.priority = "";
        }
        //create todo due date as a button just for aesthetics
        const todoDueDate = document.createElement("button");
        todoDueDate.textContent = td.dueDate;
        todoDueDate.classList.add("todo-dueDate-in-project");
        todoContainer.appendChild(todoDueDate);

        todosContainer.appendChild(todoContainer);
        //check if todo is done
        if (td.done === true) {
          todoContainer.style.textDecoration = "line-through";
          checkDone.checked = true;
        } else {
          todoContainer.style.textDecoration = "none";
          checkDone.checked = false;
        }
        //add a delete button
        const deleteTodoBtn = document.createElement("button");
        deleteTodoBtn.classList.add("delete-todo");
        deleteTodoBtn.textContent = "X";
        todoContainer.appendChild(deleteTodoBtn);
        deleteTodoBtn.addEventListener("click", () => {
          deleteTodo(td);
          displayTodos(proj);
        });
      });
    }
  });
}

function displayProjects() {
  const projects = document.getElementById("projects");
  if (projects !== null) {
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
          updateProjects();
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
}

function attachCreateProject() {
  const btns = document.querySelectorAll(".add-new-project");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      createProject(document.getElementById("project-name").value);

      document.getElementById("project-name").value = "";
      console.log("herre");
      updateProjects();
    });
  });
}

function dropdownListProjects() {
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

function addProjectsToNavBar() {
  const navBarProjects = document.getElementById("nav-projects");
  navBarProjects.textContent = "";
  for (let i = 0; i < ListOfProjects.length; i++) {
    const button = document.createElement("button");
    button.dataset.projectid = ListOfProjects[i].id;
    console.log(ListOfProjects[i].name);
    button.textContent = ListOfProjects[i].name;
    console.log(button.textContent);
    navBarProjects.appendChild(button);
  }
}

function switchEditToNewTodo() {
  const btn = document.getElementById("new-todo-btn");
  btn.addEventListener("click", () => {
    const btn2 = document.getElementById("add-new-todo");
    btn2.textContent = "Add Todo";
    btn2.removeEventListener("click", editTodo);
    btn2.addEventListener("click", domCreateTodo);
  });
}

function updateProjects() {
  addProjectsToNavBar();
  addProjectsToDropDownList();
  displayProjects();
  makeNavBar();
}

function clearDialogsOnClose() {
  document.getElementById("new-todo").addEventListener("close", (event) => {
    document.getElementById("new-todo-form").reset();
  });
  document.getElementById("new-project").addEventListener("close", (event) => {
    document.getElementById("new-project-form").reset();
  });
}

export {
  displayProjects,
  displayTodos,
  attachCreateProject,
  dropdownListProjects,
  switchEditToNewTodo,
  addProjectsToNavBar,
  updateProjects,
  clearDialogsOnClose,
};
