'use strict';
let todos = readTodos();
function writeTodos() {
  const todosJSON = JSON.stringify(todos);
  localStorage.setItem('todos-storage', todosJSON);
}
function readTodos() {
  const savedTodos = localStorage.getItem('todos-storage');
  if (savedTodos === null) {
    return [];
  }
  return JSON.parse(savedTodos);
}
