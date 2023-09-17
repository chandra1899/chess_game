"use client"

import { shareLink } from '@/store/atoms/shareLink'
import React from 'react'
import { useRecoilValue } from 'recoil'

const BackDrop = () => {
    const shrLink=useRecoilValue(shareLink)
  return (
    <>
       {(shrLink) && <div className='bg-gray-900 bg-opacity-70  h-[110vh] w-[110vw] z-[1] absolute top-0' ></div>}
    </>
  )
}

export default BackDrop
