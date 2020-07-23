import React, { createContext, useState } from 'react'
import PLACES from '../sample-locations'

export const EventContext = createContext()

function EventContextProvider (props) {
const [events, setEvents] = useState(PLACES)
const [newEvent, setNewEvent] = useState(null)
const [selected, setSelected] = useState(null)

    return (
        <EventContext.Provider value={{events, setEvents, newEvent, setNewEvent, selected, setSelected}}>
            {props.children}
        </EventContext.Provider>
    )
}

export default EventContextProvider