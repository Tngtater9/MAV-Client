import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './AddEvent.css'
import { EventContext } from '../../Context/EventContext'
import { DateContext } from '../../Context/DateContext'
import ApptApiService from '../../services/ApptApiService'
import moment from 'moment-with-locales-es6'

function AddEvent (props) {
  const history = useHistory()
  const {
    selectedEvents,
    setSelectedEvents,
    newEvent,
    setNewEvent
  } = useContext(EventContext)
  const { setDate } = useContext(DateContext)

  const [inputTitle, setTitle] = useState('')
  const [inputStart_time, setStart_time] = useState('')
  const [inputEnd_time, setEnd_time] = useState('')
  const [inputDescription, setDescription] = useState('')
  const [error, setError] = useState(null)

  const cancelAdd = e => {
    e.preventDefault()
    setNewEvent(null)
    history.push('/map')
    window.location.reload(false)
  }

  const handleAdd = e => {
    e.preventDefault()

    const addForm = document.getElementById('addForm')
    let formData = new FormData(addForm)

    let appt = {}

    for (let key of formData.keys()) {
      appt[key] = formData.get(key)
    }
    const newStart = new Date(appt.start_time)
    appt.start_time = newStart
    const newEnd = new Date(appt.end_time)
    appt.end_time = newEnd

      appt = {
      ...newEvent,
      ...appt
    }
    if(appt.title === '' || appt.start_time === ''){
      return setError('Missing title or start time cancel and try again')
    }
    ApptApiService.postAppt(appt)
      .then(res =>
        !res.ok
          ? res.json().then(e => {
              setError(e.message)
            })
          : res.json()
      )
      .then(newAppt => {
        setSelectedEvents(...selectedEvents, newAppt)
        setNewEvent(null)
        setTitle('')
        setStart_time('')
        setEnd_time('')
        setDescription('')

        const apptDate = new Date(newAppt.start_time)
        let showDate = new Date(apptDate)
        showDate.setDate(apptDate.getDate())
        showDate = moment(showDate).format('L')
        setDate(showDate)
        console.log('showDate', showDate)
        console.log('new', newAppt)
        props.changeViewport({
          ...props.currentViewport,
          longitude: Number(newAppt.longitude),
          latitude: Number(newAppt.latitude)
        })
        history.push('/map')
        window.location.reload(false)
      })
      .catch(err => setError(err.message))
  }

  return (
    <form id="addForm" name="addForm" className='event'>
      <h2>Add Form</h2>
      {error && <p>{error}</p>}
      <label htmlFor='title'>Title</label>
      <input
        type='text'
        id='title'
        name='title'
        value={inputTitle}
        onChange={e => setTitle(e.target.value)}
        placeholder='Title of appointment'
        required
      />
      <br />
      <label htmlFor='start_time'>Start</label>
      <input
        type='datetime-local'
        id='start_time'
        name='start_time'
        value={inputStart_time}
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
        value={inputEnd_time}
        onChange={e => setEnd_time(e.target.value)}
        placeholder='Appointment End Time'
      />
      <br />
      <label htmlFor='description'>Description</label>
      <textarea
        id='description'
        name='description'
        value={inputDescription}
        onChange={e => setDescription(e.target.value)}
        placeholder='Appointment Description'
      ></textarea>
      <br />
      <div>
        <button type='submit' onClick={e => handleAdd(e)}>
          Check
        </button>
        <button
          onClick={e => {
            cancelAdd(e)
            setNewEvent(null)
          }}
        >
          X
        </button>
        <br />
        <br />
      </div>
    </form>
  )
}

export default AddEvent
