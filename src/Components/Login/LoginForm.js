import React, { useState } from 'react'
import './login.css'
import TokenService from '../../services/TokenService'
import AuthApiService from '../../services/AuthApiService'

function LoginForm (props) {
  
  const [error, setError] = useState(null)

  const handleSubmit = (ev) => {
    ev.preventDefault()
    setError({ error: null })
    const { username, password } = ev.target

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
      })
      .then(() => props.onLoginSuccess())
      .catch(res => {
        setError({ error: res.error })
      })
  }

  return (
    <form className="login-form" onSubmit={(ev) => 
      handleSubmit(ev)
      }>
      <h1>Log In</h1>
      {error && (<p className="error">{error.error}</p>)}
      <label htmlFor="username">Username</label>
      <input id="username" name="username" type="text" placeholder="Username"/><br/>
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" placeholder="password"/><br/><br/>
      <button type="submit">Log In</button>
    </form>
  )
}


export default LoginForm