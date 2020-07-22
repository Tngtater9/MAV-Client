import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import AddEvent from '../../Components/AddEvent/AddEvent'
import SearchAdd from '../../Components/AddEvent/SearchAdd'
import UpdateEvent from '../../Components/Update/UpdateEvent'

class EventsSection extends Component {
    state = {
        address: null
    }

    setAddress = (add) => {
        this.setState({address: add})
    }

    render () {
        return (
            <section>
                <Switch>
                    <Route path='/map' component={SearchAdd}/>
                    <Route path='/map/event/add' component={AddEvent}/>
                    <Route path='/map/event/update/:eventId' component={UpdateEvent}/>
                </Switch>
            </section>
        )
    }
}

export default EventsSection