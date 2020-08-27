import React, { useState, useCallback } from 'react';
import uuid from 'uuid/v4';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { sendData, logout } from '../../utils/requests';
import { addTodoAction, sortTodoAction } from '../../redux/Todo/TodoActions';

const TodoInput = ({ addTodoAction, sortTodoAction }) => {

  const [itemTodo, setItemTodo] = useState({
    id: uuid(),
    title: '',
    date: '',
    type: '',
    editMode: false,
    completed: false
  });

  const onChangeValue = useCallback((event) => {
    setItemTodo({ ...itemTodo, title: event.target.value })
  }, [itemTodo]);

  const onChangeDate = (event) => {
    setItemTodo({ ...itemTodo, date: event.target.value })
  }

  const onChangeType = (event) => {
    console.log(event.target)
    setItemTodo({ ...itemTodo, type: event.target.value })
  }

  const sortType = (event) => {
    sortTodoAction(event);
  };

  const addTask = (event) => {
    if (itemTodo.title !== '' && itemTodo.date !== '' && itemTodo.type !== '') {
      event.preventDefault();
      sendData(itemTodo);
      addTodoAction({
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
          value={itemTodo.title}
          placeholder="AddTask..." />
        <select className="selectType" onChange={onChangeType} >
          <option value="personal">personal</option>
          <option value="work">work</option>
        </select>
        <input className="addDate" type="datetime-local"
          onChange={onChangeDate}
          value={itemTodo.date} />
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
