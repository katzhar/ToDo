import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  setTodoAction, toggleTodoComplete, todoEditMode, editTodoType,
  editTodoDate, editTodoText, deleteTodoAction
} from '../../redux/Todo/TodoActions';
import { getAllTodoReq, todoEditReq, deleteTodoReq } from '../../utils/requests';
import TodoInput from './TodoInput';
import delLogo from '../../svg/delLogo.svg';
import editLogo from '../../svg/editLogo.svg';
import doneLogo from '../../svg/doneLogo.svg';
import radioLogo from '../../svg/radioLogo.svg';
import radioLogoSelect from '../../svg/radioLogoSelect.svg';
import style from '../../css/todo.module.css';

const TodoList = (props) => {
  const { todos } = props;

  useEffect(() => {
    getAllTodoReq()
      .then(res => {
        let data = res.data.tasks;
        props.setTodoAction(data);
      }).catch(error => {
        console.log(error)
      });
  }, [])

  const deleteTodo = (todoId) => {
    props.deleteTodoAction(todoId);
    deleteTodoReq(todoId);
  };

  const editTodo = (param, value, todoId) => {
    let res;
    if (param === 'title') {
      res = props.editTodoText(todoId, param, value);
      todoEditReq(todoId, res)
    } else if (param === 'date') {
      res = props.editTodoDate(todoId, param, value);
      todoEditReq(todoId, res)
    } else if (param === 'completed') {
      res = props.toggleTodoComplete(todoId, param, value);
      todoEditReq(todoId, res)
    } else if (param === 'type') {
      res = props.editTodoType(todoId, param, value);
      todoEditReq(todoId, res)
    }
  }

  const todoDate = (date, completed) => {
    let dateNow = new Date();
    let dateTodo = new Date(date);
    let dbw = Math.floor(Math.abs(dateTodo.getTime() - dateNow.getTime()) / (1000 * 3600 * 24));
    if (completed === true)
      return (`${style.tododone}`)
    else if (dateNow.getTime() > dateTodo.getTime() || dbw === 0)
      return (`${style.todored}`)
    else if (dbw === 1)
      return (`${style.todoyellow}`)
    else
      return (`${style.todogreen}`)
  }

  return (
    <div>
      <TodoInput />
      <div>
        {todos.length && todos.map((item, index) => {
          return (
            !item.editMode ?
              <div
                className={todoDate(item.date, item.completed)}
                key={item.id}>
                <table>
                  <tbody>
                    <tr>
                      <td className={style.tdIconDone}>
                        <img
                          alt="completed"
                          src={!item.completed ? radioLogo : radioLogoSelect}
                          onClick={(e) => editTodo('completed', !item.completed, item.id)}
                        />
                      </td>
                      <td className={style.tdType}>
                        {item.type}
                      </td>
                      <td className={style.tdText}>
                        <span
                          className={style.editTodo}>{item.title}
                        </span>
                      </td>
                      <td className={style.tdData}>{item.date}</td>
                      <td className={style.tdIcons}>
                        <img
                          alt="editTodo"
                          src={editLogo}
                          keyvalue={index}
                          onClick={() => props.todoEditMode(item.id)} />
                        <img
                          alt="deleteTodo"
                          src={delLogo}
                          keyvalue={index}
                          onClick={() => deleteTodo(item.id)} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div> : <div
                className={todoDate(item.date, item.completed)} key={item.id}>
                <table>
                  <tbody>
                    <tr>
                      <td
                        className={style.tdIconDone}>
                        <img
                          alt="completed"
                          src={!item.completed ? radioLogo : radioLogoSelect}
                          onClick={(e) => editTodo('completed', !item.completed, item.id)}
                        />
                      </td>
                      <td>
                        <select
                          className={style.tdTypeEditMode}
                          keyvalue={item.id}
                          onChange={(e) => editTodo('type', e.target.value, item.id)} >
                          <option value="personal">personal</option>
                          <option value="work">work</option>
                        </select>
                      </td>
                      <td className={style.tdText}>
                        <input
                          className={style.editTodo}
                          type="text"
                          value={item.title}
                          keyvalue={item.id}
                          onChange={(e) => editTodo('title', e.target.value, item.id)}
                        />
                      </td>
                      <td>
                        <input
                          className={style.addDateEdit}
                          type="datetime-local"
                          value={item.date}
                          keyvalue={item.id}
                          onChange={(e) => editTodo('date', e.target.value, item.id)}
                        />
                      </td>
                      <td className={style.tdIcons}>
                        <img
                          alt="SubmitEdits"
                          src={doneLogo}
                          keyvalue={index}
                          onClick={() => props.todoEditMode(item.id)}
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
