import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import './login.css'
import { UserContext } from '../../Context/UserContext'
import TokenService from '../../services/TokenService'
import AuthApiService from '../../services/AuthApiService'

function LoginForm (props) {
  const history = useHistory()
  const { setUser, setUserError, userError } = useContext(UserContext)

  const handleSubmit = (ev) => {
    ev.preventDefault()
    setUserError({ error: null })
    const { username, password } = ev.target

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        setUser(res.visible_name)

      })
      .catch(res => {
        setUserError({ error: res.error })
      })
  }

  return (
    <form className="login-form" onSubmit={(ev) => 
      {handleSubmit(ev); 
      props.onLoginSuccess(); 
      history.push('/map')}
      }>
      {userError && (<p className="error">{userError}</p>)}
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