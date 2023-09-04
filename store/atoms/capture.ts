"use client"

import { atom } from 'recoil'

export const capture = atom({
    key: 'capture',
    default: [[]],
  });