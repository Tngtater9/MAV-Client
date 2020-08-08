import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import './UpdateEvent.css'
import { EventContext } from '../../Context/EventContext'
import { DateContext } from '../../Context/DateContext'
import ApptApiService from '../../services/ApptApiService'

function UpdateEvent () {
  const history = useHistory()
  let { eventId } = useParams()
  const { events, setEvents, setSelected, setSelectedEvents } = useContext(
    EventContext
  )
  const { setDate } = useContext(DateContext)

  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [start_time, setStart_time] = useState('')
  const [end_time, setEnd_time] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    ApptApiService.getAllAppt().then(appts => {
      const event = appts.find(e => e.id === eventId)

      const start = new Date(event.start_time)
      let year = String(start.getFullYear())
      let month = String(start.getMonth() + 1)
      let day = String(start.getDate())
      let hour = String(start.getHours())
      let min = String(start.getMinutes())
      let stringStart = month + '/' + day + '/' + year
      if (month.length === 1) {
        month = '0' + month
      }
      if (day.length === 1) {
        day = '0' + day
      }
      if (hour.length === 1) {
        hour = '0' + hour
      }
      if (min.length === 1) {
        min = '0' + min
      }
      let stringStartWTime =
        year + '-' + month + '-' + day + 'T' + hour + ':' + min
      if (event.end_time !== '') {
        const end = new Date(event.end_time)
        let year = String(end.getFullYear())
        let month = String(end.getMonth() + 1)
        let day = String(end.getDate())
        let hour = String(end.getHours())
        let min = String(end.getMinutes())
        if (month.length === 1) {
          month = '0' + month
        }
        if (day.length === 1) {
          day = '0' + day
        }
        if (hour.length === 1) {
          hour = '0' + hour
        }
        if (min.length === 1) {
          min = '0' + min
        }
        let stringEndWTime =
          year + '-' + month + '-' + day + 'T' + hour + ':' + min
        event.end_time = stringEndWTime
      }
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
      setTitle(event.title)
      setAddress(event.address)
      setStart_time(stringStartWTime)
      setEnd_time(event.end_time)
      setDescription(event.description)
    })
  }, [])

  const onUpdate = e => {
    e.preventDefault()
    const updateForm = document.getElementById('updateForm')
    let formData = new FormData(updateForm)

    let appt = {}

    for (let key of formData.keys()) {
      appt[key] = formData.get(key)
    }
    const newStart = new Date(appt.start_time)
    appt.start_time = newStart
    const newEnd = new Date(appt.end_time)
    appt.end_time = newEnd

    if (appt.address !== '') {
      let uri = `https://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_POSITIONSTACK_KEY}&limit=1&query=${appt.address}&output=json`
      fetch(uri)
        .then(response => response.json())
        .then(data => {
          appt = {
            ...appt,
            longitude: data.data[0].longitude,
            latitude: data.data[0].latitude
          }
          ApptApiService.updateAppt(eventId, appt)
        })
        .then(() => {
          const updatedEvents = events.map(e => (e.id === eventId ? appt : e))
          const start = appt.start_time
          let year = start.getFullYear()
          let month = start.getMonth() + 1
          let day = start.getDate()
          let stringStart =
            String(month) + '/' + String(day) + '/' + String(year)

          setDate(stringStart)
          setEvents(updatedEvents)
          setSelected(appt)
          history.push(`/map/event/${eventId}`)
        })
        .catch(err => {
          setError(err.message)
        })
    } else {
      ApptApiService.updateAppt(eventId, appt)
        .then(() => {
          const updatedEvents = events.map(e => (e.id === eventId ? appt : e))
          const start = appt.start_time
          let year = start.getFullYear()
          let month = start.getMonth() + 1
          let day = start.getDate()
          let stringStart =
            String(month) + '/' + String(day) + '/' + String(year)

          setDate(stringStart)
          setEvents(updatedEvents)
          setSelected(appt)
          history.push(`/map/event/${eventId}`)
        })
        .catch(err => {
          setError(err.message)
        })
    }
  }

  const declineUpdate = () => {
    history.goBack()
  }

  return (
    <form id='updateForm' name='updateForm' className='event'>
      <h2>Update Form</h2>
      {error && <p>{error}</p>}
      <label htmlFor='title'>Title</label>
      <input
        type='text'
        id='title'
        name='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder='Title of appointment'
      />
      <br />
      <label htmlFor='address'>Address</label>
      <input
        type='text'
        id='address'
        name='address'
        value={address}
        onChange={e => setAddress(e.target.value)}
        placeholder='Address of appointment'
      />
      <br />
      <label htmlFor='start_time'>Start</label>
      <input
        type='datetime-local'
        id='start_time'
        name='start_time'
        value={start_time}
        onChange={e => setStart_time(e.target.value)}
        placeholder='Appointment Start Time'
        required
      />
      <br />
      <label htmlFor='end_time'>End</label>
      <input
        type='datetime-local'
        id='end_time'
        name='end_time'
        value={end_time}
        onChange={e => setEnd_time(e.target.value)}
        placeholder='Appointment End Time'
      />
      <br />
      <label htmlFor='description'>Description</label>
      <textarea
        id='description'
        name='description'
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder='Appointment Description'
      ></textarea>
      <br />
      <div>
        <button type='submit' onClick={e => onUpdate(e)}>
          Check
        </button>
        <button type='button' onClick={() => declineUpdate()}>
          X
        </button>
        <br />
        <br />
      </div>
    </form>
  )
}

export default UpdateEvent
