import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Switch, Route, useRouteMatch } from 'react-router-dom'
import './map.css';
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import AddEvent from '../AddEvent/AddEvent'
import SearchAdd from '../AddEvent/SearchAdd'
import UpdateEvent from '../Update/UpdateEvent'
import Details from '../Details/Details'
import { EventContext } from '../../Context/EventContext';
import DateContextProvider from '../../Context/DateContext'

function Map () {
  // const [viewport, setViewport] = useState({
  //   longitude: -81.379234,
  //   latitude: 28.538336,
  //   width: '100vw',
  //   height: '100vh',
  //   zoom: 10
  // })

  const [viewport, setViewport] = useState({
    longitude: 0,
    latitude: 0,
    width: '100vw',
    height: '100vh',
    zoom: 2
  })

  const { events, selected, setSelected } = useContext(EventContext)

  useEffect(() => {
    const listener = e => {
      if(e.key === 'Escape'){
        setSelected(null)
      }

      return () => {
        window.removeEventListener('keydown', listener)
      }
    }
    
    window.addEventListener('keydown', listener)
  }, [])

  useEffect(()=>{
    if(events[0]){
      setViewport({...viewport, longitude: events[0].longitude,
      latitude: events[0].latitude, zoom: 10})
    }
  }, [])

  let { path } = useRouteMatch();

  return (
    <BrowserRouter>
      <div>
        <ReactMapGL 
        {...viewport} 
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        onViewportChange={(viewport)=>{setViewport(viewport)}}>
          
          {events.map((place, index) => (
            <Marker key={place.id} 
            latitude={place.latitude} 
            longitude={place.longitude}
            >
              <button className="marker" onClick={(e) => {
                e.preventDefault();
                setSelected(place)
              }}>
              {index + 1}
              </button>
            </Marker>
          ))}

          {selected && (
            <Popup 
            latitude={selected.latitude} 
            longitude={selected.longitude}
            onClose={() => setSelected(null)}>
              <div>
                {selected.address}
              </div>
            </Popup>
          )}
          <div style={{position: 'absolute', left: 0, bottom: 40}}>
            <NavigationControl
            showCompass={true}
            showZoom={true} />
          </div>
        </ReactMapGL>
        <Switch>
          <DateContextProvider>
            <Route exact path={path} component={SearchAdd}/>
            <Route path={`${path}/add`} component={AddEvent}/>
            <Route path={`${path}/update/:eventId`} component={UpdateEvent}/>
            <Route path={`${path}/:eventId`} component={Details}/>
          </DateContextProvider>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default Map