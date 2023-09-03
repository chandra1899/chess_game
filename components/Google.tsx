"use client"

import Image from 'next/image'
import { signIn } from 'next-auth/react'

export default function Google(){
    return <div onClick={()=>{signIn("google")}} className="h-[50px] w-[300px] my-5 flex justify-center rounded-lg items-center bg-black cursor-pointer">
        <Image
            height={100}
             width={100}
            src="/google_text.png"
            alt="google login text"
    />
    </div>
}