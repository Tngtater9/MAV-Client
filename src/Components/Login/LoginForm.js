import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './login.css'
import TokenService from '../../services/TokenService'

// function LoginForm (props) {
//     function handleSubmitBasicAuth (ev) {
//     ev.preventDefault();
//     const { username, password } = ev.target;

    

//     TokenService.saveAuthToken(
//       TokenService.makeBasicAuthToken(username.value, password.value)
//     );

//     username.value = "";
//     password.value = "";
//     props.onLoginSuccess();
//     }

//     return (
//         <form className="login-form" onSubmit={(ev) => handleSubmitBasicAuth(ev)}>
//             <h1>Log In</h1>
//             <label htmlFor="username">Username</label>
//             <input id="username" name="username" type="text" placeholder="Username"/><br/>
//             <label htmlFor="password">Password</label>
//             <input id="password" name="password" type="password" placeholder="password"/><br/><br/>
//             <button type="submit">Log In</button>
//         </form>
//     )
// }

class LoginForm extends Component {
    handleSubmitBasicAuth = (ev) => {
        ev.preventDefault();
        const { username, password } = ev.target;
    
        this.props.setUser(username.value)
    
        TokenService.saveAuthToken(
          TokenService.makeBasicAuthToken(username.value, password.value)
        );
    
        username.value = "";
        password.value = "";
        this.props.onLoginSuccess();

        this.props.history.push('/map')
    }

    render() {
        return (
            <form className="login-form" onSubmit={(ev) => this.handleSubmitBasicAuth(ev)}>
                <h1>Log In</h1>
                <label htmlFor="username">Username</label>
                <input id="username" name="username" type="text" placeholder="Username"/><br/>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" placeholder="password"/><br/><br/>
                <button type="submit">Log In</button>
            </form>
        )
    }
}

export default withRouter(LoginForm)