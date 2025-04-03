/* exported todos, writeTodos */
interface Todo {
  todoId: string;
  task: string;
  isCompleted: boolean;
}

let todos: Todo[] = readTodos();

function writeTodos(): void {
  const todosJSON = JSON.stringify(todos);
  localStorage.setItem('todos-storage', todosJSON);
}

function readTodos(): [] {
  const savedTodos = localStorage.getItem('todos-storage');
  if (savedTodos === null) {
    return [];
  }
  return JSON.parse(savedTodos);
}
