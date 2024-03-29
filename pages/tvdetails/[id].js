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
            data,
            seasonid,
            id
        }
    }
}

const Tvdetails = ({ data, seasonid, id }) => {
    const base_url = 'https://image.tmdb.org/t/p/original';
    const { episodes } = data;
    const router = useRouter();
    const seasondata = router.query;
  return (
    <>
        <div className='flex justify-center bg-slate-900'>
            <div className='w-full'>
                <div className='flex py-3'>
                    <div className="h-[150px] w-[125px] px-4 md:epsdcontmobile">
                        <img src={`${base_url}${seasondata.img}`} className="thumbimg" />
                    </div>
                    <div>
                        <h2 className="detailhead text-2xl">{seasondata.seasonname}</h2>
                        <h4 className="text-slate-100 font-bold text-base sm:text-[12px] text-justify">Episodes {seasondata.seasonepisodes}</h4>  
                        <h4 className="detailhead sm:text-[12px]">{String(seasondata.seasonyear).substring(0,4)}</h4>   
                    </div>
                </div>
                <div>
                    {
                        episodes.map((episode, index) => {
                            if (index < seasondata.seasonepisodes) {
                                return  <div>
                                    <Episodebunner episodenumber={episode.episode_number} episodename={episode.name} episodedate={episode.air_date} overview={episode.overview} episodeimg={episode.still_path} runtime={episode.runtime} seasonid={seasonid} seasonnum={id} mediatype={seasondata.mediatype} />
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