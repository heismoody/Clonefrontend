import React from 'react';
import { useRouter } from "next/router"

const Stream = () => {
    const router = useRouter();
    const query = router.query;
    const streamlink = `https://www.2embed.to/embed/tmdb/movie?id=`
    const streamtvlink = `https://autoembed.to/tv/tmdb/`
  return (
    <>
          <div className='bg-slate-900 h-screen py-4'>
              <div className='w-full flex justify-center'>
                  <p className="paragraph">We hate ads as you do. For this might take a while for we to fix.
                      At the moment <b>you can use the back button on your phone</b> to navigate back the site and continue streaming.
                      While on computer <b>you can close the redirecting tab</b></p>
              </div>
              <div className='flex justify-center'>
                <div className="w-10/12 h-[80vh] bg-black sm:youtube">
                  {
                    query.mediatype == "movie" &&
                    <iframe className="thumbimg" src={`${streamlink}${query.id}`} width="100%" height="100%" frameBorder="0" allowFullScreen></iframe>
                  }
                  {
                    query.mediatype == "tv" &&
                    <iframe className="thumbimg" src={`${streamtvlink}${query.id}-${query.seasonnum}-${query.episodenum}`} width="100%" height="100%" frameBorder="0" allowFullScreen></iframe>
                  }
                </div>
            </div> 
        </div>
    </>
  )
}

export default Stream;