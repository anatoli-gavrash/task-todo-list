// Рандомайзер для создания уникальных id
export const randomInteger = (min = 0, max = 1000000000) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min) + min);
}
// Создание объекта списка задач из данных формы
// Уникальные id должны использоваться при добавлении в базу данных
export const createNewTodo = (data) => {
  const tasks = Object.entries(data)
    .filter(([key]) => key.includes('task'))
    .map(([, value]) => ({
      id: randomInteger(),
      task: value,
      isDone: false
    }));
  
  return {
    id: randomInteger(),
    title: data.title,
    tasks
  };
};
