"use client"

import React, { useEffect, useRef, useState } from 'react'
import { EmojiClickData } from 'emoji-picker-react';
import { IoMdSend } from "react-icons/io";
import { EmojiPickComponent } from '@/components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Messages } from '@/store/atoms/messages';
import { WhiteSideIs } from '@/store/atoms/whiteSIde';
import { useParams } from 'next/navigation';
import { isEmaijiOpen } from '@/store/atoms/emoji';
import axios from 'axios';

const Right = ({socket}:{socket:any}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const {id} = useParams()
    const [message,setMessage]=useState('')
    const messages=useRecoilValue(Messages)
    const isWhiteSide=useRecoilValue(WhiteSideIs)
    const setMessages=useSetRecoilState(Messages)
    const setisemojiopen=useSetRecoilState(isEmaijiOpen)
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setMessage(e.target.value)
        // console.log(message);    
    }
    const handleEmojiClick = (emojiObject:EmojiClickData) => {
        let msg = message;
        msg += emojiObject.emoji;
        setMessage(msg);
      };
      const handleEnter=(e:any)=>{
        if(e.key==='Enter'){
          handleSendMsg();
        }
      }
    const handleSendMsg=async ()=>{  
      const res=await axios.post('/api/savemessage',{
        roomName:id,
        value:message,
        isWhiteSide
      })
      if(res.status===200){
        setisemojiopen(false)
        if(message=='') return ;
        setMessages((pre:any)=>[...pre,{value:message,isWhiteSide}])
        setMessage('')
        let data={
        value:message,
        isWhiteSide,
        roomId:id
      }
      await socket.emit('send_msg',data)
      }else{
        //handleError
      }
      
    }
    useEffect(()=>{
      socket.on('receive_msg',(data:any)=>{
        console.log(data);
        if(data.isWhiteSide!==isWhiteSide){
          setMessages((pre:any)=>[...pre,data])
        }
        
      })
    },[socket])
    useEffect(() => {
      if(scrollRef.current){
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
   }, [messages]);
  return (
    <div className='relative hidden xs:block chat h-[100vh] w-[27%] bg-black border-[1px] border-slate-600 '>
      <div className='overflow-y-scroll h-[100%] w-[100%] pb-20' ref={scrollRef}>
      {messages.map((msg:{value:string,isWhiteSide:boolean})=>(
        <div className='text-white min-h-[40px] p-2 m-2 relative'>
          <span className={`font-medium absolute ${msg.isWhiteSide!==isWhiteSide?'bg-[#0020C2] left-4 rounded-br-xl':'bg-[#2B65EC] right-4 rounded-bl-xl'} px-2 py-2 rounded-t-xl `}>{msg.value}</span>
        </div>
      ))}
      </div>
            <div className='absolute w-[92%] text-white flex flex-row justify-around items-center bottom-3 ml-3'>           
            <EmojiPickComponent handleEmojiClick={handleEmojiClick}/>
            <input type="text"
            value={message}
            onChange={handleChange}
            onKeyUp={handleEnter}
            className={`bg-transparent border-slate-500 border-[0.1rem] border-solid text-white placeholder:text-secondary placeholder:opacity-60 h-[37px] w-[80%] py-2 px-3  rounded-md outline-none focus:border-blue focus:border-[0.1rem] focus:border-solid  font-medium m-2`}
            placeholder='Type Message'
             />
             <IoMdSend size='28px' className='cursor-pointer' onClick={handleSendMsg} />
            </div>
        </div>
  )
}

export default Right
