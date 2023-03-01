import React from 'react';
import { useRouter } from "next/router"

const Stream = () => {
    const router = useRouter();
    const query = router.query;
    const streamlink = `https://www.2embed.to/embed/tmdb/movie?id=`
  return (
    <>
        <div className='bg-slate-900 h-screen py-4'>
            <div className='flex justify-center'>
                <div className="w-10/12 h-[80vh] bg-black sm:youtube">
                    <iframe className="thumbimg hover:opacity-70" src={`${streamlink}${query.id}`} width="100%" height="100%" frameBorder="0" allowFullScreen></iframe>
                </div>
            </div> 
        </div>
    </>
  )
}

export default Stream;