import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './signup.css'
import AuthApiService from '../../services/AuthApiService'

function SignUp () {
  const [error, setError] = useState(null)
  const history = useHistory()

  const handleSignup = e => {
    e.preventDefault()

    const signup = document.getElementById('signup')
    let formData = new FormData(signup)

    let newUser = {}

    for (let key of formData.keys()) {
      newUser[key] = formData.get(key)
    }

    AuthApiService.postUser(newUser).then(res =>
      !res.ok ? res.json().then(e => setError({ error: e.error })) : res.json()
    ).then(() => {
        history.push('/login')
    })
    .catch(err => setError({ error: err.error }))
  }

  return (
    <form id='signup' name='signup' className='signup-form'>
      <h1>Sign Up</h1>
      {error && <p className='error'>{error.error}</p>}
      <label htmlFor='dname'>What is your name?</label>
      <input id='dname' name='dname' type='text' required />
      <br />
      <label htmlFor='email'>What is your email?</label>
      <input id='email' name='email' type='email' required />
      <br />
      <label htmlFor='company'>Company</label>
      <input id='company' name='company' type='text' />
      <br />
      <label htmlFor='username'>Username</label>
      <input id='username' name='username' type='text' required />
      <br />
      <label htmlFor='password'>Password</label>
      <input id='password' name='password' type='password' required />
      <br />
      <button type='submit' onSubmit={e => handleSignup(e)}>
        Sign Up
      </button>
      <br />
      <br />
    </form>
  )
}

export default SignUp
