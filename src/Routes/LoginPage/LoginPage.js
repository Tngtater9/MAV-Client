import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import LoginForm from '../../Components/Login/LoginForm'
import UserContextProvider from '../../Context/UserContext'

const LoginPage = () => {
  const location = useLocation()
  const history = useHistory()

  function handleLoginSuccess () {
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  return (
    <section className='LoginPage'>
      <UserContextProvider>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </UserContextProvider>
    </section>
  )
}

export default LoginPage