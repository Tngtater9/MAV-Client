import React, { useState, useContext } from 'react'
import { Link, Switch, Route, useHistory } from 'react-router-dom'
import './header.css'
import TokenService from '../../services/TokenService'
import { UserContext } from '../../Context/UserContext'
import { DateContext } from '../../Context/DateContext'

function handleLogoutClick () {
  TokenService.clearAuthToken()
}

function formatDate (date) {
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
  const { user } = useContext(UserContext)
  const { date, setDate, pickerDate, setPickerDate } = useContext(DateContext)
  const [toggle, setToggle] = useState(false)
  const history = useHistory()

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
                window.location.reload(false)
              }}
            >
              View today's appointments
            </Link>
            <Link
              onClick={() => {
                handleLogoutClick()
                setToggle(false)
              }}
              to='/'
            >
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
            <p>{date}</p>
            <div className='date-ctrl'>
              <label htmlFor='date'>Enter date to view:</label>
              <input
                type='date'
                id='date'
                name='date'
                className='date'
                value={pickerDate}
                onChange={e => {
                  setDate(formatDate(e.target.value).join(''))
                  setPickerDate(e.target.value)
                }}
              />
            </div>
          </form>
        </Route>
        <Route path='/signup'>
          {TokenService.hasAuthToken() ? (
            <Link to='/map'>`Hello, ${user}`</Link>
          ) : (
            <div className='login'>
              <Link to='/signup'>Sign Up</Link>
              <Link to='/login'>Log in</Link>
            </div>
          )}
        </Route>
        <Route path='/login'>
          {TokenService.hasAuthToken() ? (
            <Link to='/map'>`Hello, ${user}`</Link>
          ) : (
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
