import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import './AddEvent.css'
import { EventContext } from '../../Context/EventContext'

function AddEvent () {
    const history = useHistory()
    const { events, setEvents, newEvent, setNewEvent } = useContext(EventContext)

    const cancelAdd = (e) => {
        e.preventDefault()
        setNewEvent(null)
        history.push('/map')
    }

    const handleAdd = (e) => {
        e.preventDefault()
        console.log(e.target)
        const { title, startTime, endTime, description } = e.target.parentNode.parentNode

        setEvents([...events,{
            ...newEvent,
            eventId: events.length + 1,
            title: title.value, 
            startTime: startTime.value, 
            endTime: endTime.value, 
            description: description.value,
        }])
        //post to server
        history.push('/map')
        window.location.reload(false)
    }

    return (
        <form className="event">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" placeholder="Title of appointment" required/><br/>
            <label htmlFor="startTime">Start</label>
            <input type="datetime-local" id="startTime" name="startTime" placeholder="Appointment Start Time" required/><br/>
            <label htmlFor="endTime">End</label>
            <input type="datetime-local" id="endTime" name="endTime" placeholder="Appointment End Time"/><br/>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" placeholder="Appointment Description"></textarea><br/>
            <div>
                <button type="submit" onClick={(e) => handleAdd(e)}>Check</button>
                <button onClick={(e) => cancelAdd(e)}>X</button><br/><br/>
            </div>
        </form>
    )
}

export default AddEvent