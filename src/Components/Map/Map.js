import React, { useRef, useState, useEffect, useContext } from 'react';
import { BrowserRouter, Switch, Route, useRouteMatch} from 'react-router-dom'
import './map.css';
import mapboxgl from 'mapbox-gl'
import AddEvent from '../AddEvent/AddEvent'
import SearchAdd from '../AddEvent/SearchAdd'
import UpdateEvent from '../Update/UpdateEvent'
import Details from '../Details/Details'
import Confirmation from '../Details/Confirmation'
import { EventContext } from '../../Context/EventContext'
import { DateContext } from '../../Context/DateContext'

function Map () {
  const { events,  newEvent, selectedEvents, setSelectedEvents } = useContext(EventContext)
  const { date } = useContext(DateContext)
  const div = document.createElement("div")
  const mapContainer = useRef(div)
  let { path, url } = useRouteMatch();

  const [viewport, setViewport] = useState({
    longitude: events[0] ? events[0].longitude : 0,
    latitude: events[0] ? events[0].latitude : 0,
    width: '100vw',
    height: '100vh',
    zoom: events[0] ? 10 : 2,
  })

  function unformatDate (date) {
    let result = []
    const separate = String(date).split('/')
    
    const month = separate[0]
    const day = separate[1]
    const year = separate[2]
    result.push(year)
    result.push('-')
    result.push(month)
    result.push('-')
    result.push(day)
    result.join('')
    
    return result
  }

  useEffect(()=>{
    const unformatted = unformatDate(date).join('')
    let pickedEvents = events.map((e) => e.startTime.includes(unformatted) ? e : '').filter(String)

    pickedEvents = pickedEvents.sort((a, b) => {

        return  new Date(a.startTime) - new Date(b.startTime)
    })

    setSelectedEvents(pickedEvents)
  },[date,events])

  useEffect(() => {
    if(newEvent !== null && newEvent.hasOwnProperty('longitude') && newEvent.hasOwnProperty('latitude')){
    setViewport({
    longitude: newEvent.longitude,
    latitude:  newEvent.latitude,
    width: '100vw',
    height: '100vh',
    zoom: 10,
  })}
},[newEvent])

  // useEffect(() => {
  //   if(newEvent !== null && newEvent.hasOwnProperty('title') && newEvent.title !== ''){
  //     setEvents([...events, newEvent])
  //     setNewEvent(null)}
  // },[newEvent])

  useEffect(()=>{   
    
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

    

    let map = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [viewport.longitude, viewport.latitude],
    zoom: viewport.zoom
    });

    map.on('move', () => {
      setViewport({...viewport, longitude: map.getCenter().lng.toFixed(4)})
      setViewport({...viewport, latitude: map.getCenter().lat.toFixed(4)})
      setViewport({...viewport, zoom: map.getZoom().toFixed(2)})
    });

    const pickedEvents = (selectedEvents !== null) ? [...selectedEvents] : [...events]

    if(newEvent !== null && newEvent.hasOwnProperty('longitude') && newEvent.hasOwnProperty('latitude')) {pickedEvents.push(newEvent)}
    
    if(pickedEvents !== null){
      let markers = pickedEvents.map((event, index) => {
      let order
      (index + 1 === pickedEvents.length && event.title === '') ? order = '+': order = index + 1

      let btn = document.createElement('button');
      btn.classList.add('marker-button')
      btn.textContent = String(order)

      if(order !== '+'){      
      return(
      new mapboxgl.Marker({element:btn})
      .setLngLat([event.longitude, event.latitude])
      .setPopup(new mapboxgl.Popup().setHTML(`<div><h1>${event.title}</h1><br/>
      <p>${event.address}</p><br/><a href="${url}/event/${event.eventId}">Details...<a></div>`))
      .addTo(map))} else {
        return(
          new mapboxgl.Marker({element:btn})
        .setLngLat([Number(event.longitude), Number(event.latitude)])
        .setPopup(new mapboxgl.Popup().setHTML(`<div><h1>${event.address}</h1><br/>
        <br/><a href="${url}/">Change address<a></div>`))
        .addTo(map)
        )}
      })
    }
    
  }, [selectedEvents, newEvent])

  return (
    <BrowserRouter>
      <div className="App">
        <div ref={mapContainer} className="mapContainer">
          <Switch>
              <Route exact path={path} component={SearchAdd}/>
              <Route path={`${path}/add`} component={AddEvent}/>
              <Route path={`${path}/update/:eventId`} component={UpdateEvent}/>
              <Route path={`${path}/event/:eventId`} component={Details}/>
              <Route path={`${path}/delete/:eventId`} component={Confirmation}/>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default Map