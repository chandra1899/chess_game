import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-row justify-center items-center h-[100vh]'>
      <p className='text-[1.5rem] font-bold mx-2'>404</p>
      <p className='mx-2 text-[2rem] mb-1 font-light text-slate-500'>|</p>
      <p className='mx-2 font-medium'>This page could not be found.</p>
    </div>
  )
}

export default NotFound
