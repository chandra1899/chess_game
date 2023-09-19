"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { History } from '@/store/atoms/history'
import { GameFinished } from '@/store/atoms/gameFilnished'
import { board } from '@/store/atoms/board'
import { FormEventHandler, KeyboardEventHandler } from 'react';

const valueToLetter=['A','B','C','D','E','F','G','H'];

const MoveState=({data,index,selected,setSelected}:{data:{from:[number,number],to:[number,number],isWhiteSide:boolean,board:string[][]},index:number,selected:any,setSelected:any})=>{
  const setBoard=useSetRecoilState(board)
  const gameFinished=useRecoilValue(GameFinished)
  
  const getStateDetails=()=>{
    // console.log(selected);
    
    if(!gameFinished || data.board==undefined) return ;
    setSelected(index)
    setBoard(data.board)
  }
  // console.log(selected,'==',index);
  
  return (
    <div className={`w-[100%] h-[40px] rounded-md flex flex-row justify-center items-center ${selected==index?'bg-[#A0793D]':''} ${gameFinished?'cursor-pointer hover:bg-[#A0793D]':''} ${data.isWhiteSide?'text-black bg-slate-100 ':'text-white bg-black'} transition-all ease-in-out delay-[10ms] my-3`} onClick={getStateDetails}>
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

const Left = () => {
  const history:any=useRecoilValue(History)
  const [selected,setSelected]=useState(0)
  const setBoard=useSetRecoilState(board)
  useEffect(()=>{
    setSelected(history.length-1)
  },[history])

  useEffect(()=>{
    if(history[selected])
    setBoard(history[selected].board)
  },[selected,history[selected]])

  const handleKeyMove:KeyboardEventHandler<HTMLDivElement>=(e)=>{
    // console.log('key==',e.key);
    if(e.key==='ArrowLeft'){
      setSelected((pre)=>{
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

  return (
    <div className='h-[100vh] hidden xs:block w-[23%] bg-black text-white border-[1px] border-slate-600 p-2 relative'>
      <div className='h-[100%] w-[100%] overflow-y-scroll pb-10' tabIndex={0} onKeyUp={handleKeyMove} >
         {history.length!==0 && history.map((hisValue:any,index:number)=>(
          <MoveState data={hisValue} index={index} selected={selected} setSelected={setSelected} />
        ))}
      {/* <MoveState color='white' />
      <MoveState color='black' /> */}
      
      </div>
      <div className='absolute h-[55px] w-[100%] bg-[#222222e6] bottom-0 flex flex-row justify-between items-center'>
      <Image
      height={30}
      width={30}
      src={'/left_arrow.png'}
      alt='right arrow'
      className='mx-8 cursor-pointer'
      onClick={()=>{setSelected((pre)=>{
        if(pre-1>=0)
        return pre-1
        else return pre
      }
        )}}
      />
       <Image
      height={30}
      width={30}
      src={'/right_arrow.png'}
      alt='right arrow'
      className='mx-12 cursor-pointer'
      onClick={()=>{setSelected((pre:any)=>{
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
