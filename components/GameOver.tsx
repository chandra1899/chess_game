"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { GameFinished } from '@/store/atoms/gameFilnished'
import { OpenGameOver } from '@/store/atoms/opengameover'

const GameOver = ({whoWon}:{whoWon:boolean}) => {
  const openGameOver=useRecoilValue(OpenGameOver)
  const gameFinished=useRecoilValue(GameFinished)
  const setOpenGameOver=useSetRecoilState(OpenGameOver)
  return (
    <>
    {openGameOver && gameFinished && <div className='h-auto w-[300px] bg-black absolute mx-auto top-[30vh] p-3 rounded-lg text-white z-[2]'>
         <div className='relative'>
         <Image
            height={20}
            width={20}
            src={'/close.svg'}
            alt='copy link'
            className='absolute top-0 right-0 cursor-pointer'
            onClick={()=>{setOpenGameOver(false)}}
      />
         </div>
         <div className='flex flex-col justify-center items-center'>
         <p className='font-medium text-[22px] mt-4'>Game Over !</p>
      {whoWon?<div className=' bg-green-600 font-medium text-[20px] rounded-lg my-6 flex justify-center items-center px-4 py-2'>You Won</div>
      :  <div className=' bg-red-600 font-medium text-[20px] rounded-lg my-6 flex justify-center items-center px-4 py-2'>You Loss</div>
    }
         </div>
      
    </div>}
    </>
  )
}

export default GameOver
