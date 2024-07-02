"use client"
import { atom } from 'recoil'

type Board = string[][]

export interface HistoryType {
  board : Board,
  from : [number, number],
  to : [number, number],
  isWhiteSide : boolean,
  roomName : string
}

export const History = atom<HistoryType[]>({
    key: 'History',
    default: []
  });