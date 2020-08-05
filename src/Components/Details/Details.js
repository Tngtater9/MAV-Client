import React, {useContext} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { EventContext } from '../../Context/EventContext';
import './Details.css'


function Details () {
    const {events, selected, setSelected } = useContext(EventContext) 
    let { eventId } = useParams()
    const event = events.find(e => e.eventId === Number(eventId))
    setSelected(event)

    const history = useHistory()
    const closeDetails = () => {
        setSelected(null)
        history.push('/map')
    }

    const toEditDetails = () => {
        history.push(`/map/update/${eventId}`)
    }

    const toDeleteEvent = () => {
        history.push(`/map/delete/${eventId}`)
    }

    return (
        <div>
            {selected ? (<section className="details">
            <button onClick={() => closeDetails()}>X</button>
            
                <h1>{selected.title}</h1>
                <p>{selected.address}</p>
                <p>{selected.startDate}</p>
                <p>{selected.start_time}</p>
                <p>{selected.endDate}</p>
                <p>{selected.end_time}</p>
                <p>{selected.description}</p>
            <div>
                <button onClick={() => toDeleteEvent()}>Delete</button>
                <button onClick={() => toEditDetails()}>Edit</button>
            </div></section>)
            : null}
            </div>
            
        
    )
}


export default Details