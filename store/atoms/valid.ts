"use client"

const valid=(row:number,col:number)=>{
    if(row>=0 && row<=7 && col>=0 && col<=7 ) return true
    return false
}


import { atom } from 'recoil'

export const Valid = atom({
    key: 'isValid',
    default: valid
  });