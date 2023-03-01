import React from 'react';
import { useRouter } from "next/router"

const Stream = () => {
    const router = useRouter();
    const query = router.query;
    const streamlink = `https://autoembed.to/movie/tmdb/`
  return (
      <>
        <div className='bg-slate-900 h-fit pb-4'>
            <div className="w-[600px] h-[416px] bg-black sm:youtube">
                  <iframe className="thumbimg hover:opacity-70" src={`${streamlink}${query.id}`} width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
            </div> 
        </div>
      </>
  )
}

export default Stream;