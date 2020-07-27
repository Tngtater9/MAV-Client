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
            <label htmlFor="startDate">Start Date</label>
            <input type="text" id="startDate" name="startDate" placeholder="Appointment Start Date" onFocus="(this.type='date')"/><br/>
            <label htmlFor="startTime">Start Time</label>
            <input type="text" id="startTime" name="startTime" placeholder="Appointment Start Time" onFocus="(this.type='time')"/><br/>
            <label htmlFor="endDate">End Date</label>
            <input type="text" id="endDate" name="endDate" placeholder="Appointment End Date" onFocus="(this.type='date')"/><br/>
            <label htmlFor="endTime">End Time</label>
            <input type="text" id="endTime" name="endTime" placeholder="Appointment End Time" onFocus="(this.type='time')"/><br/>
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