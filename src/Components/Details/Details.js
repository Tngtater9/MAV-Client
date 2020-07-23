import React, {useContext} from 'react'
import { useParams } from 'react-router-dom'
import { EventContext } from '../../Context/EventContext';


function Details () {
    const {selected} = useContext(EventContext) 
    let { eventId } = useParams();
    return (
        <section>
            <button>X</button>
            {selected ? (
            <div>
                <h1>{selected.title}Title</h1>
                <p>{selected.address}Address</p>
                <p>{selected.startDate}Start Date</p>
                <p>{selected.startTime}Start Time</p>
                <p>{selected.endDate}End Date</p>
                <p>{selected.endTime}End Time</p>
                <p>{selected.description}Description</p>
            </div>)
            :(<p>Nothing selected</p>)}
            
            <div>
                <button>Delete</button>
                <button>Edit</button>
            </div>
        </section>
    )
}


export default Details