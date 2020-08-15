import React, { useState, useContext } from 'react'
import { Link, Switch, Route, useHistory } from 'react-router-dom'
import './header.css'
import TokenService from '../../services/TokenService'
import { DateContext } from '../../Context/DateContext'

function handleLogoutClick () {
  console.log('Ihaveloggedout')
  TokenService.clearAuthToken()
}

function formatDate (date) {
  //format day to be MM/DD/YYYY from YYYY-MM-DD
  const result = []
  const separate = date.split('-')

  let month = separate[1]
  if (month[0] === '0') {
    month = month[1]
  }
  let day = separate[2]
  if (day[0] === '0') {
    day = day[1]
  }
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
  const { date, setDate } = useContext(DateContext)
  const [toggle, setToggle] = useState(false)
  const history = useHistory()
  const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const UTCday = new Date(date).getUTCDay()


  return (
    <header className='App-header'>
      <div>
        <button onClick={() => setToggle(!toggle)} className='header'>
          MAV
        </button>
        {TokenService.hasAuthToken() ? (
          <nav className={toggle ? 'nav-links' : 'hidden'}>
            <Link to='/' onClick={() => setToggle(false)}>
              About
            </Link>
            <Link
              to='/map'
              onClick={() => {
                history.push('/map')
              }}
            >
              View today's appointments
            </Link>
            <Link to='/' onClick={() => {handleLogoutClick();setToggle(false)}}>
              Logout
            </Link>
          </nav>
        ) : null}
      </div>
      <Switch>
        <Route exact path='/'>
          {TokenService.hasAuthToken() ? (
            <Link to='/map'>Go to viewer</Link>
          ) : (
            <div className='login'>
              <Link to='/signup'>Sign Up</Link>
              <Link to='/login'>Log in</Link>
            </div>
          )}
        </Route>
        <Route path='/map'>
          <form className='date'>  
              {/* Conditionally render name of day or instructions  */}
              <label htmlFor='date'>{date ? day[UTCday] : 'Enter date to view:'}</label><br/>
              <input
                type='date'
                id='date'
                name='date'
                className='date'
                onChange={e => {
                  setDate(formatDate(e.target.value).join(''));
                }}
              />
          </form>
        </Route>
        <Route path='/signup'>
          {!TokenService.hasAuthToken() && (
            <div className='login'>
              <Link to='/signup'>Sign Up</Link>
              <Link to='/login'>Log in</Link>
            </div>
          )}
        </Route>
        <Route path='/login'>
          {!TokenService.hasAuthToken() && (
            <div className='login'>
              <Link to='/signup'>Sign Up</Link>
              <Link to='/login'>Log in</Link>
            </div>
          )}
        </Route>
      </Switch>
    </header>
  )
}

export default Header
