import React, { createContext, useState } from 'react'

export const EventContext = createContext()

function EventContextProvider (props) {
  const [events, setEvents] = useState([])
  const [newEvent, setNewEvent] = useState(null)
  const [selectedEvents, setSelectedEvents] = useState([])
  const [selected, setSelected] = useState(null)

  return (
    <EventContext.Provider
      value={{
        events,
        setEvents,
        newEvent,
        setNewEvent,
        selected,
        setSelected,
        selectedEvents,
        setSelectedEvents
      }}
    >
      {props.children}
    </EventContext.Provider>
  )
}

export default EventContextProvider
