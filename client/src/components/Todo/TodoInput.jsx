import React, { useState, useCallback } from 'react';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';
import { addTodoAction, sortTodoAction } from '../../redux';

const TodoInput = (props) => {
  const [todo, setTodo] = useState('');
  const [itemTodo, setItemTodo] = useState({
    id: uuid(),
    text: '',
    date: '',
    type: '',
    editMode: false,
    complete: false
  });

  const onChangeValue = useCallback((event) => {
    setItemTodo({ ...itemTodo, text: event.target.value })
  }, [itemTodo]);

  const onChangeDate = (event) => {
    setItemTodo({ ...itemTodo, date: event.target.value })
  }

  const onChangeType = (event) => {
    setItemTodo({ ...itemTodo, type: event.target.value })
  }

  const sortType = (event) => {
    let data = (JSON.parse(localStorage.getItem('todo')) || []);
    props.sortTodoAction(data, event);
  };

  const addTask = (event) => {
    if (itemTodo.text !== '' && itemTodo.date !== '' && itemTodo.type !== '') {
      event.preventDefault();
      setTodo([...todo, itemTodo]);
      props.addTodoAction({
        id: uuid(),
        text: itemTodo.text,
        date: itemTodo.date,
        type: itemTodo.type,
        editMode: false,
        complete: false,
      });
    }
  }

  return (
    <div>
      <a href="/login">log out</a>
      <div className="navbarCont">
        <input className="addTodo" type="text"
          onChange={onChangeValue}
          value={todo.text}
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
          <option value="text">text</option>
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
