"use client"

import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { HomeLeft, HomeRight } from '@/components'

export default function Home() {
  const {status,data:session} =useSession()
  return (
    <main>
      <div className='h-[100vh] w-[100vw] bg-black'>
      <nav className='flex flex-row h-[40px] w-[100vw] justify-between px-12 pr-24 pt-2 items-center bg-[#222222e6]'>
        <div className='flex w-[60%] justify-around'>
        <h3 className='text-white font-medium text-[18px]'>ChessFocus</h3>

        <div className='flex flex-row w-auto'>
        <input
        type="text" 
        placeholder='Search'
        className={`bg-gray-800 border-slate-500 border-[0.1rem] border-solid text-white placeholder:text-secondary placeholder:opacity-60 h-[33px] w-[270px] py-2 px-3  rounded-md outline-none focus:border-blue focus:bg-black rounded-l-full rounded-r-full focus:border-[0.1rem] focus:border-solid  font-medium`}
        />
        <Image
        src={'/search.png'}
        height={2}
        width={30}
        className='-ml-10'
        alt='search'
        />
        </div>

        </div>      

        <button className='h-[98%] mt-1 w-[75px] rounded-md bg-violet-700 font-medium hover:bg-violet-800 text-white ml-12'>Log Out</button>
      </nav>

      <div className='flex flex-row justify-around'>
        <HomeLeft/>
        <HomeRight/>
      </div>
      </div>      
    </main>
  )
}
