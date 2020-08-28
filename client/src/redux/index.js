import { createStore, applyMiddleware } from 'redux';
import TodoReducer from './Todo/TodoReducer';
import thunk from 'redux-thunk';

export const store = createStore(
    TodoReducer, applyMiddleware(thunk)
);
