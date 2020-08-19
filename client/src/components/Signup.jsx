import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import axios from 'axios';

const Signup = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    let sendData = (event) => {
        event.preventDefault();
        axios.post('/signup', user)
            .then(res => {
                if (res.data.success)
                    history.push('/login')
                else
                    history.push('/signup')
            }).catch(error => {
                console.log(error)
            }
            );
    }

    const onChangeUsername = (event) => {
        setUser({ ...user, username: event.target.value })
    }

    const onChangeEmail = (event) => {
        setUser({ ...user, email: event.target.value })
    }

    const onChangePassword = (event) => {
        setUser({ ...user, password: event.target.value })
    }
    return (
        <div className="loginForm">
            <form action='/signup' method='post'>
                <input
                    className="inputLogin"
                    type="text"
                    name="login"
                    placeholder="login"
                    value={user.login}
                    onChange={onChangeUsername}
                />
                <input
                    className="inputLogin"
                    type="email"
                    name="email"
                    placeholder="email"
                    value={user.email}
                    onChange={onChangeEmail}
                />
                <input
                    className="inputLogin"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={user.password}
                    onChange={onChangePassword}
                />
                <input
                    className="inputLogin"
                    type="submit"
                    value="Sign Up"
                    onClick={sendData}
                />
                 <Link to="/login">Already have an account?</Link>
            </form>
        </div>
    )
}

export default Signup;