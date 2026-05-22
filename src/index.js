import "./styles.css";
import homeContent from "./pages/home.js";
import {
  attachCreateProject,
  displayProjects,
  dropdownListProjects,
  switchEditToNewTodo,
  addProjectsToNavBar,
  clearDialogsOnClose,
} from "./DOMlogic.js";
import projectContent from "./pages/projects.js";
import { makeNavBar } from "./navLogic.js";

homeContent();
dropdownListProjects();

attachCreateProject();
switchEditToNewTodo();
addProjectsToNavBar();

makeNavBar();
clearDialogsOnClose();
