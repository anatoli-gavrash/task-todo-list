import { addTask } from "../actions/dom-actions";

export const handleEditButton = (e) => {
  const grandpa = e.target.parentElement.parentElement;
  grandpa.classList.toggle('edit');
};

export const handlerCheckbox = (e) => {
  const parent = e.target.parentElement;
  parent.classList.toggle('done');
};

export const handlerTextInput = (e) => {
  const grandpa = e.target.parentElement.parentElement;
  const textTag = grandpa.querySelector('h2, label');
  const value = e.target.value;
  console.log('a');

  textTag.innerText = value;
};

export const handleDeleteTodo = (e) => {
  const grandpa = e.target.parentElement.parentElement;
  grandpa.remove();
};

export const handleDeleteTask = (e) => {
  const parent = e.target.parentElement;
  parent.remove();
};

export const handleAddTask = (e) => {
  const parent = e.target.parentElement;

  addTask(parent);
};
