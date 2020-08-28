import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  setTodoAction, toggleTodoComplete, todoEditMode, editTodoType, editTodoDate,
  editTodoText, deleteTodoAction, getAllTodo
} from '../../redux/Todo/TodoActions';
import TodoInput from './TodoInput';
import delLogo from '../../svg/delLogo.svg';
import editLogo from '../../svg/editLogo.svg';
import doneLogo from '../../svg/doneLogo.svg';
import radioLogo from '../../svg/radioLogo.svg';
import radioLogoSelect from '../../svg/radioLogoSelect.svg';
import { todoEditReq, deleteTodoReq } from '../../utils/requests';

const TodoList = ({ getAllTodo, ...props }) => {
  const { todos } = props;

  useEffect(() => {
    getAllTodo();
  }, [])

  const deleteTodo = (todoId) => {
    props.deleteTodoAction(todoId);
    deleteTodoReq(todoId);
  };

  const editTodo = (param, value, todoId) => {
    let res;
    if (param === 'title')
      res = props.editTodoText(todoId, param, value);
    else if (param === 'date')
      res = props.editTodoDate(todoId, param, value);
    else if (param === 'completed')
      res = props.toggleTodoComplete(todoId, param, value);
    else if (param === 'type')
      res = props.editTodoType(todoId, param, value);
    todoEditReq(todoId, res)
  }

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
                        <img
                          alt="completed"
                          src={!item.completed ? radioLogo : radioLogoSelect}
                          onClick={(e) => editTodo('completed', !item.completed, item.id)}
                        />
                      </td>
                      <td className="tdType">{item.type}</td>
                      <td className="tdText"><span className="editTodo">{item.title}</span></td>
                      <td className="tdData">{item.date}</td>
                      <td className="tdIcons">
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
              </div> : <div className={todoDate(item.date, item.completed)} key={item.id}>
                <table>
                  <tbody>
                    <tr>
                      <td className="tdIconDone">
                        <img
                          alt="completed"
                          src={!item.completed ? radioLogo : radioLogoSelect}
                          onClick={(e) => editTodo('completed', !item.completed, item.id)}
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
                          value={item.title}
                          keyvalue={item.id}
                          onChange={(e) => editTodo('title', e.target.value, item.id)}
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
  deleteTodoAction,
  getAllTodo
}
)(TodoList);
