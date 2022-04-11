import { useRouter } from 'next/router';
import React from 'react'

function Home() {
    const router=useRouter()

    setTimeout(()=>{
        router.push('/characters/characters')
    },300)
  return (
    <div style={{display:'grid',placeItems:"center",alignItems:'center',fontWeight:'bold',
    fontSize:'2rem',
    marginTop:"212px"}}>
        <h1>Loading Characters...</h1>
    </div>
  )
}

export default Home;