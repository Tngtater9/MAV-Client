import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import LandingPage from './Components/LandingPage/LandingPage'
import LoginPage from './Routes/LoginPage/LoginPage'
import SignUp from './Components/SignUp/signup'
import Map from './Components/Map/Map'
import Header from './Components/Header/Header'
import EventContextProvider from './Context/EventContext';
import DateContextProvider from './Context/DateContext'
import PrivateRoute from './Utilis/PrivateRoute'
import PublicRoute from './Utilis/PublicRoute'

class App extends Component {

  render () {
    return (
      <div className="App">
        <DateContextProvider>
          <Header/>
          <Switch>
            <Route exact path='/' component={LandingPage}/>
            <PublicRoute path='/signup' component={SignUp}/>
            <PublicRoute path="/login" component={LoginPage}/>
            <PrivateRoute path='/map'>
              <EventContextProvider>
                <Map/>
              </EventContextProvider>                
            </PrivateRoute>
          </Switch>
        </DateContextProvider>  
      </div>
    )
  }
}

export default App;
