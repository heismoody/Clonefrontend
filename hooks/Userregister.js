import { useState } from "react";
import { usercontexthook } from "./UsercontextHook";


export const useregister = () => {
    const [error, seterror] = useState(null)
    const [loading, setloading] = useState(null)
    const { dispatch } = usercontexthook()
    

    const Register = async (username, email, password) => {
        seterror(null)
        setloading(true)

        const res = await fetch('https://clonebackend.vercel.app/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
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

    return { Register, error, loading}

}