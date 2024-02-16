import {
  handleEditButton,
  handlerCheckbox,
  handlerTextInput,
  handleDeleteTodo,
  handleDeleteTask,
  handleAddTask
} from "../listeners/handlers";
import { randomInteger } from "../utils/utils";

const iconPencil = (className) => {
  return `
    <svg class="${className}" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 612.032 612.032">
      <g>
        <path d="M602.905,152.23l-60.41,60.411L399.378,69.523L459.76,9.112c20.503-20.503,41.006,0,41.006,0l102.14,102.111 C602.905,111.225,623.408,131.728,602.905,152.23z M0.015,612.032l173.51-30.451L30.09,438.146L0.015,612.032z M50.211,418.679 l143.137,143.137L520.52,234.645L377.383,91.508L50.211,418.679z"/>
      </g>
    </svg>
  `;
};

const createElement = (tag, className, innerText = '', htmlFor = '') => {
  const element = document.createElement(tag);
  element.className = className;
  element.innerText = innerText;

  if (tag === 'label') element.setAttribute('for', htmlFor);
  
  return element;
};

const addHandler = (className) => {
  switch (className) {
    case "todo-head__text-button":
      return handleEditButton;
    case "todo-head__edit-button":
      return handleEditButton;
    case "todo-tasks__task-text-button":
      return handleEditButton;
    case "todo-tasks__task-edit-button":
      return handleEditButton;
    case "todo-tasks__task-checkbox":
      return handlerCheckbox;
    case "todo-head__edit-input":
      return handlerTextInput;
    case "todo-tasks__task-edit-input":
      return handlerTextInput;
    case "todo-head__button":
      return handleDeleteTodo;
    case "todo__add-form-list-item-button":
      return handleDeleteTask;
    case "todo-tasks__task-button-delete":
      return handleDeleteTask;
    case "todo__list-item-button":
      return handleAddTask;
    default:
      break;
  }
};

const createButton = (className, type, innerText = '', innerHTML = '') => {
  const button = document.createElement('button');
  button.className = className;
  button.type = type;
  button.innerText = innerText;
  button.innerHTML = innerText + innerHTML;
  button.onclick = addHandler(button.classList[0]);

  return button;
};

const createInput = (className, type, name, value, id) => {
  const input = document.createElement('input');
  input.className = className;
  input.type = type;
  input.name = name;
  input.value = value;
  input.onchange = addHandler(input.classList[0]);

  if (type === 'checkbox') {
    input.value = value ? 'on' : '';
    input.id = id;
  } else {
    input.value = value;
    input.required = true;
  }

  return input;
};

const createTodoTask = (titleId, {id, task, isDone}) => {
  const taskElement = createElement('li', `todo-tasks__task${isDone ? ' done' : ''}`);
  const taskInput = createInput('todo-tasks__task-checkbox', 'checkbox', `done-${titleId}-${id}`, isDone, `id-done-${titleId}-${id}`);
  const taskText = createElement('div', 'todo-tasks__task-text');
  const taskTextLabel = createElement('label', 'todo-tasks__task-text-label', task, `id-done-${titleId}-${id}`);
  const taskTextButton = createButton('todo-tasks__task-text-button', 'button', '', iconPencil('todo-tasks__task-text-button-icon'));
  const taskEdit = createElement('div', 'todo-tasks__task-edit');
  const taskEditInput = createInput('todo-tasks__task-edit-input input', 'text', `task-${titleId}-${id}`, task);
  const taskEditButton = createButton('todo-tasks__task-edit-button', 'button');
  const taskButton = createButton('todo-tasks__task-button-delete', 'button');

  taskText.append(taskTextLabel);
  taskText.append(taskTextButton);
  taskEdit.append(taskEditInput);
  taskEdit.append(taskEditButton);
  taskElement.append(taskInput);
  taskElement.append(taskText);
  taskElement.append(taskEdit);
  taskElement.append(taskButton);

  return taskElement;
};

const createTodoItem = ({id, title, tasks}) => {
  const todoItem = createElement('li', 'todo__list-item');
  const todoHead = createElement('div', 'todo__list-item-head todo-head');
  const todoHeadText = createElement('div', 'todo-head__text');
  const todoHeadTextTite = createElement('h2', 'todo-head__text-title', title);
  const todoHeadTextButton = createButton('todo-head__text-button', 'button', '', iconPencil('todo-head__text-button-icon'));
  const todoHeadEdit = createElement('div', 'todo-head__edit');
  const todoHeadEditInput = createInput('todo-head__edit-input input-title', 'text', `title-${id}`, title);
  const todoHeadEditButton = createButton('todo-head__edit-button', 'button');
  const todoHeadButton = createButton('todo-head__button button-delete', 'button', 'Delete');
  const todoTasks = createElement('ul', 'todo__list-item-tasks todo-tasks');
  const todoAddButton = createButton('todo__list-item-button button-add', 'button', 'Add task');

  todoHeadText.append(todoHeadTextTite);
  todoHeadText.append(todoHeadTextButton);
  todoHeadEdit.append(todoHeadEditInput);
  todoHeadEdit.append(todoHeadEditButton);
  todoHead.append(todoHeadText);
  todoHead.append(todoHeadEdit);
  todoHead.append(todoHeadButton);
  tasks.map((task) => todoTasks.append(createTodoTask(id, task)));
  todoItem.append(todoHead);
  todoItem.append(todoTasks);
  todoItem.append(todoAddButton);

  return todoItem;
};

export const addTodoItem = (todoData) => {
  const todoList = document.querySelector('.todo__list');
  todoList.prepend(createTodoItem(todoData));
};

export const addTask = (parent) => {
  const titleId = parent.querySelector('[name^="title-"]').name.split('-').pop();
  const tasks = parent.querySelector('.todo__list-item-tasks');
  const id = randomInteger();

  const task = createTodoTask(titleId, {id, task: '', isDone: false});
  task.classList.add('edit');

  tasks.append(task);
};

export const addTaskInNewTodo = () => {
  const newTodoTasks = document.querySelector('.todo__add-form-list');
  const task = createElement('li', 'todo__add-form-list-item');
  const taskInput = createInput('todo__add-form-list-item-input input', 'text', `task-${newTodoTasks.children.length}`, '');
  const taskButton = createButton('todo__add-form-list-item-button', 'button');
  
  taskInput.placeholder = 'Task';

  task.append(taskInput);
  task.append(taskButton);
  newTodoTasks.append(task);
};

export const filterTodos = (filter = 'all') => {
  const todos = document.querySelectorAll('.todo__list-item');

  for (const todo of todos) {
    const tasks = todo.querySelectorAll('.todo-tasks__task');
    const isTodoDone = ![...tasks].filter((task) => !task.classList.contains('done')).length;

    if (filter === 'done') {
      isTodoDone ? todo.classList.remove('disable') : todo.classList.add('disable');
    } else if (filter === 'active') {
      isTodoDone ? todo.classList.add('disable') : todo.classList.remove('disable');
    } else {
      todo.classList.remove('disable');
    }
  }
};

export const removeClasses = (nodeList, className) => {
  for (const node of nodeList) {
    node.classList.remove(className);
  }
};
