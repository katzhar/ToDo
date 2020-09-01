import { createStore } from 'redux';
import TodoReducer from './Todo/TodoReducer';

export const store = createStore(
    TodoReducer
);