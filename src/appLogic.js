class project {
  constructor(name, deletable, id, todoList) {
    this.name = name;
    this.deletable = deletable;
    this.id = id;
    this.todoList = todoList;
  }
  removeTodo(todoID) {
    const index = this.todoList.findIndex((item) => item.id === todoID);
    if (index > -1) {
      this.todoList.splice(index, 1);
    }
  }
  /* toJSON() {
    return {
      name: this.name,
    };
  } */
}

class todo {
  constructor(title, description, dueDate, priority, projid) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = self.crypto.randomUUID();
    this.projid = projid;
    this.done = false;
  }
  changeDone() {
    this.done = !this.done;
  }
}

let ListOfProjects = [];
let ListOfTodos = [];

function createProject(
  name,
  deletable = true,
  id = self.crypto.randomUUID(),
  todoList = [],
) {
  const newProject = new project(name, deletable, id, todoList);
  ListOfProjects.push(newProject);
  localStorage.setItem("ListOfProjects", JSON.stringify(ListOfProjects));
  return newProject;
}

const defaultProject = createProject("Inbox", false);

function createTodo(title, description, dueDate, priority, projid) {
  const newTodo = new todo(title, description, dueDate, priority, projid);
  ListOfTodos.push(newTodo);
  localStorage.setItem("ListOfTodos", JSON.stringify(ListOfTodos));
  const index = ListOfProjects.findIndex((item) => item.id === projid);
  console.log(ListOfProjects);
  if (index > -1) {
    ListOfProjects[index].todoList.push(newTodo);
    localStorage.setItem("ListOfProjects", JSON.stringify(ListOfProjects));
    console.log(ListOfProjects);
  }

  return newTodo;
}

function reassignProject(td, proj) {
  const index = ListOfProjects.findIndex((item) => item.id === td.projid);
  if (index > -1) {
    ListOfProjects[index].removeTodo(td.id);
  }

  td.projid = proj.id;
  proj.todoList.push(td);

  localStorage.setItem("ListOfProjects", JSON.stringify(ListOfProjects));
  localStorage.setItem("ListOfTodos", JSON.stringify(ListOfTodos));
}

function deleteTodo(td) {
  const index = ListOfProjects.findIndex((item) => item.id === td.projid);
  if (index > -1) {
    ListOfProjects[index].removeTodo(td.id);
    localStorage.setItem("ListOfProjects", JSON.stringify(ListOfProjects));
  }

  const index2 = ListOfTodos.indexOf(td);
  if (index2 > -1) {
    ListOfTodos.splice(index2, 1);
    localStorage.setItem("ListOfTodos", JSON.stringify(ListOfTodos));
  }
}

function deleteProject(proj, preserveTodos) {
  if (proj.deletable === true) {
    if (preserveTodos === true) {
      for (const td of proj.todoList) {
        reassignProject(td, defaultProject);
      }
    } else {
      for (const td of proj.todoList) {
        const index = ListOfTodos.indexOf(td);
        if (index > -1) {
          ListOfTodos.splice(index, 1);
        }
      }
    }
    const index2 = ListOfProjects.findIndex((item) => item.id === proj.id);
    if (index2 > -1) {
      ListOfProjects.splice(index2, 1);
    }
  }

  localStorage.setItem("ListOfProjects", JSON.stringify(ListOfProjects));
  localStorage.setItem("ListOfTodos", JSON.stringify(ListOfTodos));
}

function readStorage() {
  console.log(ListOfProjects);
  let projectsData = JSON.parse(localStorage.getItem("ListOfProjects")) || [];
  console.log(projectsData);
  ListOfProjects = projectsData.map(
    (projectItem) =>
      new project(
        projectItem.name,
        projectItem.deletable,
        projectItem.id,
        projectItem.todoList,
      ),
  );

  /*ListOfProjects = JSON.parse(localStorage.getItem("ListOfProjects"));*/
  console.log(ListOfProjects);
  let todoData = JSON.parse(localStorage.getItem("ListOfTodos")) || [];
  ListOfTodos = todoData.map((todoItem) => new todo(todoItem));
}

export {
  ListOfProjects,
  createProject,
  defaultProject,
  createTodo,
  reassignProject,
  deleteTodo,
  deleteProject,
  ListOfTodos,
  readStorage,
};
