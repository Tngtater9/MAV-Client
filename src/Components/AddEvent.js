import React from 'react'

function AddEvent () {
    return (
        <form className="add-event">
            <label forHTML="title">Title</label>
            <input type="text" placeholder="Title of appointment"/><br/>
            <label forHTML="date">Date</label>
            <input type="text" id="date" name="date" placeholder="Appointment date" onfocus="(this.type='date')"/><br/>
            <label forHTML="time">Time</label>
            <input type="text" id="time" name="time" placeholder="Appointment Time" onfocus="(this.type='time')"/><br/>
            <label forHTML="details">Details</label>
            <textarea id="details" name="details" placeholder="Appointment details"></textarea><br/>
            <div>
                <button type="submit">[Checkmark Icon]</button>
                <button type="reset">[X mark icon]</button><br/><br/>
            </div>
        </form>
    )
}

export default AddEvent