"use client"

import EmojiPicker, { Theme } from 'emoji-picker-react';
import { useRecoilState } from 'recoil';
import { isEmaijiOpen } from '@/store/atoms/emoji';
import { BsEmojiSmile ,BsEmojiSmileFill} from "react-icons/bs";
import { EmojiClickData } from 'emoji-picker-react';

interface EmojiPickComponentProps{
    handleEmojiClick:(e:EmojiClickData)=>void
}
const theme: Theme | any = 'dark';
export default function EmojiPickComponent({handleEmojiClick}:EmojiPickComponentProps){
    const [isemojiopen,setisemojiopen]=useRecoilState(isEmaijiOpen)
    return <>
    {isemojiopen && <BsEmojiSmileFill size='33px' className=' cursor-pointer' onClick={()=>{setisemojiopen(false)}}/>}
      {!isemojiopen && <BsEmojiSmile size='33px' className='cursor-pointer' onClick={()=>{setisemojiopen(true)}} />}
    {isemojiopen && <div className='absolute bottom-14 left-2'>
        <EmojiPicker onEmojiClick={handleEmojiClick} theme={theme} height='350px' width='270px' />
        </div>}
    </>
}