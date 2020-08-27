import { createStore } from 'redux';
import TodoReducer from './Todo/TodoReducer';

// const reducer = combineReducers({
//     TodoReducer
// })

// export const store = createStore(reducer);

const initialState = {
  todos: []
};

export const store = createStore(
  TodoReducer,
  initialState
);