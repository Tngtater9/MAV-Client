import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './header.css'
import TokenService from '../../services/TokenService'

export default class Header extends Component {
  state = {
      toggle:false,
      date:null
  }
  Toggle = () => {
      this.setState({...this.state, toggle:!this.state.toggle})
  }

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
  }
  render() {
    return (
      <header className="App-header">
        <div>
          <button onClick={this.Toggle} className="header">MAV</button>
          <nav className={this.state.toggle ? "nav-links" : "hidden"}>
            <p>{this.props.username}</p>
            <Link to="/">About</Link>
            <Link onClick={() => this.handleLogoutClick()} to='/'>Logout</Link>
          </nav>
        </div>
        {TokenService.hasAuthToken() ? (
          <div className="date">
            <p>{this.state.date}</p>
            <input type="date" className="date" onChange={(e) => {this.setState({...this.state, date: e.target.value})}}/>
          </div>
        ) : (
          <div className="login">
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log in</Link>
          </div>
        )}
      </header>
      );
  }
}

// export default Header

