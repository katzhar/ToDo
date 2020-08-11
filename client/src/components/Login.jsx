import React from 'react'

const Login = () => {

    return (
        <div>
            <form>
                <div>
                    <label for="uname"><b>Username </b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required /><br />
                    <label for="psw"><b>Password </b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required />
                    <button type="submit">Login</button>
                </div>
                <span class="psw"><a href="#">sign up</a></span>
            </form>
        </div>
    )
}

export default Login;