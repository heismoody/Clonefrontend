import React from 'react';
import { useRouter } from "next/router"

const Stream = () => {
    const router = useRouter();
    const query = router.query;
  return (
      <>
          <div>Tsupp man this is your movie id</div>
      </>
  )
}

export default Stream;