import { useEffect } from "react";
import MovieThumb from "../components/Moviethumb"


export const Movielistendpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`;

export async function getServerSideProps() {
  const res = await fetch(Movielistendpoint);
  const resgenre = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`)
  const resupcoming = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=1`)
  const resnow = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&page=1`)
  const data = await res.json();
  const genre = await resgenre.json();
  const upcoming = await resupcoming.json();
  const nowplaying = await resnow.json();

  return {
    props: {
      data,
      genre,
      upcoming,
      nowplaying
    }
  }
}

export default function Home({ data, genre, upcoming, nowplaying }) {
  const { page, results } = data;
  const { genres } = genre;

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then(registration => {
            console.log("service worker registration successful")
          })
          .catch(err => {
            console.warn('serviceworker registration failed moody', err.message);
          });
      })
    }
  }, [])

  return (
    <>
      <div className="bg-slate-900 h-fit pb-4">
        <h1 className="heading1 sm:text-xl">Download YTS YIFY movies: HD smallest size</h1>
        <div className="flex justify-center">
          <p className="paragraph">
            Welcome to the inspired site <b>popcorn movies</b>(.LT) website. Here you can browse and download movies in excellent quality, all at the smallest file size. YTS Movies Torrents.
          </p>
        </div>
        <div className="flex justify-center mt-0 pt-0">
          <div className="flex items-center w-fit">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-our-green text-our-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </span>
            <span className="heading2 pl-2">Popular Downloads</span>
          </div>
        </div>
        <div className="flex justify-center my-5">
          <hr className="w-[1100px] border-slate-100/50"/>
        </div>
        <div className="flex justify-center">
          <div className="w-[1100px] flex justify-between px-5 sm:thumbmob">
            {results.map((result, index) => {
              if (index <= 3) {
                // result.genre_ids.forEach(element => {
                //   for (let i = 0; i < genres.length; i++) {
                //     if (element == genres[i].id) {
                //       // console.log(genres[i].name);
                //     }
                    
                //   }
                // });
                
              const moviedate = result.release_date;
              const releasedate = moviedate.substring(0, 4);

              return <MovieThumb title={result.title} rate={result.vote_average} thumb={result.poster_path} year={releasedate} movieid={result.id} vote={result.vote_count} description={result.overview}/>
            }
          })}
          </div>
        </div>
      </div>
      <div className="bg-slate-800 py-6">
        <div className="flex justify-center pb-5">
          <h3 className="w-[1100px] heading2 sm:text-center">Now Playing</h3>
        </div>
        <div className="flex justify-center">
          <div className="w-[1100px] grid grid-cols-4 gap-x-[90px] gap-y-[40px] px-5 sm:tempres">
            {nowplaying.results.map((result, index) => {
              if (index <= 7) {
                const moviedate = result.release_date;
                const releasedate = moviedate.substring(0, 4);

                return <MovieThumb title={result.title} rate={result.vote_average} thumb={result.poster_path} year={releasedate} movieid={result.id} vote={result.vote_count} description={result.overview}/>
            }
          })}
          </div>
        </div>
      </div>
      <div className="bg-slate-700 py-6">
        <div className="flex justify-center pb-5">
          <h3 className="w-[1100px] heading2 sm:text-center">Upcoming Movies</h3>
        </div>
        <div className="flex justify-center">
          <div className="w-[1100px] flex justify-between px-5 sm:thumbmob">
            {upcoming.results.map((result, index) => {
              if (index <= 3) {

                return <MovieThumb title={result.title} rate={result.vote_average} thumb={result.poster_path} year={result.release_date} movieid={result.id} vote={result.vote_count} description={result.vote_count}/>
            }
          })}
          </div>
        </div>
      </div>
    </>

  )
}
