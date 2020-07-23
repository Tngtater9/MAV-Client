import React from 'react'
import './AddEvent.css'

function Search () {
    return (
    <section className="address">
        <input type="text" placeholder="123 Main St Suite 101, Orlando, Fl 32825"/>
        <button type="button" onClick="handleSearch">Search</button>
    </section>
    )
}


export default Search