import React from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    lng: -81.379234,
    lat: 28.538336,
    zoom: 9
    };
    }
  
  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoianRhdGVyMSIsImEiOiJja2NudjV0ZDAwYnQ3MzVvNXg1NDVsaDV4In0.kTokXaU3mQpkuEnu6wqAbw'

    const map = new mapboxgl.Map({
    container: this.mapContainer,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [this.state.lng, this.state.lat],
    zoom: this.state.zoom
    });

    map.on('move', () => {
      this.setState({
      lng: map.getCenter().lng.toFixed(4),
      lat: map.getCenter().lat.toFixed(4),
      zoom: map.getZoom().toFixed(2)
      });
      });

    let marker = new mapboxgl.Marker()
    .setLngLat([-81.362470, 28.654340])
    .setPopup(new mapboxgl.Popup().setHTML("<h1>DAGplus</h1>"))
    .addTo(map);
      
    marker.togglePopup(); // toggle popup open or closed
    }

  render (){
    return (
    <div className="App">
      <header className="App-header">
        <h1>MAV DEMO</h1>
      </header>
      <div className='sidebarStyle'>
        <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
      </div>
      <div ref={el => this.mapContainer = el} className="mapContainer" />
    </div>
  )}
}

export default App;
