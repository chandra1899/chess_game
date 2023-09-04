"use client"
const blackParts=["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜","♟︎"]
import { board } from './board'


const isBlack=(row:number,col:number)=>{
    const boardState=useRecoilValue(board)
    // console.log(board[row][col]);
    
    return blackParts.includes(boardState[row][col])
}

import { atom, useRecoilValue } from 'recoil'

export const blackis = atom({
    key: 'black',
    default: isBlack,
  });