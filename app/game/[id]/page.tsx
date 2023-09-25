"use client"
import Image from 'next/image'
import { BackDrop, Board, CopyLink, GameOver, Left, LeftHidden, OfferDraw, Right, RightHidden } from "@/components"
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
import { highlightedOppoMoveArray } from "@/store/atoms/highlightOppoMove";
import { OppSendMsg } from '@/store/atoms/oppSendMsg';
const socket =io("https://royalcheckmate.onrender.com/");

export default function Game() {
  const history:any=useRecoilValue(History)
  const gameFinished:any=useRecoilValue(GameFinished)
  const [selected,setSelected]=useState(0)

  const [leftHiddenOn,setLeftHiddenOn]=useState(false)
  const [rightHiddenOn,setRightHiddenOn]=useState(false)

  const { data: session, status } = useSession()
  const [arrivalMessage, setArrivalMessage] = useState(null);  
  const [arrivalBoardState, setArrivalBoardState] = useState(null);  
  // console.log(session);
  const [whoWon,setWhoWon]=useState(false)
  const setBoardState=useSetRecoilState(board)
  const [oppSendMsg,setOppSendMsg]=useRecoilState(OppSendMsg)
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
  const setHighlightedBox=useSetRecoilState(highlightedArray)
  const boardState=useRecoilValue(board)
  const setHighlightedOppoMoveBox=useSetRecoilState(highlightedOppoMoveArray)

  const handleEmitDraw=async ()=>{
    await socket.emit('receive_draw_req',session?.user?.email,id)
   }

  const checkForwhiteSIde=async ()=>{
    let email=session?.user?.email
    if(!email) return ;
    let res=await axios.post('/api/groupCreatedBy',{
      email,roomName:id,
    })
    setWhiteSideIs(res.data.isWhiteSide)
    // console.log(res.data.turn);
    
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
          // console.log('in check oppo king check 1st'); 
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
    await socket.emit('joinRoom', id,email);
    await socket.on("connect", async () => {
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

      await socket.on('receive_msg',(data:any)=>{
        // console.log(data);
        // if(data.isWhiteSide!==isWhiteSide){
          setArrivalMessage(data);
          setOppSendMsg(true)
        // }
        
      })

      socket.on('error', function (data) {
        console.log(data || 'error');
      });

      socket.on('connect_failed', function (data) {
        console.log(data || 'connect_failed');
      });

      await socket.on('moved',(data:any)=>{
      //  if(data.isWhiteSide!==isWhiteSide){
        setArrivalBoardState(data)
      //  }  
    }) 
    }

    useEffect(()=>{
      setBoard([
        ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
        ["♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
        ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
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
        // console.log(res.data.history);
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

    const afterArrivalState=async(data:any)=>{
      setHistory((pre:any)=>[...pre,data])
      setBoardState((pre)=>{
          const newBoard=pre.map(innerArray => [...innerArray])
          newBoard[data.to[0]][data.to[1]]=newBoard[data.from[0]][data.from[1]]
          newBoard[data.from[0]][data.from[1]]=""
          return newBoard
      })
      setTurn((pre)=>!pre)
      setHighlightedBox([])
      setHighlightedOppoMoveBox([data.from,data.to])
      if(boardState[data.to[0]][data.to[1]]===""){
          //play move_Self
          const song1:any=document.getElementById('move_self')
          song1?.play()

      }else{
          //play capture
          const song2:any=document.getElementById('capture')
          song2?.play()
      }
    }

    useEffect(() => {
      arrivalMessage && setMessages((pre:any)=>[...pre,arrivalMessage])
    }, [arrivalMessage]);

    useEffect(() => {
      arrivalBoardState && afterArrivalState(arrivalBoardState)
    }, [arrivalBoardState]);
  
  return (
    <main className='flex justify-center items-center bg-black'>
      <CopyLink/>
      <PromotPeice/>
      <OfferDraw requested={requested} socket={socket} />
      <GameOver whoWon={whoWon} draw={draw} />
      <BackDrop/>
      {(leftHiddenOn || rightHiddenOn) && <div className='absolute h-[92vh] w-[100vw] bg-black z-[1] top-[40px]'>
    {leftHiddenOn && <LeftHidden socket={socket} selected={selected} setSelected={setSelected} setLeftHiddenOn={setLeftHiddenOn} />}
      {rightHiddenOn && <RightHidden socket={socket}/>}
      </div>}
      <BackDrop/>
      <div className='flex flex-row justify-center items-center h-auto w-[100vw] xs:w-[97vw] relative'>
        <Left socket={socket} selected={selected} setSelected={setSelected}/>
       {leftHiddenOn? <Image
        src={'/close.svg'}
        height={30}
        width={30}
        className='block xs:hidden cursor-pointer absolute top-2 left-2'
        alt='menu'
        onClick={()=>{setLeftHiddenOn((pre)=>!pre)}}
        />: <Image
        src={'/menu.svg'}
        height={30}
        width={30}
        className='block xs:hidden cursor-pointer absolute top-2 left-2'
        alt='menu'
        onClick={()=>{setLeftHiddenOn((pre)=>!pre);setRightHiddenOn(false)}}
        />}
        {rightHiddenOn?<Image
        src={'/close.svg'}
        height={30}
        width={30}
        className=' block xs:hidden cursor-pointer absolute top-2 right-2'
        alt='menu'
        onClick={()=>{setRightHiddenOn((pre)=>!pre);setOppSendMsg(false)}}
        />:<Image
        src={'/menu.svg'}
        height={30}
        width={30}
        className=' block xs:hidden cursor-pointer absolute top-2 right-2'
        alt='menu'
        onClick={()=>{setRightHiddenOn((pre)=>!pre);setLeftHiddenOn(false);setOppSendMsg(false)}}
        />}
        {oppSendMsg && <div className='h-[10px] w-[10px] block xs:hidden rounded-full bg-red-600 absolute top-1 right-1'></div>}
        <div className='chessboard relative h-[100vh] w-[55%] bg-[#222222e6] flex flex-col justify-center items-center'>
          <audio src="/capture.mp3" id="capture"></audio>
          <audio src="/move-self.mp3" id="move_self"></audio>
          {!turn && <p className="bg-[#00C300] text-[3.5vw] absolute top-[20vh] xs:top-2 xs:text-[15px] text-black px-2 rounded-xl m-2 font-bold">Opponent Turn</p>}
            <Board  socket={socket} />
          {turn && <p className="bg-[#00C300] text-[3.5vw] absolute bottom-[20vh] xs:bottom-2 xs:text-[15px] text-black px-2 rounded-xl m-2 font-bold">Your Turn</p>}
        </div>

        <Right socket={socket} />

        <div className='absolute h-[55px] w-[100%] bg-[#222222e6] bottom-0 flex xs:hidden flex-row justify-between items-center'>
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
        onClick={()=>{setSelected((pre:any)=>{
          if(!gameFinished) return pre;
          if(pre+1<history.length)
          return pre+1
        else return pre
        })}}
        />
        </div>
      </div>
    </main>
  )
}
