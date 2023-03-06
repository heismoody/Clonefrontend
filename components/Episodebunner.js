import React from 'react'
import Image from 'next/image';

const Episodebunner = ({episodenumber, episodename, episodedate, overview, episodeimg, runtime}) => {
    const base_url = 'https://image.tmdb.org/t/p/original';
    return (
    <div className='flex'>
        <div>
            <Image
                src={`${base_url}${episodeimg}`}
                width={120}
                height={90} 
                alt="episode picture"    
            />
        </div>
        <div className='flex flex-col justify-around'>
            <div>
                <h2>{episodenumber} {episodename}</h2>
                <h6>Release Date: {episodedate}</h6>
                <h6>Duration: {runtime}</h6>    
            </div>
            <div>
                <p className="paragraph text-left max-w-lg sm:px-3 w-full">{overview}</p>     
            </div>   
        </div> 
    </div>
  )
}

export default Episodebunner