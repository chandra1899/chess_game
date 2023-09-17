"use client"

import { board } from '@/store/atoms/board';
import { WhiteSideIs } from '@/store/atoms/whiteSIde';
import { highlightedArray } from '@/store/atoms/highlight';
import React, { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { checkCheckmate } from '@/store/atoms/checkCheckmate';
import { selected } from '@/store/atoms/selectedBlock';
import { isOppoKingChecked } from '@/store/atoms/isOppoKingChecked';
import { isOurKingChecked } from '@/store/atoms/isOurKingChecked';

import { isBlack } from '@/utils/checkForColor';
import { isWhite } from '@/utils/checkForColor';
import { isHighlighted } from '@/utils/isHighlighted';
import { checkOurKingCheckmate } from '@/utils/checkOurKingCheckmate';
import { checkOppositeKingCheckmate } from '@/utils/checkOppositeKingCheckmate';
import { hightlightBlocksForRook } from '@/utils/pieces/rook';
import { hightlightBlocksForBishop } from '@/utils/pieces/bishop';
import { hightlightBlocksForKing } from '@/utils/pieces/king';
import { hightlightBlocksForKnight } from '@/utils/pieces/knight';
import { hightlightBlocksForPawns } from '@/utils/pieces/pawn';
import { useParams } from 'next/navigation';

const rows=['A','B','C','D','E','F','G','H']
const cols=['1','2','3','4','5','6','7','8']

const Board = ({socket}:{socket:any}) => {
    // const [rerender,setRerender]=useState(true)
    const {id} = useParams()
    const highlightedBox=useRecoilValue(highlightedArray)
    const isOppoKingCheck=useRecoilValue(isOppoKingChecked)
    const isOurKingCheck=useRecoilValue(isOurKingChecked)
    const boardState=useRecoilValue(board)
    const isWhiteSide=useRecoilValue(WhiteSideIs)
    const setHighlightedBox=useSetRecoilState(highlightedArray)
    const setIsOurKingCheck=useSetRecoilState(isOurKingChecked)
    const setIsOppoKingCheck=useSetRecoilState(isOppoKingChecked)
    const setSelectedSol=useSetRecoilState(selected)
    const setBoardState=useSetRecoilState(board)
    const selectedSol=useRecoilValue(selected) 

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
  
  const handleOnClick=async (row:number,col:number)=>{
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
                
                setBoardState((pre)=>{
                    const newBoard=pre.map(innerArray => [...innerArray])
                    newBoard[row][col]=newBoard[selectedSol[0]][selectedSol[1]]
                    newBoard[selectedSol[0]][selectedSol[1]]=""
                    return newBoard
                })
                let data={
                    from:[selectedSol[0],selectedSol[1]],
                    to:[row,col],
                    roomId:id
                }
                await socket.emit('move',data)
                // if(checkOppositeKingCheckmate()){
                //     setIsOppoKingCheck(true)
                // }else{
                //     setIsOppoKingCheck(false)
                // }
                if(boardState[row][col]===""){
                    //play move_Self
                    document.getElementById('move_self').play()

                }else if((isWhiteSide && isBlack(row,col,boardState) || (!isWhiteSide && isWhite(row,col,boardState)))){
                    //play capture
                    document.getElementById('capture').play()
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
  
  useEffect(()=>{
    socket.on('moved',(data)=>{
        console.log(data);
        
    })
  },[socket])
  return (
    <div className={`h-auto w-[100%]  flex flex-col justify-center items-center ${isWhiteSide?'':'rotate-180'}`}>
                {rows.map((row,rowIndex)=>(
                    <div className="flex flex-row">
                        {cols.map((col,colIndex)=>(
                            <div className={`h-[57px] ${isWhiteSide?'':'rotate-180'} w-[57px] cursor-pointer text-[3rem] flex justify-center items-center border-[1px] border-black
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
