"use client"

import { atom } from 'recoil'

export const board = atom({
    key: 'board',
    default: [
        ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
        ["♟︎", "♟︎", "♙", "♟︎", "♙", "", "♟︎", "♟︎"],
        ["", "", "", "", "", "", "♙", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "♘", "", "", "", "♘", ""],
        ["", "", "", "", "", "♟︎", "", ""],
        ["♙", "♙", "♟︎", "♙", "♙", "♙", "♙", "♙"],
        ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
      ],
  });