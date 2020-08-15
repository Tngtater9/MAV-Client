import React, { useRef, useState, useEffect, useContext } from 'react'
import { BrowserRouter, Switch, Route, useRouteMatch } from 'react-router-dom'
import './map.css'
import mapboxgl from 'mapbox-gl'
import AddEvent from '../AddEvent/AddEvent'
import SearchAdd from '../AddEvent/SearchAdd'
import UpdateEvent from '../Update/UpdateEvent'
import Details from '../Details/Details'
import Confirmation from '../Details/Confirmation'
import { EventContext } from '../../Context/EventContext'
import { DateContext } from '../../Context/DateContext'
import ApptApiService from '../../services/ApptApiService'

function Map () {
  function formatDate (date) {
    //format day to be YYYY-MM-DD from MM/DD/YYYY
    const result = []
    const separate = date.split('/')
  
    let month = separate[0]
    if (month.length === 1) {
      month = '0' + month
    }
    let day = separate[1]
    if (day.length === 1) {
      day = '0' + day
    }
    const year = separate[2]
    result.push(year)
    result.push('-')
    result.push(month)
    result.push('-')
    result.push(day)
    result.join()
  
    return result
  }

  const {
    newEvent,
    selectedEvents,
    setSelectedEvents
  } = useContext(EventContext)
  const { date } = useContext(DateContext)
  const div = document.createElement('div')
  let mapContainer = useRef(div)
  let { path, url } = useRouteMatch()

  const [viewport, setViewport] = useState({
    longitude: 0,
    latitude: 0,
    width: '100vw',
    height: '100vh',
    zoom: 1
  })

  useEffect(() => {
    if(date){
      let apiDate = date
      apiDate = formatDate(apiDate)
      ApptApiService.getApptByDate(apiDate)
       .then(appts => setSelectedEvents(appts))
    }
  }, [])

  useEffect(() => {
    if(date){
      let apiDate = date
      apiDate = formatDate(apiDate).join('')
      ApptApiService.getApptByDate(apiDate)
       .then(appts => setSelectedEvents(appts))
    }
  }, [date])

  useEffect(() => {
    if (
      newEvent !== null &&
      newEvent.hasOwnProperty('longitude') &&
      newEvent.hasOwnProperty('latitude')
    ) {
      setViewport({
        longitude: newEvent.longitude,
        latitude: newEvent.latitude,
        width: '100vw',
        height: '100vh',
        zoom: 10
      })
    }
  }, [newEvent])

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
    //creates an instance of the map using the div in the mapContainer ref
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [viewport.longitude, viewport.latitude],
      zoom: viewport.zoom
    })

    //Allows the map to move and zoom
    map.on('move', () => {
      setViewport({ ...viewport, longitude: map.getCenter().lng.toFixed(4) })
      setViewport({ ...viewport, latitude: map.getCenter().lat.toFixed(4) })
      setViewport({ ...viewport, zoom: map.getZoom().toFixed(2) })
    })

    //Creates a copy of the array selectedEvents to be manipulated
    let pickedEvents =
      Array.isArray(selectedEvents) && selectedEvents.length
        ? selectedEvents
        : []
    
    if (
      newEvent !== null &&
      newEvent.hasOwnProperty('longitude') &&
      newEvent.hasOwnProperty('latitude')
    ) {
      pickedEvents.push(newEvent)
    }
    //if no markers are going to rendered reset map view
    if(pickedEvents.length === 0 && !newEvent){
      map.jumpTo({
        center: [0,0],
        zoom: 1
      })
    }

    //make markers and popups
    if (Array.isArray(pickedEvents) && pickedEvents.length) {
      if(!pickedEvents[pickedEvents.length - 1].hasOwnProperty('title')){
        map.jumpTo({
          center: [pickedEvents[pickedEvents.length - 1].longitude, pickedEvents[pickedEvents.length - 1].latitude],
          zoom: 10
        })
      }else{
        map.jumpTo({
          center: [pickedEvents[0].longitude, pickedEvents[0].latitude],
          zoom: 8
        })
      }
      let markers = pickedEvents.map((event, index) => {
        let order
        event.hasOwnProperty('title')
          ? (order = index + 1)
          : (order = '+')

        let btn = document.createElement('button')
        btn.classList.add('marker-button')
        btn.textContent = String(order)

        if (order !== '+') {
          return new mapboxgl.Marker({ element: btn })
            .setLngLat([Number(event.longitude), Number(event.latitude)])
            .setPopup(
              new mapboxgl.Popup().setHTML(`<div><h1>${event.title}</h1><br/>
      <p>${event.address}</p><br/><p>${event.start_time}</p><br/><a href="${url}/appt/${event.id}">Details...<a></div>`)
            )
            .addTo(map)
        } else {
          return new mapboxgl.Marker({ element: btn })
            .setLngLat([Number(event.longitude), Number(event.latitude)])
            .setPopup(
              new mapboxgl.Popup()
                .setHTML(`<div class="popup"><h1>${event.address}</h1><br/>
        <br/><a href="${url}/">Change address<a></div>`)
            )
            .addTo(map)
        }
      })
    }
  }, [selectedEvents, newEvent])

  return (
    <BrowserRouter>
      <div className='App'>
        {/* Holds the map and its controllers */}
        <div ref={el => (mapContainer.current = el)} className='mapContainer'>
          {/* Nested route in map to create overlay of forms on separate routes */}
          <Switch>
            <Route exact path={path} component={SearchAdd} />
            <Route path={`${path}/add`}>
              <AddEvent
                changeViewport={setViewport}
                currentViewport={viewport}
              />
            </Route>
            <Route path={`${path}/update/:apptId`} component={UpdateEvent} />
            <Route path={`${path}/appt/:apptId`} component={Details} />
            <Route path={`${path}/delete/:apptId`} component={Confirmation} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default Map
