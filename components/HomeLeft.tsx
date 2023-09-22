"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useRouter } from 'next/navigation';

interface gameType{
  roomName:string
  white:string
  black:string
  gameStatus:string
  won:string
  _id:string
}

const MatchComponent=({game,index}:{game:gameType,index:number})=>{
  const router = useRouter();
  return (
    <div className='w-[100%] h-[60px] rounded-md flex flex-row justify-around items-center cursor-pointer hover:bg-[#3b3b3be6] bg-[#302c2ce6] transition-all ease-in-out delay-[20ms] my-3' onClick={()=>{router.push(`/game/${game.roomName}`)}}>
      <div className='flex flex-row max-w-[50%] justify-center items-center'>
      <Image
      height={40}
      width={40}
      src={'/profile.png'}
      alt='profle'
      className='rounded-full mx-2'
      />
     <p className={`break-all ${game.gameStatus==='draw' || game.won===undefined?'text-yellow-300':''} ${game.won==='white'?'text-green-600':'text-red-600'} `}>{game.white}</p>
      </div>

      <div>
      <Image
      height={40}
      width={40}
      src={'/battle.png'}
      alt='profle'
      className='rounded-full'
      />
      </div>

      <div className='flex flex-row max-w-[50%] justify-center items-center'>
      <Image
      height={40}
      width={40}
      src={'/profile.png'}
      alt='profle'
      className='rounded-full mx-2'
      />
     <p className={`break-all ${game.gameStatus==='draw' || game.won===undefined?'text-yellow-300':''} ${game.won==='white'?'text-red-600':'text-green-600'}`}>{game.black}</p>
      </div>
    </div>
  )
}

const HomeLeft = () => {
  const { data: session, status } = useSession()
  const [myGames,setMyGames]=useState([])
  const getusergames=async ()=>{
    let res=await axios.post('/api/getusergames',{
      email:session?.user?.email
    })
    setMyGames(res.data.games)
    console.log(res.data.games);
    
  }
  const deletegameinstance=async (_id:string)=>{
    try {
      await axios.post('/api/deletegameinstance',{
        _id
      })
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getusergames()
  },[session])
  return (
    <div className='h-[100vh] w-[45%] bg-[#222222e6] text-white p-4 overflow-y-scroll'>
      {myGames.map((game:gameType,index)=>{
        
        if(game.white && game.black){
        }else{
          deletegameinstance(game._id)
        }
        return (
          <MatchComponent game={game} index={index} />
        )
      })}
    </div>
  )
}

export default HomeLeft
