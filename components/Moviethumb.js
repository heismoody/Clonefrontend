import Link from "next/link";

const MovieThumb = ({ title, rate, thumb, year, movieid, vote, description, mediatype, genre }) => {
    const base_url = 'https://image.tmdb.org/t/p/original'
    return (
        <div className="thumbcontainer sm:thumbcontainermobile">
            <div className="thumbcont relative sm:thumbcontmobile">
                <img src={`${base_url}${thumb}`} className="thumbimg"/>
                <div className="h-full w-full absolute top-0 hover:bg-black/70 transition-all duration-200">
                    <div className="h-full flex flex-col justify-around items-center opacity-0 hover:opacity-100 transition-all ease-in duration-300">
                        <div className="block">
                            <div className="flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-our-green text-our-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            </div>
                            <div>
                                <span className="thumbtxt">{rate}/10</span>
                            </div>
                        </div>
                        <div>
                            
                            <p className="thumbtxt">{genre[0]}</p>
                            <p className="thumbtxt">{genre[1]}</p>
                        </div> 
                        <div>
                            <Link href={{
                                pathname: "/moviedetails/" + movieid,
                                query: { thumb, title, year, rate, vote, description, mediatype}
                            }} key={movieid}>
                                <button className="thumbbtn">View Details</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h5 className="font-bold text-slate-100 pt-2 hover:text-slate-100/40">{title}</h5>
                <h6 className="text-slate-100/60 text-sm">{year}</h6>
            </div>
        </div>
    );
}
 
export default MovieThumb;