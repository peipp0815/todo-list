import "./styles.css";
import {
  ListOfProjects,
  createProject,
  defaultProject,
  createTodo,
  reassignProject,
  deleteTodo,
  deleteProject,
} from "./appLogic.js";

const newProject = createProject("Mermaid");
const newTodo = createTodo(1, 2, 3, 4, 5);
console.log(newTodo);
reassignProject(newTodo, newProject);
deleteProject(newProject, true);
deleteTodo(newTodo);

console.log(defaultProject);
console.log(ListOfProjects);
