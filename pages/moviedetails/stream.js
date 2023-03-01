import React from 'react';
import { useRouter } from "next/router"

const Stream = () => {
    const router = useRouter();
    const query = router.query;
    const streamlink = `https://www.2embed.to/embed/tmdb/movie?id=`
  return (
      <>
        <div className='bg-slate-900 h-fit pb-4'>
            <div className="w-[600px] h-[416px] bg-black sm:youtube">
                  <iframe className="thumbimg hover:opacity-70" src={`${streamlink}${query.id}`} width="100%" height="100%" frameBorder="0" allowFullScreen></iframe>
            </div> 
        </div>
      </>
  )
}

export default Stream;