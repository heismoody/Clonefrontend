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

const Tvdetails = ({ data}) => {
    const { episodes } = data;
  return (
      <>
        {
            episodes.map((episode, index) => {
                if (index <= 2) {
                     return <div>{episode.name}</div>
                }
            })      
        }
      </>
  )
}

export default Tvdetails