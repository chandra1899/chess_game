"use client"
import { board } from '@/store/atoms/board';
import { WhiteSideIs } from '@/store/atoms/whiteSIde';
import { highlightedArray } from '@/store/atoms/highlight';
import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selected } from '@/store/atoms/selectedBlock';
import { isOppoKingChecked } from '@/store/atoms/isOppoKingChecked';
import { isOurKingChecked } from '@/store/atoms/isOurKingChecked';

import { isBlack } from '@/utils/checkForColor';
import { isWhite } from '@/utils/checkForColor';
import { isHighlighted, isHighlightedOppoMove } from '@/utils/isHighlighted';
import { checkOurKingCheckmate } from '@/utils/checkOurKingCheckmate';
import { checkOppositeKingCheckmate } from '@/utils/checkOppositeKingCheckmate';
import { checkOppoRookHasMove, hightlightBlocksForRook } from '@/utils/pieces/rook';
import { checkOppoBishopHasMove, hightlightBlocksForBishop } from '@/utils/pieces/bishop';
import { checkOppoKingHasMove, hightlightBlocksForKing } from '@/utils/pieces/king';
import { checkOppoKnightsHasMove, hightlightBlocksForKnight } from '@/utils/pieces/knight';
import { checkOppoPawnsHasMove, hightlightBlocksForPawns } from '@/utils/pieces/pawn';
import { useParams } from 'next/navigation';
import { highlightedOppoMoveArray } from '@/store/atoms/highlightOppoMove';
import { Turn } from '@/store/atoms/turn';
import axios from 'axios';
import { GameFinished } from '@/store/atoms/gameFilnished';
import { useSession } from 'next-auth/react';
import { Socket } from 'socket.io-client';

const rows=['A','B','C','D','E','F','G','H']
const cols=['1','2','3','4','5','6','7','8']

