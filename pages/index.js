import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);

addTodoFormValidator.enableValidation();

// Open popup
const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

// Close popup
const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// Generate a todo using the Todo class
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

// Open the Add Todo popup
addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

// Close the Add Todo popup
addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

// Handle new todo submissions
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = evt.target.elements.name.value;
  const dateInput = evt.target.elements.date.value;

  let date = null;

  if (dateInput) {
    date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  }

  const values = {
    id: uuidv4(),
    name: name,
    date: date,
    completed: false,
  };

  const todo = generateTodo(values);
  todosList.append(todo);

  addTodoFormValidator.resetValidation();
  closeModal(addTodoPopup);
});

// Display initial todos
initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});
