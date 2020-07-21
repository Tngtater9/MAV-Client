import React, { useState, Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import LandingPage from './Components/LandingPage/LandingPage'
import LoginPage from './Routes/LoginPage/LoginPage'
import SignUp from './Components/SignUp/signup'
import Map from './Components/Map/Map'
import Header from './Components/Header/Header'

// function App () {
//   const [username, useUsername] = useState(null)

//   return (
//   <div className="App">
//     <Header username={username}/>
//       <Switch>
//         <Route exact path='/' component={LandingPage}/>
//         <Route path='/signup' component={SignUp}/>
//         <Route path="/login" render={()=><LoginPage setUsername={()=>useUsername}/>}/>
//         <Route path='/map' component={Map}/>
//       </Switch>
//   </div>
// )
// }

class App extends Component {
  state = {
    name: null
  }

  setUser = (username) => {
    this.setState({name: username})
  }

  render () {
    return (
      <div className="App">
        <Header username={this.name}/>
          <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route path='/signup' component={SignUp}/>
            <Route path="/login" render={()=><LoginPage setUser={this.setUser}/>}/>
            <Route path='/map' component={Map}/>
          </Switch>
      </div>
    )
  }
}

export default App;
