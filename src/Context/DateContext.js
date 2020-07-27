import React, { createContext, useState } from 'react'
import moment from 'moment-with-locales-es6'

export const DateContext = createContext()

function DateContextProvider (props) {
    const initialDate = moment().format('L')

    const [date, setDate] = useState(initialDate)
    return(
        <DateContext.Provider value={{date, setDate}}>
            {props.children}
        </DateContext.Provider>
    )
}

export default DateContextProvider