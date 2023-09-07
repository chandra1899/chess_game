"use client"

import { atom } from 'recoil'

export const selected = atom({
    key: 'selected',
    default: [1,1]
  });