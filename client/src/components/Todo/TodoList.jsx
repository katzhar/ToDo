import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setTodoAction, toggleTodoComplete, todoEditMode, editTodoType, editTodoDate, editTodoText, deleteTodoAction } from '../../redux';
import axios from 'axios';
import TodoInput from './TodoInput';
import delLogo from '../../svg/delLogo.svg';
import editLogo from '../../svg/editLogo.svg';
import doneLogo from '../../svg/doneLogo.svg';
import radioLogo from '../../svg/radioLogo.svg';
import radioLogoSelect from '../../svg/radioLogoSelect.svg';

const TodoList = (props) => {
  const { todos } = props;
  const token = localStorage.token

  useEffect(() => {
    axios.get('/todolist', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => {
        let data = res.data.tasks;
        props.setTodoAction(data);
      }).catch(error => {
        console.log(error)
      }
      );
  }, [])

  const toggleComplete = (todoId) => {
    props.toggleTodoComplete(todoId);
    axios.post('/todolist/complete', { id: todoId }, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => {
        if (res)
          console.log(res)
        else
          console.log('fail');
      }).catch(error => {
        console.log(error)
      })
  };

  const deleteTodo = (todoId) => {
    props.deleteTodoAction(todoId);
    axios.post('/todolist/delete', { id: todoId }, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => {
        if (res)
          console.log(res)
        else
          console.log('fail');
      }).catch(error => {
        console.log(error)
      })
  };

  const editMode = (todoId) => {
    props.todoEditMode(todoId);
  };

  const editTodo = (param, value, todoId) => {
    if (param === 'text')
      props.editTodoText(todoId, param, value);
    else if (param === 'date')
      props.editTodoDate(todoId, param, value);
    else if (param === 'type')
      props.editTodoType(todoId, param, value);
  };

  const todoDate = (date, completed) => {
    let dateNow = new Date();
    let dateTodo = new Date(date);
    let dbw = Math.floor(Math.abs(dateTodo.getTime() - dateNow.getTime()) / (1000 * 3600 * 24));
    if (completed === true)
      return ('tododone')
    else if (dateNow.getTime() > dateTodo.getTime() || dbw === 0)
      return ('todored')
    else if (dbw === 1)
      return ('todoyellow')
    else
      return ('todogreen')
  }

  return (
    <div>
      <TodoInput />
      <div>
        {todos.map((item, index) => {
          return (
            !item.editMode ?
              <div
                className={todoDate(item.date, item.completed)}
                key={item.id}>
                <table>
                  <tbody>
                    <tr>
                      <td className="tdIconDone">
                        <img src={!item.completed ? radioLogo : radioLogoSelect}
                          keyvalue={item.id}
                          onClick={toggleComplete.bind(null, item.id)}
                        />
                      </td>
                      <td className="tdType">{item.type}</td>
                      <td className="tdText"><span className="editTodo">{item.text}</span></td>
                      <td className="tdData">{item.date}</td>
                      <td className="tdIcons">
                        <img src={editLogo} keyvalue={index} onClick={editMode.bind(null, item.id)} />
                        <img src={delLogo} keyvalue={index} onClick={deleteTodo.bind(null, item.id)} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div> : <div className={todoDate(item.date, item.completed)} key={item.id}>
                <table>
                  <tbody>
                    <tr>
                      <td className="tdIconDone">
                        <img src={!item.completed ? radioLogo : radioLogoSelect}
                          keyvalue={item.id}
                          onClick={toggleComplete.bind(null, item.id)}
                        />
                      </td>
                      <td>
                        <select className="tdTypeEditMode"
                          keyvalue={item.id}
                          onChange={(e) => editTodo('type', e.target.value, item.id)} >
                          <option value="personal">personal</option>
                          <option value="work">work</option>
                        </select>
                      </td>
                      <td className="tdText">
                        <input className="editTodo" type="text"
                          value={item.text}
                          keyvalue={item.id}
                          onChange={(e) => editTodo('text', e.target.value, item.id)}
                        />
                      </td>
                      <td>
                        <input className="addDateEdit" type="datetime-local"
                          value={item.date}
                          keyvalue={item.id}
                          onChange={(e) => editTodo('date', e.target.value, item.id)}
                        />
                      </td>
                      <td className="tdIcons">
                        <img src={doneLogo}
                          keyvalue={index}
                          onClick={editMode.bind(null, item.id)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>)
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos
});

export default connect(
  mapStateToProps, {
  setTodoAction,
  toggleTodoComplete,
  todoEditMode,
  editTodoType,
  editTodoDate,
  editTodoText,
  deleteTodoAction
}
)(TodoList);
