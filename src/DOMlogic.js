import { createTodo } from "./appLogic.js";

function attachCreateTodo() {
  const btn = document.getElementById("add-new-todo");
  btn.addEventListener("click", (e) => {
    createTodo(
      document.getElementById("todo-title").value,
      document.getElementById("todo-description").value,
      document.getElementById("todo-dueDate").value,
      document.getElementById("todo-priority").value,
      "checklist",
    );

    document.getElementById("todo-title").value = "";
    document.getElementById("todo-description").value = "";
    document.getElementById("todo-dueDate").value = "";
    document.getElementById("todo-priority").value = "";
  });
}

export { attachCreateTodo };
