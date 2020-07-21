import React, { Component } from 'react'
import LoginForm from '../../Components/Login/LoginForm'

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <section className='LoginPage'>
        <LoginForm
            setUser={this.props.setUser}
            onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    )
  }
}