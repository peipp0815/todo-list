import "./styles.css";
import {
  ListOfProjects,
  createProject,
  defaultProject,
  createTodo,
  reassignProject,
} from "./appLogic.js";

const newProject = createProject("Mermaid");
const newTodo = createTodo(1, 2, 3, 4, 5, 6);
reassignProject(newTodo, newProject);
console.log(defaultProject);
console.log(ListOfProjects);
