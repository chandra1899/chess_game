"use client"

import { atom } from 'recoil'

export const Messages = atom({
    key: 'Messages',
    default: [] as any
  });