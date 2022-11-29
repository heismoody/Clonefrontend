import React, { createContext, useReducer } from "react";

export const reqcontext = createContext()

export const reqreducer = (state, action) => {
    switch (action.type) {
        case 'show_movies':
            return {
                movies: action.payload
            }
        case 'create_movies':
            return {
                movies: [action.payload, ...state.movies]
            }
        case 'delete_movies':
            return {
                movies: state.movies.filter((m) => m._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const Reqcontextprovider = ({ children }) => {

    const [state, dispatch] = useReducer(reqreducer, {
        movies: null
    })

    return (
        <reqcontext.Provider value={{ ...state, dispatch }}>
            { children }
        </reqcontext.Provider>
    )
}