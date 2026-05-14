function homeContent() {
  const mainContent = document.getElementById("main-content");
  mainContent.textContent = "";

  const h1 = document.createElement("h1");
  h1.textContent = "Home";
  mainContent.appendChild(h1);

  const newTodoButton = document.createElement("button");
  newTodoButton.textContent = "New Todo";
  newTodoButton.classList.add("newTodoButton");
  newTodoButton.setAttribute("command", "show-modal");
  newTodoButton.setAttribute("commandfor", "new-todo");
  mainContent.appendChild(newTodoButton);

  const projects = document.createElement("div");
  projects.setAttribute("id", "projects");
  mainContent.appendChild(projects);
}

export default homeContent;
