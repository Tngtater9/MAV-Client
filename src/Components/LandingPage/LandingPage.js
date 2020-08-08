import React from 'react'
import './landing.css'
import map from '../../imgs/mapScreen.png'

function LandingPage () {
    return (
        <main>
            <p className="mission">MAV, which stands for Mobile Appointment Viewer creates a map with markers representing appointments for a given day. The user can see where their daily appointments are and add new appointments to the route. This idea was spawned as a way to cut down on travel back and forth across the city so the user can save time and money.</p>
            <img className="map" src={map} alt="MAV Screenshot"></img>
            <p className="demo">[Placeholder for video clip showing demo for MAV use]</p>
        </main>
    )
}

export default LandingPage