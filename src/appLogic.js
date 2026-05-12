class project {
  constructor(name) {
    this.id = self.crypto.randomUUID();
    this.name = name;
    this.todoList = [];
  }
  removeTodo(todoID) {
    const index = this.todoList.findIndex((item) => item.id === todoID);
    if (index > -1) {
      this.todoList.splice(index, 1);
    }
  }
}

class todo {
  constructor(title, description, dueDate, priority, notes, checklist, proj) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.id = self.crypto.randomUUID();
    this.proj = proj;
  }
}

const ListOfProjects = [];

function createProject(name) {
  const newProject = new project(name);
  ListOfProjects.push(newProject);
  return newProject;
}

const defaultProject = createProject("Default Project");

function createTodo(title, description, dueDate, priority, notes, checklist) {
  const newTodo = new todo(
    title,
    description,
    dueDate,
    priority,
    notes,
    checklist,
    defaultProject.id,
  );
  defaultProject.todoList.push(newTodo);
  return newTodo;
}

function reassignProject(td, proj) {
  const index = ListOfProjects.findIndex((item) => item.id === td.proj);
  if (index > -1) {
    ListOfProjects[index].removeTodo(td.id);
  }
  td.proj = proj;
  proj.todoList.push(td);
}

export {
  ListOfProjects,
  createProject,
  defaultProject,
  createTodo,
  reassignProject,
};
