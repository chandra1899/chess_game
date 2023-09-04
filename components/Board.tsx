// "use client"

import { highlightedArray } from '@/store/atoms/highlight';
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';

const rows=['A','B','C','D','E','F','G','H']
const cols=['1','2','3','4','5','6','7','8']

const initialBoardState = [
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
  ];

const Board = () => {
    const highlightedBox=useRecoilValue(highlightedArray)
    const setHighlightedBox=useSetRecoilState(highlightedArray)

    const isHighlighted=(row:number,col:number):boolean=>{   
        return highlightedBox.some(arr => 
          arr.length === [row,col].length && arr.every((value:number, index:number) => value === [row,col][index])
        );
    } 
 
  
  const handleOnClick=(row:number,col:number)=>{
    // console.log(row,col);
    if(initialBoardState[row][col]==='♙')
    setHighlightedBox([[row-1,col]])
    if(initialBoardState[row][col]==='♟︎')
    setHighlightedBox([[row+1,col]])
  }
  return (
    <div className='h-auto w-[100%]  flex flex-col justify-center items-center'>
                {rows.map((row,rowIndex)=>(
                    <div className="flex flex-row">
                        {cols.map((col,colIndex)=>(
                            <div className={`h-[57px] w-[57px] cursor-pointer text-[3rem] flex justify-center items-center
                            ${isHighlighted(rowIndex,colIndex)?`bg-green-500`
                            :`
                            ${rowIndex%2===0?`${colIndex%2==0?`bg-[#E6BF83]`:`bg-[#8C6529]`}`:`${colIndex%2==0?`bg-[#8C6529]`:`bg-[#E6BF83]`}`}`}
                            `}
                            onClick={()=>{handleOnClick(rowIndex,colIndex)}}
                            >
                                {initialBoardState[rowIndex][colIndex]}
                            </div>
                        ))}
                    </div>
                ))}

            </div>
  )
}

export default Board
