"use client"

import { atom } from 'recoil'

export const History = atom({
    key: 'History',
    default: [] as any
  });