import { usercontexthook } from "../hooks/UsercontextHook"
import { usereqcontext } from "../hooks/usereqcontext"
import React, { useState } from "react"

const Requestedmovie = ({ movie }) => {
    const {dispatch}=usereqcontext()
    const { user } = usercontexthook()
    const [error, seterror] = useState()
    
    const deletemovie = async () => {
        if (!user) {
            seterror('Come On!! You should be logged in')
            return
        }
        if (confirm('Are you sure you want to delete')) {
            const res = await fetch(`http://192.168.128.166:4000/api/requestmovie/${movie._id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
        })
            const data = await res.json()

            if (res.ok) {
                dispatch({type: 'delete_movies', payload: data})
            }
            
        }
    }

    return ( 
        <div className="bg-black/70 relative rounded mb-5">
            <div>
                <h3 className="requesttitle">{ movie.title }</h3>
                <h6><strong className="reqdetailstrong">Genre:</strong><span className="reqdetail">{ movie.genre }</span></h6>
                <h6><strong className="reqdetailstrong">Year:</strong><span className="reqdetail">{ movie.year }</span></h6>
                <h6 className="py-3"><span className="reqdetail text-xs">{movie.createdAt}</span></h6>
                {error && <div className="text-red-500 text-xs mt-5">{error}</div>}
            </div>
            <div className="rounded-full bg-red-400 w-fit absolute top-2 right-2">
                <div className="p-1" onClick={() => { deletemovie() }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
 
export default Requestedmovie;