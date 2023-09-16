import React from 'react'
import Image from 'next/image'

const GameOver = () => {
  return (
    <div className='h-auto w-[300px] bg-black absolute mx-auto top-[30vh] p-3 rounded-lg text-white '>
         <div className='relative'>
         <Image
            height={20}
            width={20}
            src={'/close.svg'}
            alt='copy link'
            className='absolute top-0 right-0 cursor-pointer'
      />
         </div>
         <div className='flex flex-col justify-center items-center'>
         <p className='font-medium text-[22px] mt-4'>Game Over !</p>
      <div className=' bg-green-600 font-medium text-[20px] rounded-lg my-6 flex justify-center items-center px-4 py-2'>You Won</div>
         </div>
      
    </div>
  )
}

export default GameOver
