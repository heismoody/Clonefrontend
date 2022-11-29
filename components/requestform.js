import React, { useState } from "react";
import { usereqcontext } from "../hooks/usereqcontext";
import { usercontexthook } from "../hooks/UsercontextHook";

const RequestForm = () => {
    const [title, settitle] = useState('')
    const [genre, setgenre] = useState('')
    const [year, setyear] = useState('')
    const [error, seterror] = useState(null)
    const {dispatch } = usereqcontext()
    const { user } = usercontexthook()

    //submission function of the form
    const handlingsubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            seterror('Come on!! You should be logged in')
            return
        }

        const addmovie = { title, genre, year }
        
        const res = await fetch('http://192.168.128.166:4000/api/requestmovie/', {
            method: "POST",
            body: JSON.stringify(addmovie),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const data = await res.json()
        if (res.ok) {
            settitle('')
            setgenre('')
            setyear('')
            seterror(null)
            dispatch({type: 'create_movies', payload: data})

        } else {
            seterror(data.error)
            setsucess(null)
        }
    }

    return ( 
        <div className="md:flex justify-center">
            
            <form onSubmit={handlingsubmit}>
                <h3 className="heading2 text-center mb-5">Request a movie</h3>
                <label className="lables list px-0">Title of the movie</label>
                <input type="text"
                    className="inputfield"
                    onChange={(e) => { settitle(e.target.value) }}
                    value={title}
                />
                <label className="lables list px-0">Genre of the movie</label>
                <input type="text"
                    className="inputfield"
                    onChange={(e) => { setgenre(e.target.value) }}
                    value={genre}
                />
                <label className="lables list px-0">Year of release</label>
                <input type="number"
                    className="inputfield block"
                    onChange={(e) => { setyear(e.target.value) }}
                    value={year}
                />
                <button className="text-center bg-our-green w-full py-1 rounded font-bold">Request the movie</button>
                {error && <div className="text-red-500 text-xs mt-5">{error}</div>}
            </form>
            
        </div>
    );
}
 
export default RequestForm;