"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { History } from '@/store/atoms/history'
import { GameFinished } from '@/store/atoms/gameFilnished'
import { board } from '@/store/atoms/board'
import { FormEventHandler, KeyboardEventHandler } from 'react';
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'

const valueToLetter=['A','B','C','D','E','F','G','H'];

interface dataType {from:[number,number],to:[number,number],isWhiteSide:boolean,board:string[][]}

const MoveState=({data,index,selected,setSelected,setLeftHiddenOn}:{data:dataType,index:number,selected:any,setSelected:any,setLeftHiddenOn:any})=>{
  const setBoard=useSetRecoilState(board)
  const gameFinished=useRecoilValue(GameFinished)
  
  const getStateDetails=()=>{
    // console.log(selected);
    
    if(!gameFinished || data.board===undefined) return ;
    setSelected(index)
    setBoard(data.board)
    setLeftHiddenOn(false)
  }
//   console.log(selected===index);
  
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

const LeftHidden = ({socket,selected,setSelected,setLeftHiddenOn}:{socket:any,selected:any,setSelected:any,setLeftHiddenOn:any}) => {
  const history:any=useRecoilValue(History)
  const gameFinished:any=useRecoilValue(GameFinished)
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
    // console.log('key==',e.key);
    if(e.key==='ArrowLeft'){
      setSelected((pre:any)=>{
        if(pre-1>=0)
        return pre-1
        else return pre
      }
        )
    }else if(e.key==='ArrowRight'){
      setSelected((pre:any)=>{
        if(pre+1<history.length)
        return pre+1
      else return pre
      })
    }
   }

   const handleEmitDraw=async ()=>{
    await socket.emit('receive_draw_req',session?.user?.email,id)
   }

  return (
    <div className='h-[100%] w-[100%] bg-black text-white border-[1px] border-slate-600 p-2 relative'>
      <div className='h-[100%] w-[100%] overflow-y-scroll pb-10' tabIndex={0} onKeyUp={handleKeyMove} >
         {history.length!==0 && history.map((hisValue:any,index:number)=>(
          <MoveState data={hisValue} index={index} selected={selected} setSelected={setSelected} setLeftHiddenOn={setLeftHiddenOn} />
        ))}      
      </div>
    </div>
  )
}

export default LeftHidden
