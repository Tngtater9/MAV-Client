import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import './AddEvent.css'
import { EventContext } from '../../Context/EventContext'
import { DateContext } from '../../Context/DateContext'
import ApptApiService from '../../services/ApptApiService'
import moment from 'moment-with-locales-es6'

function AddEvent (props) {
    const history = useHistory()
    const { events, setEvents, newEvent, setNewEvent } = useContext(EventContext)
    const { setDate } = useContext(DateContext)

    const cancelAdd = (e) => {
        e.preventDefault()
        setNewEvent(null)
        history.push('/map')
    }

    const handleAdd = (e) => {
        e.preventDefault()
        console.log(e.target)
        const { title, start_time, end_time, description } = e.target.parentNode.parentNode

        ApptApiService.postAppt({
            ...newEvent,
            title: title.value, 
            start_time: start_time.value, 
            end_time: end_time.value, 
            description: description.value
        })
            .then(newAppt => {
                setEvents(...events, newAppt)
                setNewEvent(null)
                history.push('/map')
                window.location.reload(false)
                const apptDate = new Date(newAppt.start_time)
                const showDate = moment(apptDate).format('L')
                setDate(showDate)
                props.changeViewport({...props.currentViewport, longitude: newAppt.longitude, latitude: newAppt.latitude})
            }) 
    }

    return (
        <form className="event">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" placeholder="Title of appointment" required/><br/>
            <label htmlFor="start_time">Start</label>
            <input type="datetime-local" id="start_time" name="start_time" placeholder="Appointment Start Time" required/><br/>
            <label htmlFor="end_time">End</label>
            <input type="datetime-local" id="end_time" name="end_time" placeholder="Appointment End Time"/><br/>
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