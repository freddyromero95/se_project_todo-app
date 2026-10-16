# Simple ToDo App

## Project Description

The Simple ToDo App is an interactive task management application built as part of TripleTen's Software Engineering program.

Users can create, complete, and delete tasks through a simple and responsive interface.

The application uses JavaScript classes and object-oriented programming principles to organize task management, popup interactions, and form validation.

## Features

- Display an initial list of todo items
- Add new tasks using a popup form
- Assign optional due dates to tasks
- Validate user input before creating tasks
- Submit tasks using the Enter key
- Mark tasks as completed or uncompleted
- Delete tasks from the list
- Track total and completed tasks with a dynamic counter
- Close the popup using the close button, Escape key, or overlay

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Object-Oriented Programming (OOP)
- JavaScript Modules
- BEM CSS Methodology
- Form Validation
- UUID for unique task identifiers
- Git and GitHub
- GitHub Pages

## Project Structure

- `components/Todo.js` — Creates and manages individual todo items
- `components/FormValidator.js` — Handles form validation
- `components/Section.js` — Renders todo items in the list
- `components/Popup.js` — Manages popup opening and closing
- `components/PopupWithForm.js` — Handles popup form submissions
- `components/TodoCounter.js` — Tracks total and completed tasks
- `pages/index.js` — Main application logic
- `utils/constants.js` — Initial todos and validation settings
- `blocks/` — CSS styles organized using BEM
- `index.html` — Main HTML structure

## Live Demo

[View the Simple ToDo App](https://freddyromero95.github.io/se_project_todo-app/)

## GitHub Repository

https://github.com/freddyromero95/se_project_todo-app

## Author

Freddy Romero

Created for TripleTen Software Engineering — Project 8.
