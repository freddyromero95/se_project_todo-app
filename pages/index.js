import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

// DOM elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

// Form validation
const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);

addTodoFormValidator.enableValidation();

// Popup functions
const openModal = (modal) => {
  modal.classList.add("popup_visible");
  document.addEventListener("keydown", handleEscape);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
  document.removeEventListener("keydown", handleEscape);
};

function handleEscape(evt) {
  if (evt.key === "Escape") {
    closeModal(addTodoPopup);
  }
}

// Create and render todos
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

const renderTodo = (data) => {
  const todoElement = generateTodo(data);
  todosList.append(todoElement);
};

// Open popup
addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

// Close popup
addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

// Submit new todo
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  // Prevent invalid submissions, including pressing Enter
  if (!addTodoForm.checkValidity()) {
    return;
  }

  const name = addTodoForm.elements.name.value;
  const dateInput = addTodoForm.elements.date.value;

  let date = null;

  if (dateInput) {
    date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  }

  const values = {
    id: uuidv4(),
    name,
    date,
    completed: false,
  };

  renderTodo(values);

  addTodoFormValidator.resetValidation();
  closeModal(addTodoPopup);
});

// Render initial todos
initialTodos.forEach((item) => {
  renderTodo(item);
});
