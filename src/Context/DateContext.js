import React, { createContext, useState } from 'react'

export const DateContext = createContext()

function DateContextProvider (props) {
    const [date, setDate] = useState(null)
    return(
        <DateContext.Provider value={{date, setDate}}>
            {props.children}
        </DateContext.Provider>
    )
}

export default DateContextProvider