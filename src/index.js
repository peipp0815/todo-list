import "./styles.css";
import homeContent from "./pages/home.js";
import {
  attachCreateProject,
  displayProjects,
  dropdownListProjects,
  switchEditToNewTodo,
} from "./DOMlogic.js";
import projectContent from "./pages/projects.js";

homeContent();
dropdownListProjects();

attachCreateProject();
switchEditToNewTodo();
