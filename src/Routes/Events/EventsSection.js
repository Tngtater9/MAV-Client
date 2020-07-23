import React, { useState } from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'
import AddEvent from '../../Components/AddEvent/AddEvent'
import SearchAdd from '../../Components/AddEvent/SearchAdd'
import UpdateEvent from '../../Components/Update/UpdateEvent'
import Details from '../../Components/Details/Details'

function EventsSection () {
    const [address, setAddress] = useState()

    let { path } = useRouteMatch();
    return (
        <section>
            <Switch>
                <Route exact path={path} component={SearchAdd}/>
                <Route path={`${path}/add`} component={AddEvent}/>
                <Route path={`${path}/update/:eventId`} component={UpdateEvent}/>
                <Route path={`${path}/:eventId`} component={Details}/>
            </Switch>
        </section>
    )
}


export default EventsSection