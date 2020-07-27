import React from 'react'
import { useHistory } from 'react-router-dom'
import './login.css'
import TokenService from '../../services/TokenService'

function handleSubmitBasicAuth (ev) {
    ev.preventDefault();
    const { username, password } = ev.target;

    TokenService.saveAuthToken(
      TokenService.makeBasicAuthToken(username.value, password.value)
    );

    username.value = "";
    password.value = "";
    
}

function LoginForm (props) {
    const history = useHistory()

    return (
        <form className="login-form" onSubmit={(ev) => 
            {handleSubmitBasicAuth(ev); 
            props.onLoginSuccess(); 
            history.push('/map')}
            }>
            <h1>Log In</h1>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" placeholder="Username"/><br/>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="password"/><br/><br/>
            <button type="submit">Log In</button>
        </form>
    )
}


export default LoginForm