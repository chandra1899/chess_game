import React from 'react'
import Image from 'next/image'

const MoveState=({color}:{color:string})=>{
  return (
    <div className={`w-[100%] h-[40px] rounded-md flex flex-row justify-center items-center cursor-pointer bg-${color} ${color=='slate-100'?'text-black hover:bg-slate-300':'text-white hover:bg-slate-800'} transition-all ease-in-out delay-[20ms] my-3`}>
      <p className='font-bold'>H4</p>
      <Image
      height={30}
      width={30}
      src={'/rightArrow.png'}
      alt='right arrow'
      className='mx-8'
      />
      <p className='font-bold'>E8</p>
    </div>
  )
}

const Left = () => {
  return (
    <div className='h-[100vh] w-[23%] bg-black text-white border-[1px] border-slate-600 p-2 relative'>
      <div className='h-[100%] w-[100%] overflow-y-scroll'>
      <MoveState color='slate-100' />
      <MoveState color='black' />
      <MoveState color='slate-100' />
      <MoveState color='black' />
      <MoveState color='slate-100' />
      <MoveState color='black' />
      <MoveState color='slate-100' />
      <MoveState color='black' />
      <MoveState color='slate-100' />
      <MoveState color='black' />
      <MoveState color='slate-100' />
      <MoveState color='black' />
      <MoveState color='slate-100' />
      <MoveState color='black' />
      <MoveState color='slate-100' />
      <MoveState color='black' />
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
