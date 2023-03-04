import { useRouter } from "next/router";
import React,{ useState, useEffect } from "react";
import Similarthumb from "../../components/similarthumb";
import { usercontexthook } from "../../hooks/UsercontextHook";
import { listcontexthook } from "../../hooks/Listcontexthook";
import Link from "next/link";


export async function getServerSideProps(context) {
    const id = context.query.id;
    const mediatype = context.query.mediatype;
    console.log({ mediatype });
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`);
    const resimg = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.API_KEY}`);
    const data = await res.json();
    const image = await resimg.json();

    return {
        props: {
            data,
            image,
            id
        }
    }

    
}

const MovieDetails = ({ data, image, id }) => {
    const router = useRouter();
    const thumb = router.query;
    const { page, results } = data;
    const { backdrops } = image;
    const { user } = usercontexthook()
    const [error, seterror] = useState('')
    const [size, setsize] = useState('')
    const [added, setadded] = useState(false)
    const [load, setload] = useState(false)
    const [download, setdownload] = useState(true)
    const {dispatch} = listcontexthook()

    const title = thumb.title;
    const year = thumb.year;
    const movieid = id;
    const posterurl = thumb.thumb;

    function runloading() {
        setload(true);
        setdownload(false);
    }
    
    const sendtolist = async () => {

        const tolist = {title,year,movieid,posterurl}
        const res = await fetch('https://clonebackend.vercel.app/api/downloadlist/entertolist', {
            method: 'POST',
            body: JSON.stringify(tolist),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const data = await res.json()
        seterror(data.error)
        setTimeout(function() {
            seterror('')
        }, 3000)

        if (res.ok) {
            setadded(true)
            setTimeout(function() {
                setadded(false)
            }, 3000)
            dispatch({type:'addtolist', payload: data})
        }

    }

    useEffect(() => {
        const showwidth = () => {
            return window.innerWidth;
        }
        setsize(showwidth())
    const handleResize = () => {
            setsize(window.innerWidth);
        }
    window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])

    
    const base_url = 'https://image.tmdb.org/t/p/original'
    const trailer = `https://autoembed.to/trailer/movie/`
    
    return ( 
        <>
            <div className="flex justify-center bg-slate-900 pb-5">
                <div className="w-[1100px] sm:w-full ">
                    <div className="flex pt-5 pb-8 md:block">
                        {
                            (size < 768) && ([
                                <div className="md:flex justify-center" key={id}>
                                    <div className="sm:pb-5 px-3 md:w-fit pb-5">
                                        <h2 className="detailhead text-4xl">{ thumb.title }</h2>
                                        <h4 className="detailhead">{ thumb.year }</h4>
                                        <h4 className="detailhead sm:text-base">Adventure/Animation/Comedy/Family</h4>
                                    </div>
                                </div>
                            ]
                            )
                        }
                        <div className="md:flex justify-center">
                            <div className="sm:w-fit">
                            <div className="thumbcont hover:border-inherit ">
                                <img src={`${base_url}${thumb.thumb}`} className="thumbimg"/>
                            </div>
                                <div className="my-2 thumbcontainer">
                                    <Link href={`${process.env.NEXT_PUBLIC_MOVIE_LINK}${id}`}>
                                        <a onLoad={() => { setload(false); setdownload(true) }}>
                                            <button className="text-base text-slate-200 font-bold bg-our-green rounded py-1 w-full flex justify-center" onClick={runloading}>
                                        {
                                            download &&
                                            <div>        
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 inline">
                                                    <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" /> 
                                                </svg>
                                                <span>Download</span>           
                                            </div>
                                        }
                                        {
                                            load && 
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="animate-spin font-bold w-6 h-6">
                                                <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
                                            </svg>
                                        }
                                            </button>
                                        </a>
                                    </Link>
                                <button className="text-base text-slate-200 font-bold bg-btn-blue rounded py-1 w-full flex justify-center mt-2 ">
                                        <Link href={{
                                            pathname: './stream',
                                            query: {id: movieid},
                                            }}>
                                            <span>Watch Now</span>
                                        </Link> 
                                </button>
                            </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-around ml-16 md:ml-0">
                            {
                                (size > 768) && ([
                                    <div key={id}>
                                        <h2 className="detailhead text-4xl sm:text-[16px]">{ thumb.title }</h2>
                                        <h4 className="detailhead sm:text-xs">{ thumb.year }</h4>
                                        <h4 className="detailhead sm:text-xs">Adventure/Animation/Comedy/Family</h4>
                                    </div>
                                ]
                                )
                            }
                            <div className="md:flex justify-center">
                                <p className="paragraph text-left max-w-lg sm:px-3 w-full">
                                    <span className="block text-slate-100 font-bold text-base sm:text-base text-justify">Description</span>
                                    {thumb.description}
                                </p>
                            </div>
                            <div className="md:flex justify-center">
                                <div className="w-fit">
                                    <div className="mb-3">
                                        <button className="flex border border-slate-300 rounded px-5 py-[2px] w-full items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-our-green sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            <span className="font-bold text-our-green mx-2 text-sm ">Subtitles</span>
                                        </button>
                                    </div>
                                    {
                                        user &&
                                    <div className="mb-3">
                                        <button className="flex border border-our-green rounded px-5 py-[2px] w-full items-center justify-center" onClick={sendtolist}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-100">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                            <span className="font-bold text-slate-100 mx-2 text-sm">Add To List</span>
                                            {
                                            added &&  
                                                <span>
                                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-our-green">
                                                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                                 </svg>
                                                </span>       
                                            }       
                                                   
                                        </button>
                                                {error && <div className="text-red-600 text-xs py-2 font-bold">{ error }</div>}      
                                    </div>
                                    }
                                    
                                    <div className="flex">
                                        <div className="flex">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-our-green text-our-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                            <span className="font-bold text-slate-100 mx-3">{ thumb.vote}</span>
                                        </div>
                                        <img src="https://yts.mx/assets/images/website/logo-imdb.svg"/>
                                        <span className="font-bold text-slate-100 mx-3">{ thumb.rate}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ml-5 md:ml-0 flex justify-center">
                            <div>
                                <h5 className="text-slate-100 font-bold text-base md:text-center py-3">Similar Movies</h5>
                                <div className="grid grid-cols-2">
                                    {results.map((result, index) => {
                                        if (index <= 3) {
                                            return <Similarthumb result={ result }/>
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between mt-5 md:justify-center">
                        <div className="w-[600px] h-[416px] bg-black sm:youtube">
                            <iframe className="thumbimg hover:opacity-70" src={`${trailer}${id}`}></iframe>
                        </div>
                        <div className="grid grid-rows-2 gap-y-2 pl-4 md:hidden">
                            {backdrops.map((backdrop, index) => {
                            if (index <= 1) {
                                return [
                                    <div className="w-[480px] h-[201px] hover:bg-black sm:w-full" key={image.id}>
                                        <img src={`${base_url}${backdrop.file_path}`} className="thumbimg hover:opacity-70" />
                                    </div>
                                ]
                            }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default MovieDetails;