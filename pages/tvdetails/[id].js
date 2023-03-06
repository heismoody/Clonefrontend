import { useRouter } from 'next/router';
import React from 'react';
import Episodebunner from '../../components/Episodebunner';


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
            <div>
                <div className='flex items-center'>
                    <div className="thumbcont h-[100px] w-[80px] m-1 md:thumbcontmobile">
                        <img src={`${base_url}${seasondata.img}`} className="thumbimg" />
                    </div>
                    <div>
                        <h2>{seasondata.seasonname}</h2>
                        <h6>{seasondata.seasonyear}</h6>  
                    </div>
                </div>
                <div>
                    <h4>Episodes {seasondata.seasonepisodes}</h4>  
                </div> 
                <div>
                    {
                        episodes.map((episode, index) => {
                            if (index < seasondata.seasonepisodes) {
                                return  <div>
                                <Episodebunner episodenumber={episode.episode_number} episodename={episode.name} episodedate={episode.air_date} overview={episode.overview} episodeimg={episode.still_path} runtime={episode.runtime} />
                                </div>
                            }
                        })      
                    }   
                </div>  
            </div>    
        </div>
    </>
  )
}

export default Tvdetails