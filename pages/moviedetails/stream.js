import React from 'react'
import { useRouter } from "next/router";

const Stream = () => {
    const router = useRouter();
    const query = router.query;
    const movieid = query.id;
  return (
      <>
          <div>Tsupp man this is your movie id {movieid}</div>
      </>
  )
}

export default Stream