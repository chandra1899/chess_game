"use client"

import { atom } from 'recoil'

export const selected = atom({
    key: 'selected',
    default: [] as any
  });