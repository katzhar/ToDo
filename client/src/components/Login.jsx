import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    let sendData = (event) => {
        event.preventDefault();
        axios.post('/login', user)
            .then(res => {
                if (res.data.success) {
                    localStorage.setItem('token', res.data.token);
                    history.push('/todolist')
                } else
                    history.push('/login')
            }).catch(error => {
                console.log(error)
            }
            );
    }

    const onChangeUsername = (event) => {
        setUser({ ...user, username: event.target.value })
    }

    const onChangePassword = (event) => {
        setUser({ ...user, password: event.target.value })
    }

    return (
        <div className="loginForm">
            <form action='/login' method='post'>
                <input
                    className="inputLogin"
                    name='username'
                    label="username"
                    type="text"
                    onChange={onChangeUsername}
                    value={user.username}
                    placeholder="username" />
                <input
                    className="inputLogin"
                    label="password"
                    type="password"
                    name="password"
                    onChange={onChangePassword}
                    value={user.password}
                    placeholder="password" />
                <input className="inputLogin" type="submit" value="Log In" onClick={sendData} />
                <Link to="/signup">Don't have an account?</Link>
            </form>
        </div>
    )
}

export default Login;  