import TodoCounter from "../components/TodoCounter.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

// DOM elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");

// Form validation
const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
addTodoFormValidator.enableValidation();

const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    (isCompleted) => {
      todoCounter.updateCompleted(isCompleted);
    },
    (wasCompleted) => {
      todoCounter.updateTotal(false);

      if (wasCompleted) {
        todoCounter.updateCompleted(false);
      }
    },
  );

  return todo.getView();
};

const renderTodo = (data) => {
  const todoElement = generateTodo(data);
  todoSection.addItem(todoElement);
};

const todoSection = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopupWithForm = new PopupWithForm(
  "#add-todo-popup",
  (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    let date = null;

    if (dateInput) {
      date = new Date(dateInput);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    }

    const todoData = {
      id: uuidv4(),
      name,
      date,
      completed: false,
    };

    renderTodo(todoData);
    todoCounter.updateTotal(true);

    addTodoFormValidator.resetValidation();
    addTodoPopupWithForm.close();
  },
);

addTodoPopupWithForm.setEventListeners();

// Open popup button
addTodoButton.addEventListener("click", () => {
  addTodoPopupWithForm.open();
});

// Render initial todos
todoSection.renderItems();
