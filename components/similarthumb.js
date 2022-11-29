import Link from "next/link";

const Similarthumb = ({ result }) => {
    const base_url = 'https://image.tmdb.org/t/p/original';

        const thumb = result.poster_path
        const title = result.title
        const year = String(result.release_date).substring(0,4)
        const rate = result.vote_average
        const vote = result.vote_count
        const description = result.overview
    
    return ( 
        <>
            <Link href={{
                pathname: "/moviedetails/" + result.id,
                query: { thumb, title, year, rate, vote, description }
            }} key={result.id}>
                <div className="thumbcont h-[138px] w-[92px] border-[2px] m-1 md:thumbcontmobile">
                    <img src={`${base_url}${thumb}`} className="thumbimg" />
                </div>
            </Link>  
        </> 
    );
}
 
export default Similarthumb;