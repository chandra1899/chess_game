"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import { History } from '@/store/atoms/history'

const valueToLetter=['A','B','C','D','E','F','G','H'];

const MoveState=({data}:{data:{from:[number,number],to:[number,number],isWhiteSide:boolean}})=>{
  const [selected,setSelected]=useState('')
  return (
    <div className={`w-[100%] h-[40px] rounded-md flex flex-row justify-center items-center cursor-pointer hover:bg-[#A0793D] ${data.isWhiteSide?'text-black bg-slate-100 ':'text-white bg-black'} transition-all ease-in-out delay-[10ms] my-3`}>
      <p className='font-bold'>{valueToLetter[data.from[0]]}{data.from[1]}</p>
      <Image
      height={30}
      width={30}
      src={'/rightArrow.png'}
      alt='right arrow'
      className='mx-8'
      />
      <p className='font-bold'>{valueToLetter[data.to[0]]}{data.to[1]}</p>
    </div>
  )
}

const Left = () => {
  const history=useRecoilValue(History)
  return (
    <div className='h-[100vh] w-[23%] bg-black text-white border-[1px] border-slate-600 p-2 relative'>
      <div className='h-[100%] w-[100%] overflow-y-scroll'>
         {history.length!==0 && history.map((hisValue)=>(
          <MoveState data={hisValue} />
        ))}
      {/* <MoveState color='white' />
      <MoveState color='black' /> */}
      
      </div>
      <div className='absolute h-[55px] w-[100%] bg-[#222222e6] bottom-0 flex flex-row justify-between items-center'>
      <Image
      height={30}
      width={30}
      src={'/left_arrow.png'}
      alt='right arrow'
      className='mx-8 cursor-pointer'
      />
       <Image
      height={30}
      width={30}
      src={'/right_arrow.png'}
      alt='right arrow'
      className='mx-12 cursor-pointer'
      />
      </div>
    </div>
  )
}

export default Left
