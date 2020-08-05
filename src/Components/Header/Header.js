import React, { useState, useContext } from 'react'
import { Link, Switch, Route, useHistory } from 'react-router-dom'
import './header.css'
import TokenService from '../../services/TokenService'
import { UserContext } from '../../Context/UserContext'
import { DateContext } from '../../Context/DateContext'

function handleLogoutClick  () {
    TokenService.clearAuthToken()
}

function formatDate (date) {
  const result = []
  const separate = date.split('-')
  
  const month = separate[1]
  const day = separate[2]
  const year = separate[0]
  result.push(month)
  result.push('/')
  result.push(day)
  result.push('/')
  result.push(year)
  result.join()
  
  return result
}

const Header = () => {
  const {user} = useContext(UserContext)
  const {date, setDate} = useContext(DateContext)
  const [toggle, setToggle] = useState(false)
  const history = useHistory()
  
  return (
    <header className="App-header">
      <div>
        <button onClick={() => setToggle(!toggle)} className="header">MAV</button>
        {TokenService.hasAuthToken() ? (
          <nav className={toggle ? "nav-links" : "hidden"}>
          <Link to="/">About</Link>
          <Link to="/map" onClick={() => {history.push('/map')
            window.location.reload(false)}}>Hello, {user}</Link>  
          <Link onClick={() => handleLogoutClick()} to='/'>Logout</Link>
          </nav>
          ): null}
      </div>
        <Switch>
          <Route exact path="/">
          {TokenService.hasAuthToken() ? (
          <Link to="/map">Go to viewer</Link>
          ) : (
            <div className="login">
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Log in</Link>
            </div>
          )}
          </Route>
          <Route path="/map">
            <form className="date">
              <p>{date}</p>
              <div className="date-ctrl">
                <label htmlFor="date">Enter date to view:</label>
                <input type="date" id="date" name="date" className="date" onChange={(e) => setDate(formatDate(e.target.value).join(''))}/>
              </div>
            </form>
          </Route>
          <Route path="/signup">
          {TokenService.hasAuthToken() ? (
          <Link to="/map">`Hello, ${user}`</Link>
          ) : (
            <div className="login">
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Log in</Link>
            </div>
          )}
          </Route>
          <Route path="/login">
          {TokenService.hasAuthToken() ? (
          <Link to="/map">`Hello, ${user}`</Link>
          ) : (
            <div className="login">
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Log in</Link>
            </div>
          )}
          </Route>
        </Switch>
    </header>
  );
  
}

export default Header

