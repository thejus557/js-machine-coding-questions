document.addEventListener("DOMContentLoaded", initializeApp);

const IDS = {
  TODO_INPUT: "#todo-input",
  ADD_TODO_BTN: "#add-todo-btn",
  TODO_LIST: "#todo-list",
};

const DOM_CACHE = {
  elements: {},
  getElements: (ID) => {
    if (ID in DOM_CACHE.elements) {
      return DOM_CACHE.elements[ID];
    } else {
      const ele = document.querySelector(ID);
      if (ele) {
        DOM_CACHE.elements[ID] = ele;
      }
    }

    return DOM_CACHE.elements[ID];
  },
};

function safeLocalStorageOperation(operation, fallback = null) {
  try {
    return operation();
  } catch (err) {
    console.error("Local storage operation failed:", err);
    return fallback;
  }
}

function setTodoToLocalStorage(todo) {
  const item = {
    todo: todo,
    id: crypto.randomUUID(),
  };
  let totalItems = getTodosFromLocalStorage();
  totalItems = [...totalItems, item];

  const success = safeLocalStorageOperation(() => {
    localStorage.setItem("todos", JSON.stringify(totalItems));
    return true;
  }, false);

  if (!success) {
    alert("Failed to save todo. Please try again or clear some browser data.");
    return false;
  }

  return true;
}

function replaceTotalTodosInLocalStorage(todos) {
  const success = safeLocalStorageOperation(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    return true;
  }, false);

  if (!success) {
    alert("Failed to update todo. Please try again.");
    return false;
  }

  return true;
}

function getTodosFromLocalStorage() {
  return safeLocalStorageOperation(() => {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
  }, []);
}

function handleUpdateEditedTodo(id, value) {
  let totalTodos = getTodosFromLocalStorage();
  const newTodos = totalTodos.map((item) => {
    if (item.id === id) {
      return {
        id: id,
        todo: value,
      };
    } else {
      return item;
    }
  });
  replaceTotalTodosInLocalStorage(newTodos);
}

function handleEdit(id) {
  let totalTodos = getTodosFromLocalStorage();
  const filteredTodo = totalTodos.find((item) => item.id === id);
  const todoInput = DOM_CACHE.getElements(IDS.TODO_INPUT);
  const addTodoBtn = DOM_CACHE.getElements(IDS.ADD_TODO_BTN);

  if (filteredTodo) {
    todoInput.value = filteredTodo.todo;
    todoInput.setAttribute("edit-id", filteredTodo.id);
    addTodoBtn.textContent = "Update Todo";

    todoInput.focus();
    todoInput.select();
  }
}

function handleDelete(id) {
  let totalTodos = getTodosFromLocalStorage();
  const filteredTodo = totalTodos.filter((item) => item.id !== id);

  replaceTotalTodosInLocalStorage(filteredTodo);
  showUpdatedTodoList(filteredTodo);
}

function showUpdatedTodoList(todos) {
  const todoList = DOM_CACHE.getElements(IDS.TODO_LIST);

  todoList.innerHTML = "";

  const fragment = document.createDocumentFragment();

  todos?.forEach((todo) => {
    // Create actual DOM elements instead of string templates
    const todoContainer = document.createElement("li");
    todoContainer.className = "todo-container";
    todoContainer.dataset.id = todo.id;

    const todoItem = document.createElement("div");
    todoItem.className = "todo-item";
    todoItem.textContent = todo.todo; // Using textContent prevents XSS

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    todoContainer.appendChild(todoItem);
    todoContainer.appendChild(editBtn);
    todoContainer.appendChild(deleteBtn);

    fragment.appendChild(todoContainer);
  });

  todoList.appendChild(fragment);
}

function initializeApp() {
  const todoList = DOM_CACHE.getElements(IDS.TODO_LIST);
  const addTodoBtn = DOM_CACHE.getElements(IDS.ADD_TODO_BTN);

  addTodoBtn.addEventListener("click", () => {
    const todoInput = DOM_CACHE.getElements(IDS.TODO_INPUT);
    if (todoInput?.value.trim()) {
      const editId = todoInput.getAttribute("edit-id");

      if (editId) {
        const success = handleUpdateEditedTodo(editId, todoInput.value);

        if (success) {
          todoInput.removeAttribute("edit-id");
          addTodoBtn.textContent = "Add Todo";
          todoInput.value = "";
        }
      } else {
        const success = setTodoToLocalStorage(todoInput.value);
        if (success) {
          todoInput.value = "";
        }
      }

      showUpdatedTodoList(getTodosFromLocalStorage());
      todoInput.value = "";
    }
  });

  todoList.addEventListener("click", (e) => {
    const id = e.target.closest(".todo-container").dataset.id;

    if (!id) return;

    if (e.target.classList.contains("edit-btn")) {
      handleEdit(id);
    }

    if (e.target.classList.contains("delete-btn")) {
      handleDelete(id);
    }
  });

  showUpdatedTodoList(getTodosFromLocalStorage());
}
