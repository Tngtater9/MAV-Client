import React from 'react'
import './signup.css'

function SignUp () {
    return (
        <form className="signup-form">
            <h1>Sign Up</h1>
            <label forHTML="dname">What is your name?</label>
            <input id="dname" name="dname" type="text" required/><br/>
            <label forHTML="email">What is your email?</label>
            <input id="email" name="email" type="email" required/><br/>
            <label forHTML="company">Company</label>
            <input id="company" name="company" type="text"/><br/>
            <label forHTML="username">Username</label>
            <input id="username" name="username" type="text" required/><br/>
            <label forHTML="password">Password</label>
            <input id="password" name="password" type="password" required/><br/>
            <button type="submit">Sign Up</button><br/><br/>
        </form>
    )
}

export default SignUp