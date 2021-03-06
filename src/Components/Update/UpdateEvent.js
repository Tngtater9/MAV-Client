import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import './UpdateEvent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { EventContext } from '../../Context/EventContext'
import { DateContext } from '../../Context/DateContext'
import ApptApiService from '../../services/ApptApiService'

function UpdateEvent () {
  const history = useHistory()
  let { apptId } = useParams()
  const { setSelected, setSelectedEvents } = useContext(
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
      const event = appts.find(e => e.id === apptId)

      //Get selected event start time as a string to set Date
      const start = new Date(event.start_time)
      let year = String(start.getFullYear())
      let month = String(start.getMonth() + 1)
      let day = String(start.getDate())
      let hour = String(start.getHours())
      let min = String(start.getMinutes())
      let stringStart = month + '/' + day + '/' + year
      
      //get event start time as a string compatible with the browser datetime input
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
      event.start_time = stringStartWTime
      
      //get event end time as string compatible with browser datetime input
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

      //filter for events that also occur on the selected event day
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
      setTitle(event.title)
      setAddress(event.address)
      setStart_time(event.start_time)
      setEnd_time(event.end_time)
      setDescription(event.description)
    })
  }, [])

  const onUpdate = e => {
    e.preventDefault()

    //get form data
    const updateForm = document.getElementById('updateForm')
    let formData = new FormData(updateForm)

    let appt = {}

    //parse form data into object
    for (let key of formData.keys()) {
      appt[key] = formData.get(key)
    }

    
    const newStart = new Date(appt.start_time)
    appt.start_time = newStart
    const newEnd = new Date(appt.end_time)
    appt.end_time = newEnd

    //if new address search for it to add geolocation to appointment and update appointment
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
          ApptApiService.updateAppt(apptId, appt)
        })
        .then(() => {
          //set date in header          
          const start = appt.start_time
          let year = start.getFullYear()
          let month = start.getMonth() + 1
          let day = start.getDate()
          let stringStart =
            String(month) + '/' + String(day) + '/' + String(year)

          setDate(stringStart)
          setSelectedEvents(selectedEvents => selectedEvents.map(e => (e.id === apptId ? appt : e)))
          setSelected(appt)
          history.push(`/map/appt/${apptId}`)
        })
        .catch(err => {
          setError({error: err.error})
        })
    } else {
      //otherwise just update the appointment
      ApptApiService.updateAppt(apptId, appt)
        .then(() => {
          //set date in header
          const start = appt.start_time
          let year = start.getFullYear()
          let month = start.getMonth() + 1
          let day = start.getDate()
          let stringStart =
            String(month) + '/' + String(day) + '/' + String(year)

          setDate(stringStart)
          setSelectedEvents(selectedEvents => selectedEvents.map(e => (e.id === apptId ? appt : e)))
          setSelected(appt)
          history.push(`/map/appt/${apptId}`)
        })
        .catch(err => {
          setError({error: err.error})
        })
    }
  }

  const declineUpdate = () => {
    history.goBack()
  }

  return (
    <form id='updateForm' name='updateForm' className='event'>
      <h2>Update Form</h2>
      {error && <p className="error">{error.error}</p>}
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
        <button className="btn" type='submit' onClick={e => onUpdate(e)}>
          <FontAwesomeIcon icon={faCheck} />
        </button>
        <button className="btn" type='button' onClick={() => declineUpdate()}>
        <FontAwesomeIcon icon={faTimes} />
        </button>
        <br />
        <br />
      </div>
    </form>
  )
}

export default UpdateEvent
