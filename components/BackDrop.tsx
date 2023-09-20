"use client"

import { IsOfferDrawOpen } from '@/store/atoms/isOfferDrawOpen'
import { OpenGameOver } from '@/store/atoms/opengameover'
import { promotepiece } from '@/store/atoms/promotePiece'
import { shareLink } from '@/store/atoms/shareLink'
import React from 'react'
import { useRecoilValue } from 'recoil'

const BackDrop = () => {
    const shrLink=useRecoilValue(shareLink)
    const promotepieceIsOpen=useRecoilValue(promotepiece)
    const openGameOver=useRecoilValue(OpenGameOver)
    const isOfferDrawOpen=useRecoilValue(IsOfferDrawOpen)
  return (
    <>
       {(shrLink || promotepieceIsOpen || openGameOver || isOfferDrawOpen) && <div className='bg-gray-900 bg-opacity-70  h-[110vh] w-[110vw] z-[1] absolute top-0' ></div>}
    </>
  )
}

export default BackDrop
