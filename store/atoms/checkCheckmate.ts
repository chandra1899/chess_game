"use client"

import { atom } from 'recoil'

export const checkCheckmate = atom({
    key: 'checkCheckmate',
    default: [[1,1]],
  });