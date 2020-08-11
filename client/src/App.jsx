import React from 'react';
import todocss from './css/todo.css'
import logincss from './css/login.css'
import { Provider } from 'react-redux';
import { store } from './redux';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import Login from './components/Login';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Login />
        <TodoInput />
        <TodoList />
      </div>
    </Provider>
  )
};

export default App;
