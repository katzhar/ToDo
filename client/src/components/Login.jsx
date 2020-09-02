import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { loginUserReq } from '../utils/requests';
import style from '../css/login.module.css';

const Login = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const sendData = (event) => {
        event.preventDefault();
        loginUserReq(user).then(res => {
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

    const onChangeValue = (param, value) => {
        setUser({ ...user, [param]: value })
    }

    return (
        <div className={style.loginForm}>
            <form action='/login' method='post'>
                <input
                    className={style.inputLogin}
                    name='username'
                    type="text"
                    placeholder="username"
                    onChange={(e) => onChangeValue('username', e.target.value)} />
                <input
                    className={style.inputLogin}
                    name="password"
                    type="password"
                    placeholder="password"
                    onChange={(e) => onChangeValue('password', e.target.value)} />
                <input
                    className={style.inputLogin}
                    type="submit"
                    value="Log In"
                    onClick={sendData} />
                <Link to="/signup">Don't have an account?</Link>
            </form>
        </div>
    )
}

export default Login;  