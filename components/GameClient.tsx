"use client"
import Image from 'next/image'
import { BackDrop, Board, CopyLink, GameOver, InitialConStatusPopup, Left, LeftHidden, OfferDraw, Right, RightHidden } from "@/components"
import { useRecoilState, useRecoilValue,useSetRecoilState ,} from "recoil";
import { highlightedArray } from "@/store/atoms/highlight";
import { useEffect, useState } from "react";
import { shareLink } from "@/store/atoms/shareLink";
import { Socket, io } from "socket.io-client";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react"
import { WhiteSideIs } from "@/store/atoms/whiteSIde";
import axios from "axios";
import { Turn } from "@/store/atoms/turn";
import { MessageType, Messages } from "@/store/atoms/messages";
import { History, HistoryType } from "@/store/atoms/history";
import { board } from "@/store/atoms/board";
import { PromotPeice } from '@/components'
import { GameFinished } from "@/store/atoms/gameFilnished";
import { OpenGameOver } from "@/store/atoms/opengameover";
import { IsOfferDrawOpen } from "@/store/atoms/isOfferDrawOpen";
import { CheckToOppo } from "@/store/atoms/checkToOppo";
import { highlightedOppoMoveArray } from "@/store/atoms/highlightOppoMove";
import { OppSendMsg } from '@/store/atoms/oppSendMsg';
import { establishStatus } from '@/store/atoms/establishStatus';
import { establishStatusOn } from '@/store/atoms/establishStatusOn';
import { Session } from 'next-auth';

interface Props {
  initialCheckForWhiteSide : {
    isWhiteSide : boolean,
    turn : string
  },
  initialMessages : {
    messages : MessageType[]
  },
  initialHistory : {
    history : HistoryType[]
  },
  sessionData : Session
}

