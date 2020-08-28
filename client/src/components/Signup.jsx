import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { signupUserReq } from '../utils/requests';

const Signup = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    const sendData = (event) => {
        event.preventDefault();
        signupUserReq(user).then(res => {
            if (res.data.success)
                history.push('/login')
            else
                history.push('/signup')
        }).catch(error => {
            console.log(error)
        }
        );
    }

    const onChangeValue = (param, value) => {
        setUser({ ...user, [param]: value })
    }

    return (
        <div className="loginForm">
            <form action='/signup' method='post'>
                <input
                    className="inputLogin"
                    type="text"
                    name="username"
                    placeholder="username"
                    onChange={(e) => onChangeValue('username', e.target.value)} />
                <input
                    className="inputLogin"
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={(e) => onChangeValue('email', e.target.value)} />
                <input
                    className="inputLogin"
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => onChangeValue('password', e.target.value)} />
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