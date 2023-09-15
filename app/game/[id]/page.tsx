"use client"

import { Board, Left, Right } from "@/components"
import { useRecoilState, useRecoilValue,useSetRecoilState ,} from "recoil";
import { highlightedArray } from "@/store/atoms/highlight";

export default async function Game() {
    // const highlightedBox=useRecoilValue(highlightedArray)
    // const [highlightedBox, setHighlightedBox] = useRecoilState(highlightedArray);
    
  
  return (
    <main className='flex justify-center items-center bg-black'>
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
