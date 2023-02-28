import { useRouter } from "next/router";
import React from 'react'

const Stream = () => {
    const router = useRouter();
    const query = router.query;
    console.log(query);
  return (
      <>
          <div>Tsupp man this is your movie id</div>
      </>
  )
}

export default Stream