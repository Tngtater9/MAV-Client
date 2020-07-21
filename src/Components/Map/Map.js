import React, { useState, useEffect } from 'react';
import './map.css';
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import AddEvent from '../AddEvent'
import PLACES from '../../sample-locations'

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

  const [selected, setSelected] = useState(null)

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
    if(PLACES[0]){
      setViewport({...viewport, longitude: PLACES[0].longitude,
      latitude: PLACES[0].latitude, zoom: 10})
    }
  }, [])
  return (
    <div>
      <ReactMapGL 
      {...viewport} 
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle='mapbox://styles/mapbox/streets-v11'
      onViewportChange={(viewport)=>{setViewport(viewport)}}>
        
        {PLACES.map((place, index) => (
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
      <AddEvent/>
    </div>
  )
}

export default Map