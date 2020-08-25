import React, { useState, useCallback } from 'react';
import { Link } from "react-router-dom";
import uuid from 'uuid/v4';
import { connect } from 'react-redux';
import { addTodoAction, sortTodoAction } from '../../redux';
import axios from 'axios';

const TodoInput = (props) => {
  const [todo, setTodo] = useState('');
  const [itemTodo, setItemTodo] = useState({
    id: uuid(),
    title: '',
    date: '',
    type: '',
    editMode: false,
    completed: false
  });

  let sendData = (data) => {
    const token = localStorage.token
    axios.post('/todolist', data, { headers: { 'Authorization': `Bearer ${token}` } })
      .catch(error => {
        console.log(error)
      }
      );
  }

  let logout = () => {
    const token = localStorage.token
    axios.get('/logout', { headers: { 'Authorization': `Bearer ${token}` } })
      .catch(error => {
        console.log(error)
      }
      );
  }

  const onChangeValue = useCallback((event) => {
    setItemTodo({ ...itemTodo, title: event.target.value })
  }, [itemTodo]);

  const onChangeDate = (event) => {
    setItemTodo({ ...itemTodo, date: event.target.value })
  }

  const onChangeType = (event) => {
    setItemTodo({ ...itemTodo, type: event.target.value })
  }

  const sortType = (event) => {
    props.sortTodoAction(event);
  };

  const addTask = (event) => {
    if (itemTodo.title !== '' && itemTodo.date !== '' && itemTodo.type !== '') {
      event.preventDefault();
      sendData(itemTodo);
      setTodo([...todo, itemTodo]);
      props.addTodoAction({
        id: uuid(),
        title: itemTodo.title,
        date: itemTodo.date,
        type: itemTodo.type,
        editMode: false,
        completed: false,
      });
    }
  }

  const clearLocalStorage = () => {
    logout();
    localStorage.removeItem('token');
  }

  return (
    <div>
      <Link to="/login" onClick={clearLocalStorage}>Log out</Link>
      <div className="navbarCont">
        <input className="addTodo" type="text"
          onChange={onChangeValue}
          value={todo.title}
          placeholder="AddTask..." />
        <select className="selectType" onChange={onChangeType} >
          <option value="personal">personal</option>
          <option value="work">work</option>
        </select>
        <input className="addDate" type="datetime-local"
          onChange={onChangeDate}
          value={todo.date} />
        <button onClick={addTask} className="buttonCreateTodo">Add</button>
      </div>
      <div className="divSort">
        <select className="selectSort"
          onChange={(e) => { sortType(e.target.value) }}>
          <option value="default">sort by</option>
          <option value="date">date</option>
          <option value="title">title</option>
          <option value="type">type</option>
        </select>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos
});

export default connect(
  mapStateToProps, {
  addTodoAction,
  sortTodoAction
}
)(TodoInput);
