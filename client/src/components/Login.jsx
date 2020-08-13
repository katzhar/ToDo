import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    let sendData = (event) => {
        event.preventDefault();
        axios.post('/login', user)
            .then(res => {
                console.log(res)
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
                <a href="/signup">Don't have an account?</a>
            </form>
        </div>
    )
}

export default Login;  