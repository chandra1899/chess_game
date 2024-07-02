"use client"

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { History, HistoryType } from '@/store/atoms/history'
import { GameFinished } from '@/store/atoms/gameFilnished'
import { board } from '@/store/atoms/board'
import { FormEventHandler, KeyboardEventHandler } from 'react';
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { Socket } from 'socket.io-client'

const valueToLetter=['A','B','C','D','E','F','G','H'];

interface dataType {from:[number,number],to:[number,number],isWhiteSide:boolean,board:string[][]}

const MoveState=({data,index,selected,setSelected}:{data:dataType,index:number,selected:number,setSelected:Dispatch<SetStateAction<number>>})=>{
  const setBoard=useSetRecoilState(board)
  const gameFinished=useRecoilValue(GameFinished)
  
  const getStateDetails=()=>{
    if(!gameFinished || data.board===undefined) return ;
    setSelected(index)
    setBoard(data.board)
  }
  
  return (
    <div className={`w-[100%] h-[40px] rounded-md flex flex-row justify-center items-center ${selected===index && gameFinished?'bg-[#A0793D]':''} ${gameFinished?'cursor-pointer hover:bg-[#A0793D]':''} ${data.isWhiteSide?'text-black bg-slate-100 ':'text-white bg-black'} transition-all ease-in-out delay-[10ms] my-3`} onClick={getStateDetails}>
      <p className='font-bold'>{valueToLetter[data.from[0]]}{data.from[1]}</p>
      <Image
      height={30}
      width={30}
      src={'/rightArrow.png'}
      alt='right arrow'
      className='mx-8'
      />
      <p className='font-bold'>{valueToLetter[data.to[0]]}{data.to[1]}</p>
    </div>
  )
}

const Left = ({socket,selected,setSelected}:{socket:Socket | null,selected:number,setSelected : Dispatch<SetStateAction<number>> }) => {
  const history:any=useRecoilValue(History)
  const gameFinished = useRecoilValue(GameFinished)
  const setBoard=useSetRecoilState(board)
  const { data: session, status } = useSession() 
  const {id} = useParams()
  
  useEffect(()=>{
    setSelected(history.length-1)
  },[history])

  useEffect(()=>{
    if(history[selected] && gameFinished)
    setBoard(history[selected].board)
  },[selected,history[selected]])

  const handleKeyMove:KeyboardEventHandler<HTMLDivElement>=(e)=>{
    if(e.key==='ArrowLeft'){
      setSelected((pre)=>{
        if(pre-1>=0)
        return pre-1
        else return pre
      }
        )
    }else if(e.key==='ArrowRight'){
      setSelected((pre)=>{
        if(pre+1<history.length)
        return pre+1
      else return pre
      })
    }
   }

   const handleEmitDraw=async ()=>{
    await socket?.emit('receive_draw_req',session?.user?.email,id)
   }

  return (
    <div className='h-[100vh] hidden xs:block w-[23%] bg-black text-white border-[1px] border-slate-600 p-2 relative'>
      <div className='h-[100%] w-[100%] overflow-y-scroll pb-10' tabIndex={0} onKeyUp={handleKeyMove} >
         {history.length!==0 && history.map((hisValue:HistoryType,index:number)=>(
          <MoveState data={hisValue} index={index} selected={selected} setSelected={setSelected} />
        ))}      
      </div>
      <div className='absolute h-[55px] w-[100%] bg-[#222222e6] bottom-0 flex flex-row justify-between items-center'>
      <Image
      height={30}
      width={30}
      src={'/left_arrow.png'}
      alt='right arrow'
      className={`ml-4 ${gameFinished?'cursor-pointer':''}`}
      onClick={()=>{setSelected((pre)=>{
        if(!gameFinished) return pre;
        if(pre-1>=0)
        return pre-1
        else return pre
      }
        )}}
      />
       {!gameFinished && <button className='text-[15px] text-black font-bold bg-yellow-300 hover:bg-yellow-400 cursor-pointer p-1 px-2 rounded-r-full rounded-l-full' onClick={handleEmitDraw} >Offer Draw</button>}
       <Image
      height={30}
      width={30}
      src={'/right_arrow.png'}
      alt='right arrow'
      className={`mr-12 ${gameFinished?'cursor-pointer':''}`}
      onClick={()=>{setSelected((pre)=>{
        if(!gameFinished) return pre;
        if(pre+1<history.length)
        return pre+1
      else return pre
      })}}
      />
      </div>
    </div>
  )
}

export default Left
