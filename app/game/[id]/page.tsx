"use client"

import { BackDrop, Board, CopyLink, Left, Right } from "@/components"
import { useRecoilState, useRecoilValue,useSetRecoilState ,} from "recoil";
import { highlightedArray } from "@/store/atoms/highlight";
import { useEffect } from "react";
import { shareLink } from "@/store/atoms/shareLink";

export default async function Game() {
    const setShrLink=useSetRecoilState(shareLink)
    useEffect(()=>{
      setShrLink(true)
    },[])
  
  return (
    <main className='flex justify-center items-center bg-black'>
      <CopyLink/>
      <BackDrop/>
      <div className='flex flex-row justify-center items-center h-auto w-[97vw]'>
        <Left/>

        <div className='chessboard h-[100vh] w-[55%] bg-[#222222e6] flex flex-col justify-center items-center'>
          <audio src="/capture.mp3" id="capture"></audio>
          <audio src="/move-self.mp3" id="move_self"></audio>
            <Board  />
        </div>

        <Right/>
      </div>
    </main>
  )
}
