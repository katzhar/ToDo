export const setTodoAction = (data) => ({
  type: 'SET_TODO', data
});

export const sortTodoAction = (param) => ({
  type: 'SORT_TODO', param
});

export const addTodoAction = (todo) => ({
  type: 'ADD_TODO',
  payload: todo
});

export const toggleTodoComplete = (todoId, param, data) => ({
  type: 'TOGGLE_TODO',
  payload: todoId, param, data
});

export const todoEditMode = (todoId) => ({
  type: 'EDITMODE_TODO',
  payload: todoId
});

export const editTodoDate = (todoId, param, data) => ({
  type: 'EDIT_TODO_DATE',
  payload: todoId, param, data
});

export const editTodoText = (todoId, param, data) => ({
  type: 'EDIT_TODO_TEXT',
  payload: todoId, param, data
});

export const editTodoType = (todoId, param, data) => ({
  type: 'EDIT_TODO_TYPE',
  payload: todoId, param, data
});

export const deleteTodoAction = (todoId) => ({
  type: 'DELETE_TODO',
  payload: todoId
});