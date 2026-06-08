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
    updateStorage();
  }
}

class todo {
  constructor(title, description, dueDate, priority, projid, id, done) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.projid = projid;
    this.id = id;
    this.done = done;
  }
  changeDone() {
    this.done = !this.done;
    updateStorage();
  }
}

let ListOfProjects = [];
console.log(ListOfProjects);
let ListOfTodos = [];

readStorage();
let defaultProject;
if (ListOfProjects === []) {
  defaultProject = createProject("Inbox", false);
} else {
  defaultProject = ListOfProjects[0];
}

function createProject(
  name,
  deletable = true,
  id = self.crypto.randomUUID(),
  todoList = [],
) {
  const newProject = new project(name, deletable, id, todoList);
  ListOfProjects.push(newProject);
  updateStorage();
  return newProject;
}

function createTodo(
  title,
  description,
  dueDate,
  priority,
  projid,
  id = self.crypto.randomUUID(),
  done = false,
) {
  const newTodo = new todo(
    title,
    description,
    dueDate,
    priority,
    projid,
    id,
    done,
  );
  ListOfTodos.push(newTodo);

  const index = ListOfProjects.findIndex((item) => item.id === projid);

  if (index > -1) {
    ListOfProjects[index].todoList.push(newTodo);
  }
  updateStorage();
  return newTodo;
}

function reassignProject(td, proj) {
  const index = ListOfProjects.findIndex((item) => item.id === td.projid);
  if (index > -1) {
    ListOfProjects[index].removeTodo(td.id);
  }

  td.projid = proj.id;
  proj.todoList.push(td);
  updateStorage();
}

function deleteTodo(td) {
  const index = ListOfProjects.findIndex((item) => item.id === td.projid);
  if (index > -1) {
    ListOfProjects[index].removeTodo(td.id);
  }

  const index2 = ListOfTodos.indexOf(td);
  if (index2 > -1) {
    ListOfTodos.splice(index2, 1);
  }
  updateStorage();
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

  updateStorage();
}

function readStorage() {
  console.log("Red strage");
  console.log(ListOfProjects);
  let projectsData = safeJsonParse(localStorage.getItem("ListOfProjects"), []);
  console.log(projectsData);
  ListOfProjects = projectsData.map(
    (projectItem) =>
      new project(
        projectItem.name,
        projectItem.deletable,
        projectItem.id,
        projectItem.todoList.map(
          (todoItem) =>
            new todo(
              todoItem.title,
              todoItem.description,
              todoItem.dueDate,
              todoItem.priority,
              todoItem.projid,
              todoItem.id,
              todoItem.done,
            ),
        ),
      ),
  );
  // I'm not reading ListOfTodos from storage because I want the todos in todoList and ListOfTodos too be the same.
  ListOfProjects.forEach((project) => {
    // Loop through each todo in the project's todoList
    project.todoList.forEach((td) => {
      // Avoid duplicates: check if todo already exists in ListOfTodos
      if (!ListOfTodos.some((existingTd) => existingTd.id === td.id)) {
        ListOfTodos.push(td);
      }
    });
  });

  /*localStorage.clear();*/
  /*ListOfProjects = JSON.parse(localStorage.getItem("ListOfProjects")); 
  console.log(ListOfProjects);
  console.log(localStorage.getItem("ListOfTodos"));
  let todoData = safeJsonParse(localStorage.getItem("ListOfTodos"), []);
  console.log(todoData);

  ListOfTodos = todoData.map(
    (todoItem) =>
      new todo(
        todoItem.title,
        todoItem.description,
        todoItem.dueDate,
        todoItem.priority,
        todoItem.projid,
        todoItem.id,
        todoItem.done,
      ),
  ); */
  console.log(ListOfTodos);
}

function safeJsonParse(str, defaultValue) {
  try {
    return JSON.parse(str) || defaultValue;
  } catch (error) {
    return defaultValue;
  }
}

function updateStorage() {
  console.log("update storage");
  console.log(ListOfProjects);
  console.log(ListOfTodos);
  localStorage.setItem("ListOfProjects", JSON.stringify(ListOfProjects));
  localStorage.setItem("ListOfTodos", JSON.stringify(ListOfTodos));
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
  updateStorage,
};
