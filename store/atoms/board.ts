"use client"

import { atom } from 'recoil'

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

export const board = atom({
    key: 'board',
    default: [
        ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
        ["♟︎", "♟︎", "♙", "♟︎", "♙", "", "♟︎", "♟︎"],
        ["♟︎", "♜", "", "", "", "", "♙", ""],
        ["", "♙", "", "♔", "", "♜", "", ""],
        ["", "", "", "", "", "", "♞", ""],
        ["", "", "", "", "♘", "♟︎", "", ""],
        ["♙", "♙", "♟︎", "♙", "♙", "♙", "♙", "♙"],
        ["♖", "♘", "♗", "♕", "", "♗", "♘", "♖"],
      ],
  });