import { useState } from "react";
import { usercontexthook } from "./UsercontextHook";


export const uselogin = () => {
    const [error, seterror] = useState(null)
    const [loading, setloading] = useState(null)
    const { dispatch } = usercontexthook()
    

    const login = async ( email, password ) => {
        seterror(null)
        setloading(true)

        const res = await fetch('http://192.168.128.166:4000/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const data = await res.json()

        if (!res.ok) {
            setloading(false)
            seterror(data.error)
        } else {
            //Save the user to local storage
            localStorage.setItem('user', JSON.stringify(data))

            //update the context
            dispatch({ type: 'logging_in', payload: data })
            
            setloading(false)
        }
    }

    return { login, error, loading}

}