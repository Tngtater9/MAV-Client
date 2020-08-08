import React from 'react'
import { useHistory } from 'react-router-dom'
import LoginForm from '../../Components/Login/LoginForm'
import UserContextProvider from '../../Context/UserContext'

const LoginPage = () => {
  const history = useHistory()

  function handleLoginSuccess () {
    
    history.push('/map')
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