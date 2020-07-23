import React from 'react'
import './signup.css'

function SignUp () {
    return (
        <form className="signup-form">
            <h1>Sign Up</h1>
            <label htmlFor="dname">What is your name?</label>
            <input id="dname" name="dname" type="text" required/><br/>
            <label htmlFor="email">What is your email?</label>
            <input id="email" name="email" type="email" required/><br/>
            <label htmlFor="company">Company</label>
            <input id="company" name="company" type="text"/><br/>
            <label htmlFor="timezone">Timezone</label>
            <input id="timezone" name="timezone" type="text"/><br/>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" required/><br/>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required/><br/>
            <button type="submit">Sign Up</button><br/><br/>
        </form>
    )
}

export default SignUp