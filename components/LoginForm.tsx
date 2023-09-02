"use client"

import { useState } from "react";
import { FormEventHandler, KeyboardEventHandler } from 'react';
import Link  from 'next/link'
//spinner
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoginForm(){
  const [isLoading,setIsLoading]=useState(false)
  const [form,setForm]=useState({
    email:'',
    password:'',
  })
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} =e.target;
    setForm({...form,[name]:value})
  }
  const handlesubmit:FormEventHandler<HTMLFormElement>=(e)=>{
    e.preventDefault()
    setIsLoading(true)
    console.log(form);
  }
  const handleKeyEnter:KeyboardEventHandler<HTMLFormElement>=(e)=>{
    if(e.key=='Enter'){
        handlesubmit(e);
    }
   }

    return <div className="h-auto w-[300px] bg-black rounded-lg">
      <form action="" onSubmit={handlesubmit} onKeyUp={handleKeyEnter} className="flex flex-col rounded-lg p-4">
        <input 
        type="email"
        placeholder="Email"
        name="email"
        onChange={handleChange}
        className={`bg-transparent border-[#8C6529] border-[0.1rem] border-solid text-white placeholder:text-secondary placeholder:opacity-60 py-2 px-3  rounded-lg outline-none focus:border-[#461F00] focus:border-[0.1rem] focus:border-solid  font-medium my-2`}
        />
        <input 
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        className={`bg-transparent border-[#8C6529] border-[0.1rem] border-solid text-white placeholder:text-secondary placeholder:opacity-60 py-2 px-3  rounded-lg outline-none focus:border-[#461F00] focus:border-[0.1rem] focus:border-solid  font-medium my-2`}
        />
        <button className={`h-[35px] rounded-lg font-medium text-white w-[100%] mt-4 p-1 bg-[#8C6529] hover:bg-[#825B1F] tracking-widest`}>
        {isLoading?  <Box sx={{ display: 'flex' ,justifyContent:'center',color:'red'}} >
      <CircularProgress size={23} />
    </Box>:
       'Login'}    
          </button>
      <p className="text-[13px] my-2 ml-2 text-[#E6BF83]">don't have acct?  
        <Link href={'/register'} className="underline hover:text-[#A0793D]"> register</Link>
         </p>
      </form>
    </div>
}