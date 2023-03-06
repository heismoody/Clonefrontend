import React from 'react'

const Episodebunner = ({episodenumber, episodename, episodedate, overview, episodeimg, runtime}) => {
    const base_url = 'https://image.tmdb.org/t/p/original';
    return (
    <div className='flex sm:epsdcont'>
        <div className='w-[150px] h-full sm:epsdcontimg'>
            <img src={`${base_url}${episodeimg}`} className="thumbimg" />
        </div>
        <div className='flex flex-col justify-around'>
            <div>
                <h2 className="text-slate-100 font-bold text-base sm:text-sm">{episodenumber} {episodename}</h2>
                <h6 className="text-slate-100 font-bold text-base sm:text-sm">Release Date: {episodedate}</h6>
                <h6 className="text-slate-100 font-bold text-base sm:text-sm">Duration: {runtime} mins</h6>    
            </div>
            <div>
                <p className="paragraph text-justify max-w-lg w-full">{overview}</p>     
            </div>   
        </div> 
    </div>
  )
}

export default Episodebunner