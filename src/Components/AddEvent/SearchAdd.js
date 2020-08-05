import React, {useState, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import './AddEvent.css'
import { EventContext } from '../../Context/EventContext'
import { UserContext } from '../../Context/UserContext'

function Search () {
    const [toggle, setToggle] = useState(false)
    const { setNewEvent } = useContext(EventContext)
    const { user } = useContext(UserContext)

    const history = useHistory()

    const handleSearch = (e) => {
        e.persist()
        
        let address = e.target.parentNode.address.value
        // api call for forward geocoding
        
        if(address){
            let newEvent = {
            longitude: null,
            latitude: null,
            address: address,
            title: '', 
            start_time: '', 
            end_time: '', 
            description: '',
            userId: user,
            }

            let uri = `https://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_POSITIONSTACK_KEY}&limit=1&query=${address}&output=json`

        fetch(uri)
            .then(response => response.json())
            .then(data => {
                newEvent = {
                    ...newEvent, 
                    longitude:data.data[0].longitude,
                    latitude:data.data[0].latitude
                }
                setNewEvent(newEvent)
                history.push('/map/add')
            })
        } else {
            e.preventDefault()
        }
    }

    return (
        <div>
            {toggle ?
            (<form className="address" >
                <label htmlFor="address">Enter address</label>
                <input type="text" id="address" name="address" autoFocus={true} placeholder="123 Main St Suite 101, Orlando, Fl 32825"/>
                <button type="button" onClick={(e) => handleSearch(e)}>Search</button>
            </form>) : 
            (<button className="address-btn" onClick={() => setToggle(!toggle)}>+</button>)}
        </div>
    )
}


export default Search