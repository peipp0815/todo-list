import "./styles.css";
import homeContent from "./pages/home.js";
import {
  attachCreateProject,
  displayProjects,
  dropdownListProjects,
  switchEditToNewTodo,
} from "./DOMlogic.js";

homeContent();
dropdownListProjects();

attachCreateProject();
switchEditToNewTodo();
