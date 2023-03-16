import React from 'react'
import MovieThumb from '../../components/Moviethumb';

export async function getServerSideProps() {
  const res = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`)
  const topres = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`)
  const airres = await fetch (`https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.API_KEY}&language=en-US&page=1`)
  const data = await res.json();
  const topdata = await topres.json();
  const airdata = await airres.json();

  return {
    props: {
      data,
      topdata,
      airdata
    }
  }
}

const tvshows = ({ data, topdata, airdata }) => {
  const { page, results } = data;
  return (
    <>
      <div className="bg-slate-900 h-fit pb-4">
        <h1 className="heading1 sm:text-xl">With Popcorn Movies: Tv Shows Are Happening</h1>
        <div className="flex justify-center">
          <p className="paragraph">
            Sometimes scars you can not see are the ones that hurt the most.
              <cite className='block'>~Samantha Larusso</cite>
          </p>
        </div>
        <div className="flex justify-center mt-0 pt-0">
          <div className="flex items-center w-fit">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-our-green text-our-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </span>
            <span className="heading2 pl-2">Top Rated</span>
          </div>
        </div>
        <div className="flex justify-center my-5">
          <hr className="w-[1100px] border-slate-100/50"/>
        </div>
        <div className="flex justify-center">
          <div className="w-[1100px] flex justify-between px-5 sm:thumbmob">
            {
              topdata.results.map((result, index) => {
                if (index <= 3) {
                  const moviedate = result.first_air_date;
                  const releasedate = moviedate.substring(0, 4);

                  return <MovieThumb title={result.name} rate={result.vote_average} thumb={result.poster_path} year={releasedate} movieid={result.id} vote={result.vote_count} description={result.overview}/>
                }
              })
            }
          </div>
        </div>
      </div>
      <div className="bg-slate-800 py-6">
        <div className="flex justify-center pb-5">
          <h3 className="w-[1100px] heading2 sm:text-center">Airing Today</h3>
        </div>
        <div className="flex justify-center">
          <div className="w-[1100px] grid grid-cols-4 gap-x-[90px] gap-y-[40px] px-5 sm:tempres">
            {
              airdata.results.map((result, index) => {
                if (index <= 7) {
                  const moviedate = result.first_air_date;
                  const releasedate = moviedate.substring(0, 4);

                  return <MovieThumb title={result.name} rate={result.vote_average} thumb={result.poster_path} year={releasedate} movieid={result.id} vote={result.vote_count} description={result.overview}/>
                }
              })
            }
          </div>
        </div>
      </div>   
      <div className="bg-slate-700 py-6">
        <div className="flex justify-center pb-5">
          <h3 className="w-[1100px] heading2 sm:text-center">Popular Downloads</h3>
        </div>
        <div className="flex justify-center">
          <div className="w-[1100px] grid grid-cols-4 gap-x-[90px] gap-y-[40px] px-5 sm:tempres">
            {
              results.map((result, index) => {
                if (index <= 3) {
                  const moviedate = result.first_air_date;
                  const releasedate = moviedate.substring(0, 4);

                  return <MovieThumb title={result.name} rate={result.vote_average} thumb={result.poster_path} year={releasedate} movieid={result.id} vote={result.vote_count} description={result.overview}/>
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