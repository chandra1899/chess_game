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
import { Messages } from "@/store/atoms/messages";
import { History } from "@/store/atoms/history";
import { board } from "@/store/atoms/board";
import { PromotPeice } from '@/components'
let socket =io("http://localhost:3001")

export default function Game() {
  const { data: session, status } = useSession()  
  console.log(session);
  
  const {id} = useParams()
  const turn=useRecoilValue(Turn)
  const setMessages=useSetRecoilState(Messages)
  const setBoard=useSetRecoilState(board)
  const setShrLink=useSetRecoilState(shareLink)
  const setWhiteSideIs=useSetRecoilState(WhiteSideIs)
  const setTurn=useSetRecoilState(Turn)
  const setHistory=useSetRecoilState(History)
  const isWhiteSide=useRecoilValue(WhiteSideIs)

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

    const getGroupMessages=async ()=>{
      let res=await axios.post('/api/getmessages',{
        roomName:id
      })
      if(res.status===200){
        // console.log(res);
        setMessages(res.data.messages)        
      }
    }

    const getHistory=async ()=>{
      let res=await axios.post('/api/gethistory',{
        roomName:id
      })
      if(res.status===200){
        // console.log(res);
        console.log(res.data.history);
        setHistory(res.data.history)
        let len=res.data.history.length;
        let historyArrayLast=res.data.history[len-1]
        setBoard(historyArrayLast.board)
        setTurn(historyArrayLast.isWhiteSide!==isWhiteSide)
      }
    }
  
    useEffect(()=>{
      setShrLink(true)
      getGroupMessages()
      getHistory()
    },[session,socket])
  
  return (
    <main className='flex justify-center items-center bg-black'>
      <CopyLink/>
      <PromotPeice/>
      <BackDrop/>
      <div className='flex flex-row justify-center items-center h-auto w-[100vw] xs:w-[97vw]'>
        <Left/>

        <div className='chessboard h-[100vh] w-[55%] bg-[#222222e6] flex flex-col justify-center items-center'>
          <audio src="/capture.mp3" id="capture"></audio>
          <audio src="/move-self.mp3" id="move_self"></audio>
          {!turn && <p className="bg-[#00C300] text-[3.5vw] xs:text-[15px] text-black px-2 rounded-xl m-2 font-bold">Opponent Turn</p>}
            <Board  socket={socket} />
          {turn && <p className="bg-[#00C300] text-[3.5vw] xs:text-[15px] text-black px-2 rounded-xl m-2 font-bold">Your Turn</p>}
        </div>

        <Right socket={socket}/>
      </div>
    </main>
  )
}
