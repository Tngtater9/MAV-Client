import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import LandingPage from './Components/LandingPage/LandingPage'
import LoginPage from './Routes/LoginPage/LoginPage'
import SignUp from './Components/SignUp/signup'
import Map from './Components/Map/Map'
import Header from './Components/Header/Header'
import EventContextProvider from './Context/EventContext';
import UserContextProvider from './Context/UserContext'
import DateContextProvider from './Context/DateContext'

class App extends Component {

  render () {
    return (
      <div className="App">
        <UserContextProvider>
          <DateContextProvider>
            <Header/>
            <Switch>
              <Route exact path='/' component={LandingPage}/>
              <Route path='/signup' component={SignUp}/>
              <Route path="/login" component={LoginPage}/>
              <Route path='/map'>
                <EventContextProvider>
                  <Map/>
                </EventContextProvider>
                
              </Route>
            </Switch>
          </DateContextProvider>
        </UserContextProvider>    
      </div>
    )
  }
}

export default App;
