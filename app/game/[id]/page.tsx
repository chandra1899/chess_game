"use client"

import { BackDrop, Board, CopyLink, GameOver, Left, OfferDraw, Right } from "@/components"
import { useRecoilState, useRecoilValue,useSetRecoilState ,} from "recoil";
import { highlightedArray } from "@/store/atoms/highlight";
import { useEffect, useState } from "react";
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
import { GameFinished } from "@/store/atoms/gameFilnished";
import { OpenGameOver } from "@/store/atoms/opengameover";
import { IsOfferDrawOpen } from "@/store/atoms/isOfferDrawOpen";
import { CheckToOppo } from "@/store/atoms/checkToOppo";
const socket =io("https://royalcheckmate.onrender.com/");

export default function Game() {
  const { data: session, status } = useSession()  
  // console.log(session);
  const [whoWon,setWhoWon]=useState(false)
  const [draw,setDraw]=useState(false)
  const [requested,setRequested]=useState('')
  const {id} = useParams()
  const turn=useRecoilValue(Turn)
  const setMessages=useSetRecoilState(Messages)
  const setCheckToOppo=useSetRecoilState(CheckToOppo)
  const setGameFinished=useSetRecoilState(GameFinished)
  const setOpenGameOver=useSetRecoilState(OpenGameOver)
  const setBoard=useSetRecoilState(board)
  const setShrLink=useSetRecoilState(shareLink)
  const setWhiteSideIs=useSetRecoilState(WhiteSideIs)
  const setTurn=useSetRecoilState(Turn)
  const setHistory=useSetRecoilState(History)
  const isWhiteSide=useRecoilValue(WhiteSideIs)
  const setIsOfferDrawOpen=useSetRecoilState(IsOfferDrawOpen)

  const checkForwhiteSIde=async ()=>{
    let email=session?.user?.email
    if(!email) return ;
    let res=await axios.post('/api/groupCreatedBy',{
      email,roomName:id,
    })
    setWhiteSideIs(res.data.isWhiteSide)
    console.log(res.data.turn);
    
    if((res.data.turn==='white' && isWhiteSide) || (res.data.turn==='black' && !isWhiteSide)){
      setTurn(true)
    }else{
      setTurn(false)
    }
    let res2=await axios.post('/api/creategameinstance',{
      email,roomName:id,isWhiteSide:res.data.isWhiteSide
    })
    if(res2.status===200){
      if(res2.data.existingGameInstance.gameStatus==='running'){
        setGameFinished(false)
        setShrLink(true)       
        if(isWhiteSide){  
          console.log('in check oppo king check 1st'); 
        setCheckToOppo(res2.data.existingGameInstance.checkWhiteToBlack)
      }else{
        setCheckToOppo(res2.data.existingGameInstance.checkWhiteToBlack.checkBlackToWhite)
        }
      }else{     
        setGameFinished(true)
        setShrLink(false)
        setOpenGameOver(true)
        if(res2.data.existingGameInstance.gameStatus==='draw'){
          setDraw(true)
        }else{
          if(res2.data.existingGameInstance.won==='white'){
            if(isWhiteSide)setWhoWon(true)
            else setWhoWon(false)
          }else{
            if(!isWhiteSide)setWhoWon(true)
            else setWhoWon(false)
          }
        }
      }
    }
  }

  const socketFunction=async ()=>{
    let email=session?.user?.email
    if(!email) return ;
    await socket.on("connect", async () => {
        await socket.emit('joinRoom', id,email);
        console.log("SOCKET CONNECTED!", socket.id);
      });

      await socket.on("receive_draw_req", async (email) => {
        if(session?.user?.email!==email){
        setRequested(email)
        setIsOfferDrawOpen(true)
        }
      });
      
      await socket.on("draw_accepted", async (email) => {
        if(session?.user?.email!==email){
          setGameFinished(true)
          setOpenGameOver(true)
        }
        setDraw(true)
      });

      await socket.on("game_over", async (email) => {
        if(session?.user?.email===email){
          setWhoWon(true)
        }else {
          setWhoWon(false)
        }
        setGameFinished(true)
        setOpenGameOver(true)
      });

      socket.on('error', function (data) {
        console.log(data || 'error');
      });

      socket.on('connect_failed', function (data) {
        console.log(data || 'connect_failed');
      });

      // if (socket) return () => socket.disconnect();
    }

    useEffect(()=>{
      setBoard([
        ["♜", "", "", "", "", "", "", ""],
        ["♜", "", "♙", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "♖"],
        ["", "", "", "", "♔", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "♜", ""],
        ["♜", "", "♟︎", "", "", "", "", ""],
        ["", "", "", "", "♚", "", "", ""],
      ])
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
        if(res.data.messages===undefined){
          setMessages([])        
        }
        else{
          setMessages(res.data.messages)
        }
      }
    }

    const getHistory=async ()=>{
      let res=await axios.post('/api/gethistory',{
        roomName:id
      })
      if(res.status===200){
        // console.log(res);
        console.log(res.data.history);
        if(res.data.history===undefined || res.data.history.length===0){
          setHistory([])
        }else{
          setHistory(res.data.history)
          let len=res.data.history.length;
          let historyArrayLast=res.data.history[len-1]
          // console.log('board',historyArrayLast.board);
          setTurn(historyArrayLast.isWhiteSide!==isWhiteSide)
          setBoard(historyArrayLast.board)
        }
      }
    }
  
    useEffect(()=>{
      // setShrLink(true)
      getGroupMessages()
      getHistory()
      // console.log(boardState);
      
    },[session,socket])
  
  return (
    <main className='flex justify-center items-center bg-black'>
      <CopyLink/>
      <PromotPeice/>
      <OfferDraw requested={requested} socket={socket} />
      <GameOver whoWon={whoWon} draw={draw} />
      <BackDrop/>
      <div className='flex flex-row justify-center items-center h-auto w-[100vw] xs:w-[97vw]'>
        <Left socket={socket} />

        <div className='chessboard relative h-[100vh] w-[55%] bg-[#222222e6] flex flex-col justify-center items-center'>
          <audio src="/capture.mp3" id="capture"></audio>
          <audio src="/move-self.mp3" id="move_self"></audio>
          {!turn && <p className="bg-[#00C300] text-[3.5vw] absolute top-2 xs:text-[15px] text-black px-2 rounded-xl m-2 font-bold">Opponent Turn</p>}
            <Board  socket={socket} />
          {turn && <p className="bg-[#00C300] text-[3.5vw] absolute bottom-2 xs:text-[15px] text-black px-2 rounded-xl m-2 font-bold">Your Turn</p>}
        </div>

        <Right socket={socket}/>
      </div>
    </main>
  )
}