const Board = ({socket}:{socket:Socket | null}) => {
    const { data: session, status } = useSession()  
    const {id} = useParams()
    const highlightedBox=useRecoilValue(highlightedArray)
    const gameFinished=useRecoilValue(GameFinished)
    const turn=useRecoilValue(Turn)
    const highlightedOppoMoveBox=useRecoilValue(highlightedOppoMoveArray)
    const isOppoKingCheck=useRecoilValue(isOppoKingChecked)
    const isOurKingCheck=useRecoilValue(isOurKingChecked)
    const boardState=useRecoilValue(board)
    const isWhiteSide=useRecoilValue(WhiteSideIs)
    const setHighlightedBox=useSetRecoilState(highlightedArray)
    const setHighlightedOppoMoveBox=useSetRecoilState(highlightedOppoMoveArray)
    const setIsOurKingCheck=useSetRecoilState(isOurKingChecked)
    const setIsOppoKingCheck=useSetRecoilState(isOppoKingChecked)
    const setSelectedSol=useSetRecoilState(selected)
    const setBoardState=useSetRecoilState(board)
    const selectedSol=useRecoilValue(selected) 

    const handleOppoHasNoMove=(newboard:string[][])=>{
        if(checkOppoPawnsHasMove(newboard,isWhiteSide) || checkOppoRookHasMove(newboard,isWhiteSide) || checkOppoBishopHasMove(newboard,isWhiteSide) || checkOppoKnightsHasMove(newboard,isWhiteSide) || checkOppoKingHasMove(newboard,isWhiteSide)){
            return true
        }
        return false    
    }

    const hightlightBlocks=(row:number,col:number)=>{
       
        //for pawn
        if((isWhiteSide && boardState[row][col]==='♙') || (!isWhiteSide && boardState[row][col]==='♟︎')){
            setHighlightedBox([[]])
            hightlightBlocksForPawns(row,col,boardState,isWhiteSide,setHighlightedBox)         
                      
        }
        else if((isWhiteSide && boardState[row][col]==='♖') || (!isWhiteSide && boardState[row][col]==='♜')){
            setHighlightedBox([[]])
            hightlightBlocksForRook(row,col,boardState,isWhiteSide,setHighlightedBox)   
        }
        else if((isWhiteSide && boardState[row][col]==='♗') || (!isWhiteSide && boardState[row][col]==='♝')){
            setHighlightedBox([[]])
            hightlightBlocksForBishop(row,col,boardState,isWhiteSide,setHighlightedBox)
        }
        else if((isWhiteSide && boardState[row][col]==='♕') || (!isWhiteSide && boardState[row][col]==='♛')){
            setHighlightedBox([[]])
            hightlightBlocksForRook(row,col,boardState,isWhiteSide,setHighlightedBox) 
            hightlightBlocksForBishop(row,col,boardState,isWhiteSide,setHighlightedBox)
        }
        else if((isWhiteSide && boardState[row][col]==='♔') || (!isWhiteSide && boardState[row][col]==='♚')){
            setHighlightedBox([[]])
            hightlightBlocksForKing(row,col,boardState,isWhiteSide,setHighlightedBox) 
        }
        else if((isWhiteSide && boardState[row][col]==='♘') || (!isWhiteSide && boardState[row][col]==='♞')){
            setHighlightedBox([[]])
            hightlightBlocksForKnight(row,col,boardState,isWhiteSide,setHighlightedBox) 
        }
    }

    const saveBoardHistory=async (board:string[][],from:number[],to:[number,number])=>{
        try {
            let res=await axios.post('/api/savehistory',{
                board,isWhiteSide,from,to,roomName:id
            })
        } catch (error) {
            console.log(error);  
        }
    }

    const handlegameover=async ()=>{
        let res=await axios.post('/api/gameover',{
            roomName:id,isWhiteSide
        })
        if(res.status===200){
            await socket?.emit('game_over',id,session?.user?.email)
        }
    }

    const handleUpdateOppoCheck=async ()=>{
        let res=await axios.post('/api/updateoppokingcheck',{
            roomName:id,isWhiteSide
        })
        if(res.status===200){
            if((isWhiteSide && res.data.existingGameInstance.checkWhiteToBlack>=16) || (!isWhiteSide && res.data.existingGameInstance.checkBlackToWhite>=16)){
                handlegameover()
            }
        }
    }
  
  const handleOnClick=async (row:number,col:number)=>{
    if(!turn) return;
    if(gameFinished) return ;
    setHighlightedOppoMoveBox([[]])
     if((isWhiteSide && isWhite(row,col,boardState)) || (!isWhiteSide && isBlack(row,col,boardState))){
        hightlightBlocks(row,col)
    }

    if((isWhiteSide && isWhite(row,col,boardState)) || (!isWhiteSide && isBlack(row,col,boardState))){
        setSelectedSol([row,col])
    }else{
        if(selectedSol.length===0 && boardState[row][col]===""){
            setHighlightedBox([[row,col]])
        }else if((selectedSol.length===0 && isWhiteSide && isBlack(row,col,boardState)) || (selectedSol.length===0 && !isWhiteSide && isWhite(row,col,boardState))){
            setHighlightedBox([[]])
        }else if(selectedSol.length!==0){
            if(isHighlighted(row,col,highlightedBox)){
                let data={
                    from:[selectedSol[0],selectedSol[1]],
                    to:[row,col],
                    roomId:id,
                    isWhiteSide,
                    board:boardState
                }
                setBoardState((pre)=>{
                    const newBoard=pre.map(innerArray => [...innerArray])
                    newBoard[row][col]=newBoard[selectedSol[0]][selectedSol[1]]
                    newBoard[selectedSol[0]][selectedSol[1]]=""
                    saveBoardHistory(newBoard,selectedSol,[row,col])
                    data.board=newBoard
                    return pre
                })
                if(checkOppositeKingCheckmate(data.board,isWhiteSide)){
                    handleUpdateOppoCheck()
                }               
                await socket?.emit('move',data)

                if(!handleOppoHasNoMove(data.board)){
                    handlegameover()
                }

                if(boardState[row][col]===""){
                    //play move_Self
                    const song1:any=document.getElementById('move_self')
                    song1?.play()

                }else if((isWhiteSide && isBlack(row,col,boardState) || (!isWhiteSide && isWhite(row,col,boardState)))){
                    //play capture
                    const song2:any=document.getElementById('capture')
                    song2?.play()
                }
                setHighlightedBox([[row,col],[selectedSol[0],selectedSol[1]]])
            }else{
                if(boardState[row][col]===""){
                    setHighlightedBox([[row,col]])
                }else if((isWhiteSide && isBlack(row,col,boardState)) || (!isWhiteSide && isWhite(row,col,boardState))){
                    setHighlightedBox([[]])
                }
            }
        }
    }

  }
  useEffect(()=>{
        if(checkOppositeKingCheckmate(boardState,isWhiteSide)){
            setIsOppoKingCheck(true)
        }else{
            setIsOppoKingCheck(false)
        }
        if(checkOurKingCheckmate(boardState,isWhiteSide)){
            setIsOurKingCheck(true)
        }else{
            setIsOurKingCheck(false)
        }
  },[boardState])

  return (
    <div className={`h-auto w-[99%vw] xs:w-[100%] flex flex-col justify-center items-center ${isWhiteSide?'':'rotate-180'}`} tabIndex={0} onBlur={() => setHighlightedBox([[]])} >
                {rows.map((row,rowIndex)=>(
                    <div className="flex flex-row">
                        {cols.map((col,colIndex)=>(
                            <div className={`h-[12vw] xs:h-[57px] w-[12vw] xs:w-[57px] ${isWhiteSide?'':'rotate-180'} ${gameFinished?'':'cursor-pointer'}  text-[10vw] xs:text-[3rem] flex justify-center items-center border-[1px] border-black
                            ${isHighlightedOppoMove(rowIndex,colIndex,highlightedOppoMoveBox)?'bg-blue':''}
                            ${isOppoKingCheck && ((isWhiteSide && boardState[rowIndex][colIndex]==='♚') || (!isWhiteSide && boardState[rowIndex][colIndex]==='♔'))?'bg-yellow-300':''}
                            ${isOurKingCheck && ((!isWhiteSide && boardState[rowIndex][colIndex]==='♚') || (isWhiteSide && boardState[rowIndex][colIndex]==='♔'))?'bg-yellow-300':''}
                            ${isHighlighted(rowIndex,colIndex,highlightedBox)?
                                `${(isWhiteSide && isBlack(rowIndex,colIndex,boardState)) || (!isWhiteSide && isWhite(rowIndex,colIndex,boardState))?`bg-red-600`:`bg-green-600`}`
                            :`
                            ${rowIndex%2===0?`${colIndex%2==0?`bg-[#E6BF83]`:`bg-[#8C6529]`}`:`${colIndex%2==0?`bg-[#8C6529]`:`bg-[#E6BF83]`}`}`}
                            `}
                            onClick={()=>{handleOnClick(rowIndex,colIndex)}}
                            >
                                {boardState[rowIndex][colIndex]}
                            </div>
                        ))}
                    </div>
                ))}

            </div>
  )
}

export default Board
