import { useRouter } from 'next/router';
import React from 'react';


export async function getServerSideProps(context) {
    const id = context.query.id;
    const seasonid = context.query.movieid;
    const res = await fetch(`https://api.themoviedb.org/3/tv/${seasonid}/season/${id}?api_key=${process.env.API_KEY}`);
    const data = await res.json();

    return {
        props: {
            data
        }
    }
}

const Tvdetails = ({ data }) => {
    const base_url = 'https://image.tmdb.org/t/p/original';
    const { episodes } = data;
    const router = useRouter();
    const seasondata = router.query;
  return (
      <>
        <div className='flex justify-center bg-slate-900 py-3'>
            <div className='flex'>
                <div className="thumbcont h-[138px] w-[92px] border-[2px] m-1 md:thumbcontmobile">
                      <img src={`${base_url}${seasondata.img}`} className="thumbimg" />
                  </div>
                  <div>
                      <span>{seasondata.seasonname}{seasondata.seasonyear}</span>
                  </div>
            </div>
        {
            episodes.map((episode, index) => {
                if (index <= 2) {
                     return <div>{episode.name}</div>
                }
            })      
        }   
        </div>
      </>
  )
}

export default Tvdetails