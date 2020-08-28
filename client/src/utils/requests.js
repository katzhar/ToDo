import axios from 'axios';

const token = localStorage.token

export const loginUserReq = (user) => {
    return axios.post('/login', user);
}

export const signupUserReq = (user) => {
    return axios.post('/signup', user);
}

export const getAllTodoReq = () => {
    return axios.get('/todolist', { headers: { 'Authorization': `Bearer ${token}` } })
}

export const todoEditReq = (todoId, data) => {
    let param = data.param;
    let value = data.data;
    axios.put(`/todolist/${todoId}`, { [param]: value }, { headers: { 'Authorization': `Bearer ${token}` } })
        .catch(error => {
            console.log(error)
        })
}

export const sendDataReq = (data) => {
    axios.post('/todolist', data, { headers: { 'Authorization': `Bearer ${token}` } })
        .catch(error => {
            console.log(error)
        }
        );
}

export const logoutReq = () => {
    axios.get('/logout', { headers: { 'Authorization': `Bearer ${token}` } })
        .catch(error => {
            console.log(error)
        }
        );
}

export const deleteTodoReq = (todoId) => {
    axios.delete(`/todolist/${todoId}`,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .catch(error => {
            console.log(error)
        })
}