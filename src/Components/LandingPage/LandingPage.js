import React from 'react'
import './landing.css'
import map from '../../imgs/mapScreen.png'

function LandingPage () {
    return (
        <main>
            <p>MAV, which stands for Mobile Appointment Viewer, was created for a mobile auto glass repair service. MAV creates a map with markers representing appointments for a given day. The user can see where their daily appointments are and add new appointments to the route. This idea was spawned as a way to cut down on travel back and forth across the city so the user can save time and money.</p>
            <img className="map" src={map} alt="MAV Screenshot" />
            <p> With MAV the user is able to log in and view appointments for a given day. Numbered markers are used to show what order the appointments happen in. From the main view the user can click on the "+" to start adding an appointment. The first step lets the user search for the address and the second step lets the user fill in details. If the user wants to start over they can click on the new appointment marker, indicated by the "+", and the popup will link to the main screen. To view an existing appointment the user can click on a marker and the popup will show minimal details. To view the full details the user clicks on the "Details..." link in the popup. While viewing the details the user can delete or modify the appointment.</p>
        </main>
    )
}

export default LandingPage