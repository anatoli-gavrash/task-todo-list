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
  // Обработка кнопок фильтрации
  filterButtons.addEventListener('click', (e) => {
    if (e.target.classList.contains('todo__filter-button')) {
      const buttons = e.target.parentElement.children;
      const button = e.target;
      // Переменная из data-filter используется в функции фильтрации. 
      const filter = button.dataset.filter;
      filterTodos(filter);
      // Очищение классов у всех кнопок и добавление класса на нажатую кнопку
      removeClasses(buttons, 'active');
      button.classList.add('active');
    }
  });
  // Обработка кнопки открытия формы для создания нового списка задач
  addTodoOpenButton.addEventListener('click', (e) => {
    const parent = e.target.parentElement;
    const form = parent.querySelector('.todo__add-form');

    parent.classList.toggle('open');
    // Отключение доступности кнопок пока форма закрыта
    if (!parent.classList.contains('open')) {
      form.setAttribute('inert', '');
    } else {
      form.removeAttribute('inert');
    }
    
  });
  // Обработка кнопки добавления новой задачи
  addNewTodoTaskButton.addEventListener('click', () => {
    addTaskInNewTodo();
  });
  // Обработка данных формы и добавление нового списка задач
  addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Преобразуем данные из формы в объект и добавляем список в дерево
    const data = createNewTodo(Object.fromEntries(new FormData(e.target)));
    addTodoItem(data);
    // Чистим форму
    e.target.reset();
  });
};
