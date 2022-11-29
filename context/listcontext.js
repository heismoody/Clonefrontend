import { createContext, useReducer } from "react"

export const listcontext = createContext()

export const listreducer = (state, action) => {
    switch (action.type) {
        case 'delete_movieinlist':
            return {
                listmovies: state.listmovies.filter((m) => m._id !== action.payload._id)
            }
        case 'show_movielist':
            return {
                listmovies: action.payload
            }
        case 'addtolist':
            return {
                listmovies: [action.payload, ...state.listmovies]
            }
        default:
            return state
    }
}

export const Listcontextprovider = ({ children }) => {
    const [state, dispatch] = useReducer(listreducer, {
        listmovies: null
    })
    return (
        <listcontext.Provider value={{...state, dispatch}}>
            { children }
        </listcontext.Provider>
    )
}