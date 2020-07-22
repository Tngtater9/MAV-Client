import React from 'react'
import './AddEvent.css'

function AddEvent () {
    return (
        <form className="event">
            <label htmlFor="title">Title</label>
            <input type="text" placeholder="Title of appointment"/><br/>
            <label htmlFor="date">Date</label>
            <input type="text" id="date" name="date" placeholder="Appointment date" onFocus="(this.type='date')"/><br/>
            <label htmlFor="time">Time</label>
            <input type="text" id="time" name="time" placeholder="Appointment Time" onFocus="(this.type='time')"/><br/>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" placeholder="Appointment description"></textarea><br/>
            <div>
                <button type="submit">[Checkmark Icon]</button>
                <button type="reset">[X mark icon]</button><br/><br/>
            </div>
        </form>
    )
}

export default AddEvent