import React from 'react';
import { store } from './redux/index';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import todocss from './css/todo.css'
import logincss from './css/login.css'
import TodoList from './components/Todo/TodoList';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Route exact path='/' component={Login} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/todolist' component={TodoList} />
      </div>
    </Provider>
  )
};

export default App;
