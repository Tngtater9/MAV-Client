import React from 'react'
import { useHistory } from 'react-router-dom'
import LoginForm from '../../Components/Login/LoginForm'

const LoginPage = () => {
  const history = useHistory()

  function handleLoginSuccess () {
    
    history.push('/map')
  }

  return (
    <section className='LoginPage'>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </section>
  )
}

export default LoginPage