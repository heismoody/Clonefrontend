import React from 'react'

const Episodebunner = ({episodenumber, episodename, episodedate, overview, episodeimg, runtime}) => {
    const base_url = 'https://image.tmdb.org/t/p/original';
    return (
    <div className='flex h-fit sm:epsdcont'>
        <div className='w-[150px] h-full px-3 sm:epsdcontimg'>
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
        </div> 
    </div>
  )
}

export default Episodebunner