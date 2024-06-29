"use client"
import { establishStatus } from '@/store/atoms/establishStatus'
import { establishStatusOn } from '@/store/atoms/establishStatusOn'
import Image from 'next/image'
import React from 'react'
import { useRecoilValue } from 'recoil'

const InitialConStatusPopup = () => {
    const establishStatusValue=useRecoilValue(establishStatus)
    const establishStatusOnValue=useRecoilValue(establishStatusOn)
  return (
    <>
    {establishStatusOnValue && <div className='h-auto  bg-black absolute mx-auto top-[30vh] p-3 rounded-lg text-white z-[2] flex flex-row justify-center items-center'>
        <Image
            height={35}
            width={35}
            src = '/loading.gif'
            alt='loading gif'
            />
      <p className='mx-3'>{establishStatusValue}</p>
    </div>}
    </>
  )
}

export default InitialConStatusPopup
