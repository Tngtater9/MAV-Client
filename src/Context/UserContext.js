import React, { createContext, useState } from 'react'

export const UserContext = createContext()

function UserContextProvider (props) {
    const [user, setUser] = useState('null')
    const [company, setCompany] = useState('null')
    return(
        <UserContext.Provider value={{user, setUser, company, setCompany}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider