"use client"

import { BackDrop, Board, CopyLink, Left, Right } from "@/components"
import { useRecoilState, useRecoilValue,useSetRecoilState ,} from "recoil";
import { highlightedArray } from "@/store/atoms/highlight";
import { useEffect } from "react";
import { shareLink } from "@/store/atoms/shareLink";

import { io } from "socket.io-client";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react"
import { connectMongoDB } from "@/config/mongoose";
import GroupCreatedBy from "@/models/groupCreatedBy";
import { WhiteSideIs } from "@/store/atoms/whiteSIde";
import axios from "axios";
import { Turn } from "@/store/atoms/turn";
let socket =io("http://localhost:3001")

export default function Game() {
  const { data: session, status } = useSession()  
  console.log(session);
  
  const {id} = useParams()
  const setShrLink=useSetRecoilState(shareLink)
  const setWhiteSideIs=useSetRecoilState(WhiteSideIs)
  const setTurn=useSetRecoilState(Turn)

  const checkForwhiteSIde=async ()=>{
    let email=session?.user?.email
    if(!email) return ;
    let res=await axios.post('/api/groupCreatedBy',{
      email,roomName:id,
    })
    setWhiteSideIs(res.data.isWhiteSide)
    setTurn(res.data.isWhiteSide)
  }

  const socketFunction=async ()=>{
    let email=session?.user?.email
    if(!email) return ;
      socket.on("connect", async () => {
        console.log("SOCKET CONNECTED!", socket.id);
        await socket.emit('joinRoom', id,email);
      });

      if (socket) return () => socket.disconnect();
    }

    useEffect(()=>{
      socketFunction()
    },[session,socket])

    useEffect(()=>{
      checkForwhiteSIde()
    },[session])
  
    useEffect(()=>{
      setShrLink(true)
    },[])
  
  return (
    <main className='flex justify-center items-center bg-black'>
      <CopyLink/>
      <BackDrop/>
      <div className='flex flex-row justify-center items-center h-auto w-[97vw]'>
        <Left/>

        <div className='chessboard h-[100vh] w-[55%] bg-[#222222e6] flex flex-col justify-center items-center'>
          <audio src="/capture.mp3" id="capture"></audio>
          <audio src="/move-self.mp3" id="move_self"></audio>
            <Board  socket={socket} />
        </div>

        <Right/>
      </div>
    </main>
  )
}
