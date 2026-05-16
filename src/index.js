import "./styles.css";
import homeContent from "./pages/home.js";
import {
  attachCreateProject,
  attachCreateTodo,
  displayProjects,
} from "./DOMlogic.js";

homeContent();

attachCreateTodo();
attachCreateProject();
