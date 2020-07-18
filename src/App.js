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
      <form class="AVAST_PAM_nonloginform">
        <label forHTML="title">Title</label>
        <input type="text" placeholder="Title of appointment"/><br/>
        <label forHTML="date">Date</label>
        <input type="text" id="date" name="date" placeholder="Appointment date" onfocus="(this.type='date')"/><br/>
        <label forHTML="time">Time</label>
        <input type="text" id="time" name="time" placeholder="Appointment Time" onfocus="(this.type='time')"/><br/>
        <label forHTML="address">Address</label>
        <input type="text" id="address" name="address" placeholder="Appointment address"/><br/>
        <label forHTML="details">Details</label>
        <textarea id="details" name="details" placeholder="Appointment details"></textarea><br/>
        <div>
            <button type="submit">[Checkmark Icon]</button>
            <button type="reset">[X mark icon]</button><br/><br/>
        </div>
    </form>
    </div>
  )}
}

export default App;
