import React from 'react'

const HomeRight = () => {
  return (
    <div className='h-[100vh] w-[27%] bg-[#222222e6] text-white'>
     <div className='w-[100%] h-[40%] bg-red-400'></div>
     <div className='flex flex-col justify-center items-center p-5'>
        <p className='h-[45px] w-[80%] flex justify-center items-center rounded-md cursor-pointer hover:bg-[#736767e6] bg-[#4b4545e6] m-2 transition-all ease-in-out delay-[20ms]'>Create Game</p>
        <p className='h-[45px] w-[80%] flex justify-center items-center rounded-md cursor-pointer hover:bg-[#736767e6] bg-[#4b4545e6] m-2 transition-all ease-in-out delay-[20ms]'>Play with Friend</p>
        <p className='h-[45px] w-[80%] flex justify-center items-center rounded-md cursor-pointer hover:bg-[#736767e6] bg-[#4b4545e6] m-2 transition-all ease-in-out delay-[20ms]'>Play with Computer</p>
     </div>
    </div>
  )
}

export default HomeRight
