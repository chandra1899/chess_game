"use client"

import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'

export default function Home() {
  const {status,data:session} =useSession()
  return (
    <main>
      {/* {status==='authenticated'?:'chess game'} */}
      <div>
       <p>name:{session?.user?.name}</p>
       <p>email:{session?.user?.email}</p>
      </div>
      <button onClick={()=>{signOut()}}>signout</button>
      
    </main>
  )
}
