import {createContext, useState} from 'react'

export const UserAuthContext=createContext(null)


export default function Context({children}){

    
    const defaultUser=JSON.parse(localStorage.getItem('userProfile'))

    const [authUser,setAuthUser]=useState(defaultUser)

    return(
        <UserAuthContext.Provider value={{authUser,setAuthUser}} >
               {children}
        </UserAuthContext.Provider>
    )
}