"use client"

import { board } from '@/store/atoms/board';
import { WhiteSideIs } from '@/store/atoms/whiteSIde';
import { highlightedArray } from '@/store/atoms/highlight';
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { capture } from '@/store/atoms/capture';
import { selected } from '@/store/atoms/selectedBlock';

const rows=['A','B','C','D','E','F','G','H']
const cols=['1','2','3','4','5','6','7','8']
const blackParts=["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜","♟︎"]
const whiteParts=["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖","♙"]

// const initialBoardState = [
//     ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
//     ["♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎"],
//     ["", "", "", "", "", "", "", ""],
//     ["", "", "", "", "", "", "", ""],
//     ["", "", "", "", "", "", "", ""],
//     ["", "", "", "", "", "", "", ""],
//     ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
//     ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
//   ];

const Board = () => {
    const highlightedBox=useRecoilValue(highlightedArray)
    const boardState=useRecoilValue(board)
    const isWhiteSide=useRecoilValue(WhiteSideIs)
    const setHighlightedBox=useSetRecoilState(highlightedArray)
    const setSelectedSol=useSetRecoilState(selected)
    const setBoardState=useSetRecoilState(board)
    const selectedSol=useRecoilValue(selected)

    const isHighlighted=(row:number,col:number):boolean=>{   
        return highlightedBox.some(arr => 
          arr.length === [row,col].length && arr.every((value:number, index:number) => value === [row,col][index])
        );
    }

    const isBlack=(row:number,col:number)=>{
        // console.log(board[row][col]);
        
        return blackParts.includes(boardState[row][col])
    }
    
    const isWhite=(row:number,col:number)=>{
        return whiteParts.includes(boardState[row][col])
    }

    const hightlightBlocks=(row:number,col:number)=>{
       
        //for pawn
        if((isWhiteSide && boardState[row][col]==='♙') || (!isWhiteSide && boardState[row][col]==='♟︎')){
            setHighlightedBox([[]])
            console.log(isWhiteSide);
            
            if(isWhiteSide){
                if(isValid(row-1,col) && boardState[row-1][col]===""){
                    if(isValid(row-1,col))
                    setHighlightedBox([[row-1,col]])
                    if(row===6){
                        if(isValid(row-2,col) && boardState[row-2][col]===""){
                            setHighlightedBox((pre)=>[...pre,[row-2,col]])
                        }
                    }
                }
                if(isValid(row-1,col-1) && isBlack(row-1,col-1)){
                    setHighlightedBox((pre)=>{return [...pre,[row-1,col-1]]})
                }
                if( isValid(row-1,col+1) && isBlack(row-1,col+1)){
                    setHighlightedBox((pre)=>{return [...pre,[row-1,col+1]]})
                }
            }
            else{
                if(isValid(row+1,col) && boardState[row+1][col]===""){
                    if(isValid(row+1,col))
                    setHighlightedBox([[row+1,col]])
                    if(row===1){
                        if(isValid(row+2,col) && boardState[row+2][col]===""){
                            setHighlightedBox((pre)=>[...pre,[row+2,col]])
                        }
                    }
                }
                if(isValid(row+1,col+1) && isWhite(row+1,col+1)){
                    setHighlightedBox((pre)=>{return [...pre,[row+1,col+1]]})
                }
                if( isValid(row+1,col-1) && isWhite(row+1,col-1)){
                    setHighlightedBox((pre)=>{return [...pre,[row+1,col-1]]})
                }
            }            
        }
    }

    const isValid=(row:number,col:number)=>{
        if(row>=0 && row<=7 && col>=0 && col<=7 ) return true
        return false
    }
 
  
  const handleOnClick=(row:number,col:number)=>{
    // console.log(row,col);
    // if(boardState[row][col]===""){
    //     setHighlightedBox([[row,col]])
    // }
     if((isWhiteSide && isWhite(row,col)) || (!isWhiteSide && isBlack(row,col))){
        hightlightBlocks(row,col)
    }
    // else setHighlightedBox([[]])

    if((isWhiteSide && isWhite(row,col)) || (!isWhiteSide && isBlack(row,col))){
        // console.log('i selected here');
        setSelectedSol([row,col])
    }else{
        if(selectedSol.length===0 && boardState[row][col]===""){
            setHighlightedBox([[row,col]])
        }else if((selectedSol.length===0 && isWhiteSide && isBlack(row,col)) || (selectedSol.length===0 && !isWhiteSide && isWhite(row,col))){
            setHighlightedBox([[]])
        }else if(selectedSol.length!==0){
            if(isHighlighted(row,col)){
                // console.log('i came here');
                
                setBoardState((pre)=>{
                    const newBoard=pre.map(innerArray => [...innerArray])
                    // console.log(newBoard);
                    // console.log(selectedSol[1]);
                    
                    newBoard[row][col]=newBoard[selectedSol[0]][selectedSol[1]]
                    newBoard[selectedSol[0]][selectedSol[1]]=""
                    return newBoard
                })
                setHighlightedBox([[row,col],[selectedSol[0],selectedSol[1]]])
            }else{
                if(boardState[row][col]===""){
                    setHighlightedBox([[row,col]])
                }else if((isWhiteSide && isBlack(row,col)) || (!isWhiteSide && isWhite(row,col))){
                    setHighlightedBox([[]])
                }
            }
        }
    }

  }
  return (
    <div className='h-auto w-[100%]  flex flex-col justify-center items-center'>
                {rows.map((row,rowIndex)=>(
                    <div className="flex flex-row">
                        {cols.map((col,colIndex)=>(
                            <div className={`h-[57px] w-[57px] cursor-pointer text-[3rem] flex justify-center items-center border-[1px] border-black
                            ${isHighlighted(rowIndex,colIndex)?
                                `${(isWhiteSide && isBlack(rowIndex,colIndex)) || (!isWhiteSide && isWhite(rowIndex,colIndex))?`bg-red-500`:`bg-green-500`}`
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
