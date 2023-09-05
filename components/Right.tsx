"use client"

import React, { useState } from 'react'
import { EmojiClickData } from 'emoji-picker-react';
import { IoMdSend } from "react-icons/io";
import { EmojiPickComponent } from '@/components';

const Right = () => {
    const [message,setMessage]=useState('')
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setMessage(e.target.value)
        // console.log(message);
        
    }
    const handleEmojiClick = (emojiObject:EmojiClickData) => {
        let msg = message;
        msg += emojiObject.emoji;
        setMessage(msg);
      };
    //   const handleEnter=(e)=>{
    //     if(e.key==='Enter'){
    //       sendMsg();
    //     }
    //   }
  return (
    <div className='relative chat h-[100vh] w-[27%] bg-black border-[1px] border-slate-600'>
            <div className='absolute w-[92%] text-white flex flex-row justify-around items-center bottom-3 ml-3'>           
            <EmojiPickComponent handleEmojiClick={handleEmojiClick}/>
            <input type="text"
            value={message}
            onChange={handleChange}
            className={`bg-transparent border-slate-500 border-[0.1rem] border-solid text-white placeholder:text-secondary placeholder:opacity-60 h-[37px] w-[80%] py-2 px-3  rounded-md outline-none focus:border-blue focus:border-[0.1rem] focus:border-solid  font-medium m-2`}
            placeholder='Type Message'
             />
             <IoMdSend size='28px' className='cursor-pointer'/>
            </div>
        </div>
  )
}

export default Right
