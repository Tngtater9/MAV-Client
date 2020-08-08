import React, { createContext, useState } from 'react'

export const UserContext = createContext()

function UserContextProvider (props) {
    const [user, setUser] = useState(null)
    const [userError, setUserError] = useState(null)
    return(
        <UserContext.Provider value={{user, setUser, userError, setUserError}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider