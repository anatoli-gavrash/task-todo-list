import { addTask } from "../actions/dom-actions";
// Обработчик кнопки редактирования рядом с заголовком и текстом задачи
// Показывает или скрывает форму для редактирования
export const handleEditButton = (e) => {
  const grandpa = e.target.parentElement.parentElement;
  grandpa.classList.toggle('edit');
};
// Обработка чекбокса и добавление класса для определения статуса задачи
export const handlerCheckbox = (e) => {
  const parent = e.target.parentElement;
  parent.classList.toggle('done');
};
// Синхронизация данных заголовка, задачи и их полей для редактирования
export const handlerTextInput = (e) => {
  const grandpa = e.target.parentElement.parentElement;
  // Поиск тэга для синхронизации
  const textTag = grandpa.querySelector('h2, label');
  const value = e.target.value;

  textTag.innerText = value;
};
// Обработка кнопки удаления списка задач
export const handleDeleteTodo = (e) => {
  const grandpa = e.target.parentElement.parentElement;
  grandpa.remove();
};
// Обработка кнопки удаления задачи
export const handleDeleteTask = (e) => {
  const parent = e.target.parentElement;
  parent.remove();
};
// Обработка добаления задачи в существующем списке
export const handleAddTask = (e) => {
  const parent = e.target.parentElement;

  addTask(parent);
};
