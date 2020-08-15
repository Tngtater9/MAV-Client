import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './signup.css'
import AuthApiService from '../../services/AuthApiService'

function SignUp () {
  const [error, setError] = useState(null)
  const history = useHistory()

  const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&])[\S]/

  const validatePassword =  (password) => {
    if (password.length < 8) {
      return 'Password must be longer than 8 characters'
    }
    if (password.length > 72) {
      return 'Password must be less than 72 characters'
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces'
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain 1 upper case, lower case, number and special character'
    }
    return null
  }

  const handleSignup = e => {
    e.preventDefault()

    const signup = document.getElementById('signup')
    let formData = new FormData(signup)

    let newUser = {}

    for (let key of formData.keys()) {
      newUser[key] = formData.get(key)
    }

    const passwordError = validatePassword(newUser.password)

    if(passwordError){
      return setError({error: passwordError})
    }
    
    AuthApiService.postUser(newUser)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.json().error)
        }
        return res.json()
      })
      .then(() => {
        history.push('/login')
      })
      .catch(res => setError({ error: res.error }))
  }

  return (
    <form
      id='signup'
      name='signup'
      className='signup-form'
      onSubmit={e => handleSignup(e)}
    >
      <h1>Sign Up</h1>
      {error && <p className='error'>{error.error}</p>}
      {(error && error.error === undefined) && <p className='error'>Username is taken.</p>}
      <label htmlFor='visible_name'>What is your name?</label>
      <input id='visible_name' name='visible_name' type='text' required />
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
      <button type='submit'>Sign Up</button>
      <br />
      <br />
    </form>
  )
}

export default SignUp
