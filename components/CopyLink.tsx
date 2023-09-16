import React, { useState } from 'react'
import Image from 'next/image'
import { FaRegCopy } from "react-icons/fa"
import { shareLink } from '@/store/atoms/shareLink'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useParams } from 'next/navigation'

const CopyLink = () => {
  const [copied,setCopied]=useState(false)
  const shrLink=useRecoilValue(shareLink)
  const setShrLink=useSetRecoilState(shareLink)
  const {id} = useParams()
  const handleCopiedClick=()=>{
    navigator.clipboard.writeText(`http://localhost:3000/game/${id}`);
    setCopied(true)
  setTimeout(function () {
    setCopied(false)
  }, 500);
  }
  return (  
    <>
    {shrLink && <div className='h-auto w-[550px] bg-black absolute mx-auto top-[30vh] p-3 rounded-md z-[2]'>
        <div className='text-white flex flex-row justify-between items-center relative'>
            <p className='text-[19px] font-medium mx-4 my-2'>Share Link</p>.
            <Image
            height={20}
            width={20}
            src={'/close.svg'}
            alt='copy link'
            className='absolute top-0 right-0 cursor-pointer'
            onClick={()=>{setShrLink((pre)=>!pre)}}
      />
        </div>
       <div className='flex flex-row justify-center items-center mb-4'>
       <input type="text" disabled value={`http://localhost:3000/game/${id}`} className={`bg-transparent bg-[#2c2c2c] border-solid text-white placeholder:text-secondary placeholder:opacity-60 h-[37px] py-2 px-3  rounded-md outline-none border-blue border-[0.1rem] focus:border-solid font-medium m-2 w-[90%]`} />
       <div className='text-white'>
       
      {copied?<div className='-ml-12'>
      <Image
            height={30}
            width={30}
            src={'/copied.png'}
            alt='copied'
      />
      </div>:<FaRegCopy size='20px' className='-ml-10 cursor-pointer' onClick={handleCopiedClick} />}
       </div>
       </div>
       
    </div>}
    </>
  )
}

export default CopyLink
