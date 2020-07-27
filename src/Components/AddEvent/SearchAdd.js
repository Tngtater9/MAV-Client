import React, {useState, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import './AddEvent.css'
import { EventContext } from '../../Context/EventContext'
import { UserContext } from '../../Context/UserContext'

function Search () {
    const [toggle, setToggle] = useState(false)
    const { setNewEvent } = useContext(EventContext)
    const { user, company } = useContext(UserContext)

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
            startTime: '', 
            endTime: '', 
            description: '',
            userId: user,
            companyId: company}

            let uri = `http://api.positionstack.com/v1/forward?access_key=3b8bb0a44ed4226e01239f1f1e0648b7&limit=1&query=${address}&output=json`

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