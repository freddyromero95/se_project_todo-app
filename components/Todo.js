export default class Todo {
  constructor(data, selector, handleCompletedChange, handleDelete) {
    this._data = data;
    this._selector = selector;
    this._handleCompletedChange = handleCompletedChange;
    this._handleDelete = handleDelete;
  }

  _getTemplate() {
    const todoElement = document
      .querySelector(this._selector)
      .content.querySelector(".todo")
      .cloneNode(true);

    return todoElement;
  }

  _setEventListeners() {
    const todoDeleteBtn = this._element.querySelector(".todo__delete-btn");

    const todoCheckbox = this._element.querySelector(".todo__completed");

    todoDeleteBtn.addEventListener("click", () => {
      this._element.remove();
      this._handleDelete(this._data.completed);
    });

    todoCheckbox.addEventListener("change", () => {
      this._data.completed = todoCheckbox.checked;
      this._handleCompletedChange(todoCheckbox.checked);
    });
  }

  getView() {
    // Create the todo element from the template
    const todoElement = this._getTemplate();

    const todoName = todoElement.querySelector(".todo__name");
    const todoCheckbox = todoElement.querySelector(".todo__completed");
    const todoLabel = todoElement.querySelector(".todo__label");
    const todoDate = todoElement.querySelector(".todo__date");

    // Set the todo name and completed status
    todoName.textContent = this._data.name;
    todoCheckbox.checked = this._data.completed;

    // Give each checkbox a unique ID
    todoCheckbox.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);

    // Display the due date if one exists
    if (this._data.date) {
      const dueDate = new Date(this._data.date);

      if (!isNaN(dueDate.getTime())) {
        todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`;
      }
    }

    // Save the element and activate event listeners
    this._element = todoElement;
    this._setEventListeners();

    // Return the finished todo element
    return this._element;
  }
}
