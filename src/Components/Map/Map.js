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
  const {
    events,
    setEvents,
    newEvent,
    selectedEvents,
    setSelectedEvents
  } = useContext(EventContext)
  const { date, setPickerDate } = useContext(DateContext)
  const div = document.createElement('div')
  let mapContainer = useRef(div)
  let { path, url } = useRouteMatch()

  const [viewport, setViewport] = useState({
    longitude: 0,
    latitude: 0,
    width: '100vw',
    height: '100vh',
    zoom: 2
  })

  useEffect(() => {
    ApptApiService.getAllAppt().then(appts => {
      let selected = appts.filter(event => {
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
      setEvents(appts)
    })
  }, [])

  useEffect(() => {
    let selected = events.filter(event => {
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
  }, [date])

  useEffect(() => {
    if (Array.isArray(selectedEvents) && selectedEvents.length) {
      setViewport({
        longitude: Number(selectedEvents[0].longitude),
        latitude: Number(selectedEvents[0].latitude),
        width: '100vw',
        height: '100vh',
        zoom: 2
      })
    }
  }, [selectedEvents])

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

    let map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [viewport.longitude, viewport.latitude],
      zoom: viewport.zoom
    })

    map.on('move', () => {
      setViewport({ ...viewport, longitude: map.getCenter().lng.toFixed(4) })
      setViewport({ ...viewport, latitude: map.getCenter().lat.toFixed(4) })
      setViewport({ ...viewport, zoom: map.getZoom().toFixed(2) })
    })

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

    if (Array.isArray(pickedEvents) && pickedEvents.length) {
      let markers = pickedEvents.map((event, index) => {
        let order
        index + 1 === pickedEvents.length && event.title === ''
          ? (order = '+')
          : (order = index + 1)

        let btn = document.createElement('button')
        btn.classList.add('marker-button')
        btn.textContent = String(order)

        if (order !== '+') {
          return new mapboxgl.Marker({ element: btn })
            .setLngLat([Number(event.longitude), Number(event.latitude)])
            .setPopup(
              new mapboxgl.Popup().setHTML(`<div><h1>${event.title}</h1><br/>
      <p>${event.address}</p><br/><p>${event.start_time}</p><br/><a href="${url}/event/${event.id}">Details...<a></div>`)
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
      map.flyTo({
        center: [pickedEvents[0].longitude, pickedEvents[0].latitude],
        zoom: 8
      })
    }
  }, [selectedEvents, newEvent])

  return (
    <BrowserRouter>
      <div className='App'>
        <div ref={el => (mapContainer.current = el)} className='mapContainer'>
          <Switch>
            <Route exact path={path} component={SearchAdd} />
            <Route path={`${path}/add`}>
              <AddEvent
                changeViewport={setViewport}
                currentViewport={viewport}
              />
            </Route>
            <Route path={`${path}/update/:eventId`} component={UpdateEvent} />
            <Route path={`${path}/event/:eventId`} component={Details} />
            <Route path={`${path}/delete/:eventId`} component={Confirmation} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default Map
