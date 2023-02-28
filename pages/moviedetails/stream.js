import React from 'react'
import { useRouter } from "next/router";

const stream = () => {
    const router = useRouter();
    const query = router.query;
  return (
      <>
          <div>Tsupp man this is your movie id {query.id} </div>
      </>
  )
}

export default stream