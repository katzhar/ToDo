import axios from 'axios';

const token = localStorage.token

export const todoEdit = (todoId, data) => {
    let param = data.param;
    let value = data.data;
    axios.put(`/todolist/${todoId}`, { [param]: value }, { headers: { 'Authorization': `Bearer ${token}` } })
        .catch(error => {
            console.log(error)
        })
}

export let sendData = (data) => {
    axios.post('/todolist', data, { headers: { 'Authorization': `Bearer ${token}` } })
        .catch(error => {
            console.log(error)
        }
        );
}

export let logout = () => {
    axios.get('/logout', { headers: { 'Authorization': `Bearer ${token}` } })
        .catch(error => {
            console.log(error)
        }
        );
}

