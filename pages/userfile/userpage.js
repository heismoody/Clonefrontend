import Requestedmovie from "../../components/requestedmovie";
import ListThumb from "../../components/Listthumb";
import RequestForm from "../../components/requestform";
import { usereqcontext } from "../../hooks/usereqcontext";
import { listcontexthook } from "../../hooks/Listcontexthook";
import { usercontexthook } from "../../hooks/UsercontextHook";
import Router from 'next/router';
import React, { useState, useEffect } from "react";

const Userpage = () => {

    const { movies, dispatch } = usereqcontext()
    const { listmovies, dispatch: listdispatch } = listcontexthook()
    const [tabone, settabone] = useState(false)
    const [tabtwo, settabtwo] = useState(true)
    const [tabthree, settabthree] = useState(false)
    const [size, setsize] = useState('')
    
    const { user } = usercontexthook()
    
    useEffect(() => {
        const showwidth = () => {
            return window.innerWidth;
        }
        setsize(showwidth())
        const handleResize = () => {
            setsize(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        
        const fetchrequestedmovies = async () => {
            const res = await fetch('https://clonebackend.vercel.app/api/requestmovie/allmovies', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const reqmovie = await res.json()

            if (res.ok) {
                dispatch({type: 'show_movies', payload: reqmovie})
            }
        }

        const GetList = async () => {
            const res = await fetch('https://clonebackend.vercel.app/api/downloadlist/wholelist', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const data = await res.json()

            if (res.ok) {
                listdispatch({type: 'show_movielist', payload: data})
            }
        }


        if (user) {
            fetchrequestedmovies() 
            GetList()
        } else {
            Router.push('/userfile/login');
        }

        return () => {
            window.removeEventListener("resize", handleResize);
        }

    }, [dispatch, user, listdispatch])

    const showlist = () => {
        settabone(true)
        settabtwo(false)
        settabthree(false)
    }
    
    const showrequest = () => {
        settabone(false)
        settabtwo(true)
        settabthree(false)
    }

    const showform = () => {
        settabone(false)
        settabtwo(false)
        settabthree(true)
    }

    return ( 
        <>
            <div className="bg-slate-900 flex justify-between h-[90vh] md:block md:fitting">
                <div className="bg-black w-fit h-[90vh] md:resnav">
                    <ul className="text-slate-200 text-sm font-bold sm:flex justify-between h-full">
                        <li className="dashboardnag" onClick={showrequest}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                            </svg>
                            <span className="mx-2 sm:hidden">
                                Requested Movies
                            </span>
                        </li>
                        <li className="dashboardnag" onClick={showlist}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="inline w-6 h-6">
                                    <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                </svg>
                                <span className="mx-2 sm:hidden">
                                    Saved List
                                </span>
                        </li>
                        <li className="dashboardnag hidden md:block" onClick={showform}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                <span className="mx-2 sm:hidden">
                                    Request Movies
                                </span>
                        </li>
                    </ul>
                </div>
                <div className="w-[80%] md:fitting">
                    <div className="flex justify-around md:fitting block">
                        {
                            tabtwo && (
                                <div className="w-[60%] overflow-auto overflow-x-hidden h-[90vh] scrollbar md:fitting px-2">
                                    <h3 className="heading2 mb-5 md:text-center pt-3">Requested Movies</h3>
                                    {
                                        movies && movies.map((movie) => {
                                        return <Requestedmovie key={movie._id} movie={movie} />
                                    })
                                    }
                                </div>
                            )
                        }
                        {
                            tabone && (
                                <div className="w-[60%] h-[90vh] md:fitting">
                                    <h3 className="heading2 mb-5 md:text-center pt-3">Saved Movies</h3>
                                    <div className="grid grid-cols-3 gap-10 place-content-between overflow-auto overflow-x-hidden h-[81vh] scrollbar pt-4 md:movielist">
                                        {
                                            listmovies && listmovies.map((listmovie) => {
                                                return <div className="md:flex justify-center pb-5" key={listmovie._id}><ListThumb data={listmovie}/></div>
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        }
                        <div className="md:h-[83vh] pt-3">
                            {
                                tabthree && (
                                    <RequestForm/>
                                )
                            }
                            {
                                (size>768) && (
                                    <RequestForm/>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Userpage;