const GameClient = ({initialCheckForWhiteSide, initialMessages, initialHistory, sessionData} : Props) => {   
  const [socket, setSocket] = useState<null | Socket>(null)
  const [connectionEstablished, setConnectionEstablished] = useState<Boolean>(false)
  const [initialRender, setInitialRender] = useState(0)
  const history = useRecoilValue(History)
  const gameFinished = useRecoilValue(GameFinished)
  const [selected,setSelected]=useState<number>(0)

  const [leftHiddenOn,setLeftHiddenOn]=useState<boolean>(false)
  const [rightHiddenOn,setRightHiddenOn]=useState<boolean>(false)

  const { data: session, status } = useSession()
  const [arrivalMessage, setArrivalMessage] = useState(null);  
  const [arrivalBoardState, setArrivalBoardState] = useState(null);  
  const [whoWon,setWhoWon]=useState<boolean>(false)
  const setBoardState=useSetRecoilState(board)
  const [oppSendMsg,setOppSendMsg]=useRecoilState(OppSendMsg)
  const [draw,setDraw]=useState<boolean>(false)
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
  const setEstablishStatus=useSetRecoilState(establishStatus)
  const setEstablishStatusOn=useSetRecoilState(establishStatusOn)

    useEffect(() => {
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
    }, [])

  useEffect(()=>{
    // const s = io(`http://localhost:3001/`);
    const s = io(`https://royalcheckmate.onrender.com`);
    setSocket(s)
    return ()=>{
      s.disconnect()
    }
  }, [])

  const handleEmitDraw=async ()=>{
    socket?.emit('receive_draw_req',session?.user?.email,id)
   }

    useEffect(() => {
        if(socket == null) return ;
        if(initialRender >= 1) return ;
        setConnectionEstablished(false)
        setEstablishStatus("Establishing connection.........")
        socket.on("connection-established", async () => {            
            setEstablishStatus("setting up initial state of game.........")
            // checkForWhiteSide1
            setWhiteSideIs(initialCheckForWhiteSide.isWhiteSide)            
            if((initialCheckForWhiteSide.turn==='white' && initialCheckForWhiteSide.isWhiteSide) || (initialCheckForWhiteSide.turn==='black' && !initialCheckForWhiteSide.isWhiteSide)){
                setTurn(true)
            }else{
                setTurn(false)
            }
            // setting grp messages
            if(initialMessages.messages===undefined){
                setMessages([])        
            }
            else{
                setMessages(initialMessages.messages)
            }
            // setting history
            if(initialHistory.history===undefined || initialHistory.history.length===0){
                setHistory([])
            }else{
                setHistory(initialHistory.history)
                let len=initialHistory.history.length;
                let historyArrayLast=initialHistory.history[len-1]
                console.log('in history setting turn to', historyArrayLast.isWhiteSide!==isWhiteSide);
                
                setTurn(historyArrayLast.isWhiteSide!==initialCheckForWhiteSide.isWhiteSide)
                setBoard(historyArrayLast.board)
            }
            // checkForWhiteSide2
            try {
                let res2=await axios.post('/api/creategameinstance',{
                    email : sessionData?.user?.email,roomName:id,isWhiteSide:initialCheckForWhiteSide.isWhiteSide
                  })
                  
                  if(res2.status===200){
                    if(res2.data.existingGameInstance.gameStatus==='running'){
                      setGameFinished(false)
                      setShrLink(true)       
                      if(isWhiteSide){  
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
                    setConnectionEstablished(true)
                    setEstablishStatusOn(false)
                  }
            } catch (error) {
                setEstablishStatus("........Error in fetcing initial state of document, Please refresh.........")
                console.log('Error in fetcing initial state of document, Please refresh',error);
            }
      })
      socket.emit("establish-conection", id, sessionData?.user?.email)        
      }, [socket])

    useEffect(() => {
        if(socket == null || connectionEstablished == false || !session) return ;        
        const handler = (email : string) => {            
          if(session?.user?.email!==email){
          setRequested(email)
          setIsOfferDrawOpen(true)
          }
        }
        socket.on("receive_draw_req", handler); 
        return () => {
          socket.off("receive_draw_req", handler); 
        }
    }, [socket, session, connectionEstablished])

    useEffect(() => {
      if(socket == null || connectionEstablished == false || !session) return ;
        const handler = (email : string) => {
          if(session?.user?.email!==email){
            setGameFinished(true)
            setOpenGameOver(true)
          }
          setDraw(true)
        }
        socket.on("draw_accepted", handler);
        return () => {
          socket.off("draw_accepted", handler);
        }
    }, [socket, session, connectionEstablished])

    useEffect(() => {
      if(socket == null || connectionEstablished == false || !session) return ;
        const handler = (email : string) => {
          if(session?.user?.email===email){
            setWhoWon(true)
          }else {
            setWhoWon(false)
          }
          setGameFinished(true)
          setOpenGameOver(true)
        }
          socket.on("game_over", handler);
        return () => {
          socket.off("game_over", handler);
        }
    }, [socket, session, connectionEstablished])

    useEffect(() => {
      if(socket == null || connectionEstablished == false || !session) return ;      
        const handler = (data:any)=>{            
          setArrivalBoardState(data)
        }
        socket.on('moved',handler) 
        return () => {
          socket.off('moved',handler) 
        }
    }, [socket, session, connectionEstablished])

    useEffect(() => {
      if(socket == null || connectionEstablished == false || !session) return ;
        const handler = (data:any)=>{
          setArrivalMessage(data);
          setOppSendMsg(true)        
      }
        socket.on('receive_msg', handler)
        return () => {
          socket.off('receive_msg', handler)
        }
    }, [socket, session, connectionEstablished])

    const checkForwhiteSIde=async ()=>{
        let email=session?.user?.email
        if(!email) return ;
        let res=await axios.post('/api/groupCreatedBy',{
          email,roomName:id,
        })
        setWhiteSideIs(res.data.isWhiteSide)        
        if((res.data.turn==='white' && res.data.isWhiteSide) || (res.data.turn==='black' && !res.data.isWhiteSide)){
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
            if(isWhiteSide){  
            setCheckToOppo(res2.data.existingGameInstance.checkWhiteToBlack)
          }else{
            setCheckToOppo(res2.data.existingGameInstance.checkWhiteToBlack.checkBlackToWhite)
            }
          }else{     
            setGameFinished(true)
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

    const getGroupMessages=async ()=>{
      let res=await axios.post('/api/getmessages',{
        roomName:id
      })
      if(res.status===200){
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
        if(res.data.history===undefined || res.data.history.length===0){
          setHistory([])
        }else{
          setHistory(res.data.history)
          let len=res.data.history.length;
          let historyArrayLast=res.data.history[len-1]
          setTurn(historyArrayLast.isWhiteSide!==isWhiteSide)
          setBoard(historyArrayLast.board)
        }
      }
    }
  
    useEffect(()=>{
        if(socket == null) return ;
        if(!session) return ;
        
        if(initialRender < 1){
          setInitialRender((pre) => pre + 1)
            return ;
        }
        if(connectionEstablished == false) return ;
        checkForwhiteSIde()
        getGroupMessages()
        getHistory()      
    },[socket, session])

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
      {connectionEstablished && <CopyLink/>}
      <InitialConStatusPopup/>
      <PromotPeice/>
      <OfferDraw requested={requested} socket={socket} />
      {connectionEstablished && <GameOver whoWon={whoWon} draw={draw} />}
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
           {socket && <Board  socket={socket} />}
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
        onClick={()=>{setSelected((pre)=>{
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

export default GameClient
