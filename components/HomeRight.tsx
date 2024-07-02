"use client"

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';

const HomeRight = ({sessionData} : {sessionData : Session}) => {
  const router = useRouter();
  const generateRandomCharactors = ()=>{
    let allChar="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomCharactors = "";

    for(let i=0;i<15;i++){
        let randomNum = Math.floor(Math.random() * allChar.length);
        randomCharactors+=allChar[randomNum];
    }
    return randomCharactors
}

  const onClickPlayWithFriend=()=>{
  let _id=generateRandomCharactors()
  router.push(`/game/${_id}`);
  }
  return (
    <div className='hidden xs:block h-[100vh] w-[27%] bg-[#222222e6] text-white'>
     <div className='w-[100%] h-[40%] flex flex-row justify-center items-center'>
      <div className='w-[30%] mx-3'>
      <Image
      height={100}
      width={100}
      src={'/profile.png'}
      alt='profle'
      className='rounded-full'
      />
      </div>
      <div className='flex flex-col w-[60%]'>
      <p className='break-all mx-2 '>Name: <span className='text-orange-400'>{sessionData?.user?.name}</span></p>
     <p className='break-all mx-2'>Email: <span className='text-orange-400'>{sessionData?.user?.email}</span></p>
      </div>
     </div>

     <div className='flex flex-col justify-center items-center p-5'>
        <p className='h-[45px] w-[80%] flex justify-center items-center rounded-md bg-[#353131e6] m-2 transition-all ease-in-out delay-[20ms]'>Create Game</p>
        <p onClick={onClickPlayWithFriend} className='h-[45px] w-[80%] flex justify-center items-center rounded-md cursor-pointer hover:bg-[#736767e6] bg-[#4b4545e6] m-2 transition-all ease-in-out delay-[20ms]'>Play with Friend</p>
        <p className='h-[45px] w-[80%] flex justify-center items-center rounded-md bg-[#353131e6] m-2 transition-all ease-in-out delay-[20ms]'>Play with Computer</p>
     </div>
    </div>
  )
}

export default HomeRight
