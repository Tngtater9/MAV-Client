import React, { Component } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import LoginForm from '../../Components/Login/LoginForm'
import UserContextProvider from '../../Context/UserContext'

// export default class LoginPage extends Component {
//   static defaultProps = {
//     location: {},
//     history: {
//       push: () => {},
//     },
//   }

//   handleLoginSuccess = () => {
//     const { location, history } = this.props
//     const destination = (location.state || {}).from || '/'
//     history.push(destination)
//   }

//   render() {
//     return (
//       <section className='LoginPage'>
//         <UserContextProvider>
//           <LoginForm onLoginSuccess={this.handleLoginSuccess} />
//         </UserContextProvider>
//       </section>
//     )
//   }
// }

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