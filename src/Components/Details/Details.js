import React, { useContext, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { EventContext } from '../../Context/EventContext'
import { DateContext } from '../../Context/DateContext'
import ApptApiService from '../../services/ApptApiService'
import './Details.css'

function Details () {
  const { setSelectedEvents, setEvents, selected, setSelected } = useContext(
    EventContext
  )
  const { setDate } = useContext(DateContext)
  const { eventId } = useParams()

  useEffect(() => {
    ApptApiService.getAllAppt().then(appts => {
      const event = appts.find(e => e.id === eventId)

      const start = new Date(event.start_time)
      let year = start.getFullYear()
      let month = start.getMonth() + 1
      let day = start.getDate()
      let stringStart = String(month) + '/' + String(day) + '/' + String(year)
      let selected = appts.filter(event => {
        let start = new Date(event.start_time)
        let year = start.getFullYear()
        let month = start.getMonth() + 1
        let day = start.getDate()
        let eventStart = String(month) + '/' + String(day) + '/' + String(year)
        return eventStart === stringStart
      })
      selected.sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
      setDate(stringStart)
      setEvents(appts)
      setSelectedEvents(selected)
      setSelected(event)
    })
  }, [])

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
      {selected ? (
        <section className='details'>
          <button onClick={() => closeDetails()}>X</button>
          <div>
            <h1>{selected.title}</h1>
            <p>
              <strong>Address:</strong>
              {selected.address}
            </p>
            <p>
              <strong>Start:</strong>
              {selected.start_time.toString()}
            </p>
            {selected.end_time && (
              <p>
                <strong>End:</strong>
                {selected.end_time.toString()}
              </p>
            )}
            {selected.description && (
              <p>
                <strong>Details:</strong>
                {selected.description}
              </p>
            )}
          </div>
          <div>
            <button onClick={() => toDeleteEvent()}>Delete</button>
            <button onClick={() => toEditDetails()}>Edit</button>
          </div>
        </section>
      ) : null}
    </div>
  )
}

export default Details
