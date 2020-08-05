import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import './UpdateEvent.css'

function UpdateEvent () {
    const history = useHistory()
    let { eventId } = useParams();

    const onUpdate = () => {
        //patch to server
        history.push(`/map/event/${eventId}`)
    }

    const declineUpdate = () => {
        history.goBack()
    }
    
    return (
        <form className="event">
            <label htmlFor="title">Title</label>
            <input type="text" placeholder="Title of appointment"/><br/>
            <label htmlFor="address">Address</label>
            <input type="text" placeholder="Address of appointment"/><br/>
            <label htmlFor="start_time">Start</label>
            <input type="datetime-local" id="start_time" name="start_time" placeholder="Appointment Start Time" required/><br/>
            <label htmlFor="end_time">End</label>
            <input type="datetime-local" id="end_time" name="end_time" placeholder="Appointment End Time"/><br/>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" placeholder="Appointment Description"></textarea><br/>
            <div>
                <button type="submit" onClick={() => onUpdate()}>Check</button>
                <button type="button" onClick={() => declineUpdate()}>X</button><br/><br/>
            </div>
        </form>
    )
}

export default UpdateEvent