import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import './AddEvent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { EventContext } from '../../Context/EventContext'
import { UserContext } from '../../Context/UserContext'

function Search () {
  const [toggle, setToggle] = useState(false)
  const [inputAddress, setAddress] = useState('')
  const [error, setError] = useState(null)
  const { setNewEvent } = useContext(EventContext)
  const { user } = useContext(UserContext)

  const history = useHistory()

  const handleSearch = e => {
    e.persist()

    const addAddress = document.getElementById('addAddress')
    let formData = new FormData(addAddress)

    let address = formData.get('address')

    let newEvent = {}

    if (address !== '') {
      newEvent = {
        longitude: null,
        latitude: null,
        address: address,
        title: '',
        start_time: '',
        end_time: '',
        description: '',
        userId: user
      }
      
      let uri = `https://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_POSITIONSTACK_KEY}&limit=1&query=${address}&output=json`

      fetch(uri)
        .then(response => response.json())
        .then(data => {
          newEvent = {
            ...newEvent,
            longitude: data.data[0].longitude,
            latitude: data.data[0].latitude
          }
          setNewEvent(newEvent)
          history.push('/map/add')
        })
        .catch(err => setError({error: err.error}))
    } else {
      e.preventDefault()
    }
  }

  return (
    <div>
      {toggle ? (
        <form id="addAddress" name="addAddress" className='address'>
          {error && <p>{error.error}</p>}
          <label htmlFor='address'>Enter address</label>
          <input
            type='text'
            id='address'
            name='address'
            value={inputAddress}
            onChange={e => setAddress(e.target.value)}
            autoFocus={true}
            placeholder='123 Main St Suite 101, Orlando, Fl 32825'
          />
          <button type='button' className="search-btn" onClick={e => handleSearch(e)}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      ) : (
        <button className='address-btn' onClick={() => setToggle(!toggle)}>
          +
        </button>
      )}
    </div>
  )
}

export default Search
