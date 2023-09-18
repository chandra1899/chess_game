import React from 'react'
import Image from 'next/image'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { WhiteSideIs } from '@/store/atoms/whiteSIde'
import { promotepiece } from '@/store/atoms/promotePiece'

const PromotPeice = () => {
    const isWhiteSide=useRecoilValue(WhiteSideIs)
    const promotepieceIsOpen=useRecoilValue(promotepiece)
    const setPromotepiece=useSetRecoilState(promotepiece)
  return (
    <>
    {promotepieceIsOpen && <div className='h-auto w-[99%vw] xs:w-[450px] bg-black absolute mx-auto top-[30vh] p-3 rounded-md z-[2]'>
       <Image
            height={20}
            width={20}
            src={'/close.svg'}
            alt='copy link'
            className='absolute top-4 right-2 cursor-pointer'
            onClick={()=>{setPromotepiece(false)}}
      />
      <div className='flex flex-row justify-around items-center my-6'>
      {!isWhiteSide && <div className='flex flex-row justify-center items-center h-[40px] xs:h-[78px] w-[40px] xs:w-[78px] bg-[#AA8347] m-2 mt-4 text-[2rem] xs:text-[3rem] hover:bg-[#6E470B] cursor-pointer'>♛
      </div>}
      {isWhiteSide && <div className='flex flex-row justify-center items-center h-[40px] xs:h-[78px] w-[40px] xs:w-[78px] bg-[#AA8347] m-2 mt-4 text-[2rem] xs:text-[3rem] hover:bg-[#6E470B] cursor-pointer'>♕
      </div>}
      {!isWhiteSide && <div className='flex flex-row justify-center items-center h-[40px] xs:h-[78px] w-[40px] xs:w-[78px] bg-[#AA8347] m-2 mt-4 text-[2rem] xs:text-[3rem] hover:bg-[#6E470B] cursor-pointer'>♜
      </div>}
      {isWhiteSide && <div className='flex flex-row justify-center items-center h-[40px] xs:h-[78px] w-[40px] xs:w-[78px] bg-[#AA8347] m-2 mt-4 text-[2rem] xs:text-[3rem] hover:bg-[#6E470B] cursor-pointer'>♖
      </div>}
      {!isWhiteSide && <div className='flex flex-row justify-center items-center h-[40px] xs:h-[78px] w-[40px] xs:w-[78px] bg-[#AA8347] m-2 mt-4 text-[2rem] xs:text-[3rem] hover:bg-[#6E470B] cursor-pointer'>♝
      </div>}
      {isWhiteSide && <div className='flex flex-row justify-center items-center h-[40px] xs:h-[78px] w-[40px] xs:w-[78px] bg-[#AA8347] m-2 mt-4 text-[2rem] xs:text-[3rem] hover:bg-[#6E470B] cursor-pointer'>♗
      </div>}
      {!isWhiteSide && <div className='flex flex-row justify-center items-center h-[40px] xs:h-[78px] w-[40px] xs:w-[78px] bg-[#AA8347] m-2 mt-4 text-[2rem] xs:text-[3rem] hover:bg-[#6E470B] cursor-pointer'>♞
      </div>}
      {isWhiteSide && <div className='flex flex-row justify-center items-center h-[40px] xs:h-[78px] w-[40px] xs:w-[78px] bg-[#AA8347] m-2 mt-4 text-[2rem] xs:text-[3rem] hover:bg-[#6E470B] cursor-pointer'>♘
      </div>}
      </div>
    </div>}
    </>
    
  )
}

export default PromotPeice
