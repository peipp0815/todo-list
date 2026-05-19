import "./styles.css";
import homeContent from "./pages/home.js";
import {
  attachCreateProject,
  attachCreateTodo,
  displayProjects,
  dropdownListProjects,
  switchEditToNewTodo,
} from "./DOMlogic.js";

homeContent();
dropdownListProjects();
attachCreateTodo();
attachCreateProject();
switchEditToNewTodo();
