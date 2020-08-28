import React, { useState } from 'react';
import uuid from 'uuid/v4';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { sendDataReq, logoutReq } from '../../utils/requests';
import { addTodoAction, sortTodoAction } from '../../redux/Todo/TodoActions';
import style from '../../css/todo.module.css';

const TodoInput = ({ addTodoAction, sortTodoAction }) => {
  const [itemTodo, setItemTodo] = useState({
    id: uuid(),
    title: '',
    date: '',
    type: '',
    editMode: false,
    completed: false
  });

  const onChangeValue = (param, value) => {
    setItemTodo({ ...itemTodo, [param]: value })
  }

  const addTask = (event) => {
    if (itemTodo.title !== '' && itemTodo.date !== '' && itemTodo.type !== '') {
      event.preventDefault();
      sendDataReq(itemTodo);
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
    logoutReq();
    localStorage.removeItem('token');
  }

  return (
    <div>
      <Link to="/login" onClick={clearLocalStorage}>Log out</Link>
      <div className={style.navbarCont}>
        <input
          className={style.addTodo}
          type="text"
          onChange={(e) => onChangeValue('title', e.target.value)}
          value={itemTodo.title}
          placeholder="AddTask..." />
        <select
          className={style.selectType}
          onChange={(e) => onChangeValue('type', e.target.value)} >
          <option value="personal">personal</option>
          <option value="work">work</option>
        </select>
        <input
          className={style.addDate}
          type="datetime-local"
          onChange={(e) => onChangeValue('date', e.target.value)}
          value={itemTodo.date} />
        <button
          onClick={addTask}
          className={style.buttonCreateTodo}>Add</button>
      </div>
      <div
        className={style.divSort}>
        <select
          className={style.selectSort}
          onChange={(e) => { sortTodoAction(e.target.value) }}>
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