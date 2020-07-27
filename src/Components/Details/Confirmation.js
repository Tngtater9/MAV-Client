import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import './Details.css'
import { EventContext } from '../../Context/EventContext';

function Confirmation () {
    const history = useHistory()
    const { eventId } = useParams()  
    const { events, setEvents } = useContext(EventContext)
   
    const acceptDelete = () => {
        const result = events.filter(event=>event.eventId !== Number(eventId) )
        setEvents(result)
        history.push('/map')
    }

    const declineDelete = () => {
        history.goBack()
    }

    return (
        <article>
            <p>Are you sure?</p>
            <div>
                <button onClick={() => acceptDelete()}>Check</button>
                <button onClick={() => declineDelete()}>X</button>
            </div>
        </article>
    ) 
}

export default Confirmation