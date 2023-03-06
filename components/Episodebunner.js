import React, { useState } from 'react'


const Episodebunner = ({episodenumber, episodename, episodedate, overview, episodeimg, runtime}) => {
    const base_url = 'https://image.tmdb.org/t/p/original';

    const [load, setload] = useState(false)
    const [download, setdownload] = useState(true)

    function runloading() {
        setload(true);
        setdownload(false);
    }

    return (
    <div className='flex my-3 h-[130px] sm:epsdcont'>
        <div className='w-[250px] h-full px-3 sm:epsdcontimg'>
            <img src={`${base_url}${episodeimg}`} className="thumbimg" />
        </div>
        <div className='flex flex-col justify-around'>
            <div className='sm:pt-3'>
                <h2 className="text-slate-100 font-bold text-2xl sm:text-sm">{episodenumber}. {episodename}</h2>
                <h6 className="text-slate-100 font-bold text-sm sm:text-sm">Release Date: <span className='text-slate-100/70'>{episodedate}</span></h6>
                <h6 className="text-slate-100 font-bold text-sm sm:text-sm">Duration: <span className='text-slate-100/70'>{runtime} mins</span></h6>    
            </div>
            <div>
                <p className="paragraph text-justify max-w-lg w-full">{overview}</p>     
            </div> 
            <div className='flex'>
                <button className="text-base text-slate-200 font-bold bg-btn-blue rounded py-1 w-full flex justify-center mt-2 ">
                    <Link href={`${process.env.NEXT_PUBLIC_MOVIE_LINK}${episodenumber}`}>
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
                    <Link href={{
                            pathname: '../moviedetails/stream',
                            query: {id: episodenumber},
                            }}>
                            <span>Watch Now</span>
                    </Link> 
                </button>
            </div>   
        </div> 
    </div>
  )
}

export default Episodebunner