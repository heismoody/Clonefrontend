import React from 'react'
import MovieThumb from '../../components/Moviethumb';

export async function getServerSideProps() {
  const res = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`)
  const data = await res.json();

  return {
    props: {
      data,
    }
  }
}

const tvshows = ({ data }) => {
  const { page, results } = data;
  return (
    <>
      <div className='bg-slate-900 h-fit pb-4'>
        <div className='flex justify-center'>
          <div>
            <h1 className="heading1 sm:text-xl">With Popcorn Movies Tv Shows Are Happening</h1>
            <p className="paragraph text-center text-slate-100">
              Sometimes scars you can not see are the ones that hurt the most.
              <cite className='block'>~Samantha Larusso</cite>
            </p>
          </div>
        </div>
        <div>
          <p className='heading2'>Popular Tv Shows</p>
        </div>
        <div className="flex justify-center">
          <div className="w-[1100px] flex justify-between px-5 sm:thumbmob">
            {
              results.map((result, index) => {
                if (index <= 3) {
                  const moviedate = result.release_date;
                  const releasedate = moviedate.substring(0, 4);

                  return <MovieThumb title={result.title} rate={result.vote_average} thumb={result.poster_path} year={releasedate} movieid={result.id} vote={result.vote_count} description={result.overview}/>
                }
              })
            }
          </div>
        </div>
      </div>   
    </>
  )
}

export default tvshows