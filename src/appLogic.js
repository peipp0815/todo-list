class project {
  constructor(name, deletable) {
    this.id = self.crypto.randomUUID();
    this.name = name;
    this.todoList = [];
    this.deletable = deletable;
  }
  removeTodo(todoID) {
    const index = this.todoList.findIndex((item) => item.id === todoID);
    if (index > -1) {
      this.todoList.splice(index, 1);
    }
  }
}

class todo {
  constructor(title, description, dueDate, priority, checklist, projid) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = checklist;
    this.id = self.crypto.randomUUID();
    this.projid = projid;
    this.done = false;
  }
  changeDone() {
    this.done = !this.done;
  }
}

const ListOfProjects = [];
const ListOfTodos = [];

function createProject(name, deletable = true) {
  const newProject = new project(name, deletable);
  ListOfProjects.push(newProject);
  return newProject;
}

const defaultProject = createProject("Inbox", false);

function createTodo(title, description, dueDate, priority, checklist, projid) {
  const newTodo = new todo(
    title,
    description,
    dueDate,
    priority,
    checklist,
    projid,
  );
  ListOfTodos.push(newTodo);
  const index = ListOfProjects.findIndex((item) => item.id === projid);

  if (index > -1) {
    ListOfProjects[index].todoList.push(newTodo);
  }

  return newTodo;
}

function reassignProject(td, proj) {
  deleteTodo(td);
  td.projid = proj.id;
  proj.todoList.push(td);
}

function deleteTodo(td) {
  const index = ListOfProjects.findIndex((item) => item.id === td.projid);
  if (index > -1) {
    ListOfProjects[index].removeTodo(td.id);
  }

  const index = ListOfTodos.indexOf(td);
  if (index > -1) {
    ListOfTodos.splice(index, 1);
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
    const index = ListOfProjects.findIndex((item) => item.id === proj.id);
    if (index > -1) {
      ListOfProjects.splice(index, 1);
    }
  }
}

export {
  ListOfProjects,
  createProject,
  defaultProject,
  createTodo,
  reassignProject,
  deleteTodo,
  deleteProject,
};
