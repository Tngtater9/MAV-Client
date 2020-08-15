import React, { useContext, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { EventContext } from '../../Context/EventContext'
import { DateContext } from '../../Context/DateContext'
import ApptApiService from '../../services/ApptApiService'
import './Details.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

function Details () {
  const { setSelectedEvents, selected, setSelected } = useContext(EventContext)
  const { setDate } = useContext(DateContext)
  const { apptId } = useParams()

  //format date for display
  function formatDisplayDate (date) {
    const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    if(date){
      let theDate = new Date(date)
      let showDay = theDate.getUTCDay()
      let showDate = theDate.getUTCDate()
      let month = theDate.getUTCMonth()
      let year = theDate.getUTCFullYear()
      let time = theDate.toLocaleTimeString('en-US')

      theDate = `${day[showDay]} ${month}/${showDate}/${year} ${time}`

      return theDate
    }
  }

  useEffect(() => {
    ApptApiService.getAllAppt().then(appts => {
      const event = appts.find(e => e.id === apptId)

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
    history.push(`/map/update/${apptId}`)
  }

  const toDeleteEvent = () => {
    history.push(`/map/delete/${apptId}`)
  }

  return (
    <div>
      {selected ? (
        <article className='details'>
          <button className="btn" onClick={() => closeDetails()}><FontAwesomeIcon icon={faTimesCircle} /></button>
          <div>
            <h1>{selected.title}</h1>
            <p>
              <strong>Address:</strong>
              {selected.address}
            </p>
            <p>
              <strong>Start:</strong>
              {formatDisplayDate(selected.start_time)}
            </p>
            {selected.end_time && (
              <p>
                <strong>End:</strong>
                {formatDisplayDate(selected.end_time)}
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
            <button className="btn" onClick={() => toDeleteEvent()}><FontAwesomeIcon icon={faTrashAlt} /></button>
            <button className="btn" onClick={() => toEditDetails()}><FontAwesomeIcon icon={faEdit} /></button>
          </div>
        </article>
      ) : null}
    </div>
  )
}

export default Details
