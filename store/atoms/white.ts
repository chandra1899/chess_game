"use client"

import { atom, useRecoilValue } from 'recoil'
const whiteParts=["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖","♙"]

import { board } from './board'


const isWhite=(row:number,col:number)=>{
    const boardState=useRecoilValue(board)
    return whiteParts.includes(boardState[row][col])
}

export const whiteis = atom({
    key: 'whiteis',
    default: isWhite,
  });