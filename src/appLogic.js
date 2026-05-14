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
  constructor(title, description, dueDate, priority, checklist, proj) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = checklist;
    this.id = self.crypto.randomUUID();
    this.proj = proj;
  }
}

const ListOfProjects = [];

function createProject(name, deletable = true) {
  const newProject = new project(name, deletable);
  ListOfProjects.push(newProject);
  return newProject;
}

const defaultProject = createProject("Inbox", false);

function createTodo(title, description, dueDate, priority, checklist) {
  const newTodo = new todo(
    title,
    description,
    dueDate,
    priority,
    checklist,
    defaultProject.id,
  );
  defaultProject.todoList.push(newTodo);
  console.log(defaultProject);
  return newTodo;
}

function reassignProject(td, proj) {
  deleteTodo(td);
  td.proj = proj.id;
  proj.todoList.push(td);
}

function deleteTodo(td) {
  const index = ListOfProjects.findIndex((item) => item.id === td.proj);
  if (index > -1) {
    ListOfProjects[index].removeTodo(td.id);
  }
}

function deleteProject(proj, preserveTodos) {
  if (proj.deletable === true) {
    if (preserveTodos === true) {
      for (const td of proj.todoList) {
        reassignProject(td, defaultProject);
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
