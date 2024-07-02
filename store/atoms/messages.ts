"use client"
import { atom } from 'recoil'

export interface MessageType {
  isWhiteSide : boolean,
  value : string,
  roomName : string
}

export const Messages = atom<MessageType[]>({
    key: 'Messages',
    default: []
  });