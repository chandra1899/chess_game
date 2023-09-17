"use client"

import { atom } from 'recoil'

export const highlightedOppoMoveArray = atom({
    key: 'highlightedOppoMoveArray',
    default: [[2,2]],
  });