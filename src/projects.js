class projects {
  constructor() {
    this.project = [];
  }
  get project() {
    return this.project;
  }
  set project(todo) {
    this.project.push(todo);
  }
}
