"use client"

import { atom } from 'recoil'

export const establishStatus = atom({
    key: 'establishStatus',
    default: 'initialising..........',
  });