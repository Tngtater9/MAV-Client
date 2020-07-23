import React, { Component } from 'react'

class Confirmation extends Component {
    render () {
        return (
            <article>
                <p>Are you sure?</p>
                <div>
                    <button>Check</button>
                    <button>X</button>
                </div>
            </article>
        )
    }
}

export default Confirmation