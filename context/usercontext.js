import { createContext, useReducer, useEffect } from "react";

export const Usercontext = createContext()

export const Userreducer = (state, action) => {
    switch (action.type) {
        case 'logging_in':
            return {
                user: action.payload
            }
        case 'signing_out':
            return {
                user: null
            }
        default:
            return state
    }
}

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Userreducer, {
        user: null
    })

    useEffect(() => {
        const userfromstorage = JSON.parse(localStorage.getItem('user'))

        if (userfromstorage) {
            dispatch({type: 'logging_in', payload: userfromstorage})
        }
    }, [])

    console.log("Usercontext state: ", state)

    return (
        <Usercontext.Provider value={{...state, dispatch}}>
            { children }
        </Usercontext.Provider>
    )
}