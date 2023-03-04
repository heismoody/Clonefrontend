import Link from "next/link";
import { UserLogout } from "../hooks/Userlogout";
import { usercontexthook } from "../hooks/UsercontextHook";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import popcornlg from '../public/popcornmv.png'

const Navigation = () => {
    const [searchvalue, setvalue] = useState('')
    const [results, setresultquery] = useState(null)
    const [shownav, setshownav] = useState(false)
    const [showicon, setshowicon] = useState(true)
    const [hideicon, sethideicon] = useState(false)


        useEffect(() => {
        const searchmovies = async () => {
            
            if (searchvalue == '') {
                setresultquery(null)
            } else {
                const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=7610542e1e569e1bb328e4210a54a049&query=${searchvalue}`)
                const data = await res.json()

                if (res.ok) {
                    const { results } = data
                    setresultquery(results)
                }
            }     
        }
        searchmovies()
        }, [searchvalue])

    

    const { logout } = UserLogout()
    const { user } = usercontexthook()
    const base_url = 'https://image.tmdb.org/t/p/original'
    
    
    const handlelogout = () => {
        logout()
    }
    
    const showbar = () => {
        setshownav(true)
        setshowicon(false)
        sethideicon(true)
    }

    const hidebar = () => {
        setshownav(false)
        setshowicon(true)
        sethideicon(false)
    }


    return ( 
        <nav className="flex justify-around items-center bg-black/90 py-3 sticky top-0 z-[1] h-[10vh] sm:relative">
            <div className="thumbimg w-fit sm:h-5 flex items-center">
                <Image
                    src={popcornlg}
                    quality={70}
                />
            </div>
            <div className="block relative">
                <div className="bg-black/10 flex items-center w-fit h-fit border-2 border-slate-50/50 rounded-full py-[2px]">
                    <div className="pl-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-100/50 sm:h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <div>
                        <input className="bg-black/10 outline-none px-1 rounded-full text-slate-100/75 placeholder:text-slate-50/50 text-sm font-bold sm:placeholder:text-xs text-[11px]" placeholder="Quick search" type="text"
                            onChange={
                                (e) => {
                                    setvalue(e.target.value)
                                }
                            }
                            value = {searchvalue}
                        />
                    </div>
                </div>
                
                {results && <div className="absolute my-3 bg-black rounded-b-lg w-full sm:my-0">{results.map((result, index) => {
                    if (index <= 7) {
                            const thumb = result.poster_path
                            const title = result.title || result.name
                            const year = String(result.release_date).substring(0,4) || String(result.first_air_date).substring(0,4)
                            const rate = result.vote_average
                            const vote = result.vote_count
                            const description = result.overview
                        
                        return (
                            <Link href={{
                                pathname: "/moviedetails/" + result.id,
                                query: { thumb, title, year, rate, vote, description }
                            }} key={result.id}>
                                <div className="flex text-slate-100 hover:bg-slate-700 py-1" onClick={()=>{setvalue('')}}>
                                    <div className="searchcont mx-3">
                                        <img src={`${base_url}${thumb}`} className="thumbimg"/>
                                    </div>
                                    <div className="text-sm font-semibold sm:font-bold text-[10px]">
                                        <p>{ title }</p>
                                        <p className="text-xs text-slate-300 my-2 font-normal sm:text-[10px]">{ year }</p>
                                    </div>                                    
                                </div>
                            </Link>      
                            )
                        }
                    })}</div>}
            </div>
            <div>
                {
                    showicon && (
                        <div onClick={showbar}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-50 hidden sm:block">
                                <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                            </svg>
                        </div>
                    )
                }
                {
                    hideicon && (
                        <div onClick={hidebar}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-50 hidden sm:block">
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                        </div>
                    )
                }
            </div>
            <div className="cursor-default sm:hidden">
                <Link href={"/"}><a className="list sm:py-2">Home</a></Link>
                <a className="list text-our-green hover:text-our-green sm:py-2">4K</a>
                <a className="list sm:py-2">Tv Shows</a>
                {user && (
                    <Link href={"/userfile/userpage"}>
                        <a className="list sm:py-2">Dashboard</a>
                    </Link>
                )}
                {!user && (
                    <span className="list sm:py-2">
                        <Link href="/userfile/login"><a className="list">Login</a></Link>|<Link href="/userfile/signup"><a className="list">Register</a></Link> 
                    </span>
                ) }
                {user && (
                    <span className="list sm:py-2">
                        <Link href={"/userfile/userpage"}>
                        <a className="list text-our-green hover:text-our-green">{user.username}</a></Link>|<a className="list text-slate-100 p-1 px-2 ml-2 rounded border border-our-green" onClick={handlelogout}>LogOut</a>
                    </span>
                )}
            </div>
            {
                shownav && (
                    <div className="hidden absolute w-full bg-black/95 top-[10vh] h-fit py-4 sm:block">
                        <div className="cursor-default navigationresp">
                            <Link href={"/"}><a className="list sm:py-2" onClick={hidebar}>Home</a></Link>
                            <a className="list text-our-green hover:text-our-green sm:py-2" onClick={hidebar}>4K</a>
                            <a className="list sm:py-2" onClick={hidebar}>Trending</a>
                            {user && (
                                <Link href={"/userfile/userpage"}>
                                    <a className="list sm:py-2" onClick={hidebar}>Dashboard</a>
                                </Link>
                            )}
                            {!user && (
                                <span className="list sm:py-2">
                                    <Link href="/userfile/login"><a className="list" onClick={hidebar}>Login</a></Link>|<Link href="/userfile/signup"><a className="list" onClick={hidebar}>Register</a></Link> 
                                </span>
                            ) }
                            {user && (
                                <span className="list sm:py-2">
                                    <Link href={"/userfile/userpage"}>
                                    <a className="list text-our-green hover:text-our-green" onClick={hidebar}>{user.username}</a></Link>|<a className="list text-slate-100 p-1 px-2 ml-2 rounded border border-our-green" onClick={handlelogout}><span onClick={hidebar}>LogOut</span></a>
                                </span>
                            )}
                        </div>
                    </div>
                )
            }
        </nav>
    );
}
 
export default Navigation;