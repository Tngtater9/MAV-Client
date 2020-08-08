import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import './Details.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { EventContext } from '../../Context/EventContext'
import { DateContext } from '../../Context/DateContext'
import ApptApiService from '../../services/ApptApiService'

function Confirmation () {
  const history = useHistory()
  const { eventId } = useParams()
  const { events, setEvents, setSelectedEvents } = useContext(EventContext)
  const { date, setDate, setPickerDate } = useContext(DateContext)

  const acceptDelete = () => {
    ApptApiService.deleteAppt(eventId).then(() => {
      const result = events.filter(e => e.id !== eventId)
      let selected = result.filter(event => {
        let start = new Date(event.start_time)
        let year = start.getFullYear()
        let month = start.getMonth() + 1
        let day = start.getDate()
        let stringStart = String(month) + '/' + String(day) + '/' + String(year)
        return stringStart === date
      })
      selected.sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
      let inputDate = new Date(date)
      let year = String(inputDate.getFullYear())
      let month = String(inputDate.getMonth() + 1)
      let day = String(inputDate.getDate())
      if (month.length === 1) {
        month = '0' + month
      }
      if (day.length === 1) {
        day = '0' + day
      }
      let stringInputDate = month + '/' + day + '/' + year
      setPickerDate(stringInputDate)
      setSelectedEvents(selected)
      setEvents(result)
      setDate(date)
      history.push('/map')
    })
  }

  const declineDelete = () => {
    history.goBack()
  }

  return (
    <article>
      <p>Are you sure?</p>
      <div>
        <button className="btn" onClick={() => acceptDelete()}><FontAwesomeIcon icon={faCheck} /></button>
        <button className="btn" onClick={() => declineDelete()}><FontAwesomeIcon icon={faTimes} /></button>
      </div>
    </article>
  )
}

export default Confirmation
