import React from 'react'
import Image from 'next/image'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { IsOfferDrawOpen } from '@/store/atoms/isOfferDrawOpen'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { GameFinished } from '@/store/atoms/gameFilnished'
import { useSession } from 'next-auth/react'
import { OpenGameOver } from '@/store/atoms/opengameover'

const OfferDraw = ({requested,socket}:{requested:string,socket:any}) => {
    const setGameFinished=useSetRecoilState(GameFinished)
    const isOfferDrawOpen=useRecoilValue(IsOfferDrawOpen)
    const setIsOfferDrawOpen=useSetRecoilState(IsOfferDrawOpen)
    const setOpenGameOver=useSetRecoilState(OpenGameOver)
    const {id} = useParams()
    const { data: session, status } = useSession()
    const handleAccept=async ()=>{
        let res=await axios.post('/api/drawaccepted',{
            roomName:id
        })
        if(res.status===200){
            setGameFinished(true)
            setIsOfferDrawOpen(false)
            setOpenGameOver(true)
            await socket.emit('draw_accepted',session?.user?.email,id)
        }
    }
  return (
    <>
    {isOfferDrawOpen && <div className='h-auto w-[99%vw] xs:w-[300px] bg-black absolute mx-auto top-[30vh] p-3 rounded-b-3xl rounded-tl-3xl z-[2]'>
      <Image
            height={20}
            width={20}
            src={'/close.svg'}
            alt='copy link'
            className='absolute top-4 right-2 cursor-pointer'
            onClick={()=>{setIsOfferDrawOpen(false)}}
      />
        <div className='text-white flex flex-col justify-center items-center'>
            <p className='font-bold text-[25px]'>DRAW ?</p>
            <p className='m-4'>Opponent named {requested} offered a Draw</p>
            <div>
                <button className='h-[32px] w-[72px] bg-red-600 font-medium rounded-lg m-2' onClick={()=>{setIsOfferDrawOpen(false)}}>Ignore</button>
                <button className='h-[32px] w-[72px] bg-green-600 font-medium rounded-lg m-2' onClick={handleAccept}>Accept</button>
            </div>
        </div>
    </div>}
    </>
  )
}

export default OfferDraw
