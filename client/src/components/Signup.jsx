import React from 'react'

const Signup = () => {
    return (
        <div className="loginForm">
            <form >
                <input className="inputLogin" type="text" id="fname" name="firstname" placeholder="login" />
                <input className="inputLogin" type="email" id="email" name="email" placeholder="email" />
                <input className="inputLogin" type="password" id="lname" name="lastname" placeholder="password" />
                <input className="inputLogin" type="submit" value="Sign Up" /><a href="/login">Already have an account?</a>
            </form>
        </div>
    )
}

export default Signup;