import {
  addTaskInNewTodo,
  addTodoItem,
  filterTodos,
  removeClasses
} from "../actions/dom-actions";
import { createNewTodo } from "../utils/utils";

export const listeners = () => {
  const filterButtons = document.querySelector('.todo__filter');
  const addTodoOpenButton = document.querySelector('.todo__add-button');
  const addForm = document.querySelector('.todo__add-form');
  const addNewTodoTaskButton = document.querySelector('.todo__add-form-buttons-button');

  filterButtons.addEventListener('click', (e) => {
    if (e.target.classList.contains('todo__filter-button')) {
      const buttons = e.target.parentElement.children;
      const button = e.target;
      const filter = button.innerText.toLowerCase();
      filterTodos(filter);

      removeClasses(buttons, 'active');
      button.classList.add('active');
    }
  });

  addTodoOpenButton.addEventListener('click', (e) => {
    const parent = e.target.parentElement;
    const form = parent.querySelector('.todo__add-form');

    parent.classList.toggle('open');

    if (!parent.classList.contains('open')) {
      form.setAttribute('inert', '');
    } else {
      form.removeAttribute('inert');
    }
    
  });

  addNewTodoTaskButton.addEventListener('click', () => {
    addTaskInNewTodo();
  });

  addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const data = createNewTodo(Object.fromEntries(new FormData(e.target)));
    addTodoItem(data);

    e.target.reset();
  });
};
