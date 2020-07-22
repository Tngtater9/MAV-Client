import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './AddEvent.css'

class Search extends Component {
    handleSearch = (props) => {
        this.props.history.push('/map/add')
    }
    render () {
        return (
        <section className="address">
            <input type="text" placeholder="123 Main St Suite 101, Orlando, Fl 32825"/>
            <button type="button" onClick="handleSearch">Search</button>
        </section>
        )
    }
}

export default withRouter(Search)