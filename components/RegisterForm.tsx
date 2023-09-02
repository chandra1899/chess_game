"use client"

import { useState } from "react"
import { FormEventHandler, KeyboardEventHandler } from 'react';
import Link  from 'next/link'
import axios from 'axios';
//spinner
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function RegisterForm(){
    const [isLoading,setIsLoading]=useState(false)
    const [form,setForm]=useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
      })
      const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} =e.target;
        setForm({...form,[name]:value})
      }
      const handlesubmit:FormEventHandler<HTMLFormElement>=async (e)=>{
        e.preventDefault()
        setIsLoading(true)
        console.log(form);
        try {
            let res=await axios.post('/api/register',form)
            if(res.status===200){
                // window.alert('registered')
            }
            
        } catch (error) {
            console.log(error);  
        }
        setIsLoading(false)

      }
      const handleKeyEnter:KeyboardEventHandler<HTMLFormElement>=(e)=>{
        if(e.key=='Enter'){
            handlesubmit(e);
        }
       }

    return <div className="h-auto w-[300px] bg-black rounded-lg">
    <form action="" onSubmit={handlesubmit} onKeyUp={handleKeyEnter} className="flex flex-col rounded-lg p-4">
      <input 
      type="text"
      placeholder="Name"
      name="name"
      onChange={handleChange}
      className={`bg-transparent border-[#8C6529] border-[0.1rem] border-solid text-white placeholder:text-secondary placeholder:opacity-60 py-2 px-3  rounded-lg outline-none focus:border-[#461F00] focus:border-[0.1rem] focus:border-solid  font-medium my-2`}
      />
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
      <input 
      type="password"
      placeholder="confirm_password"
      name="confirmPassword"
      onChange={handleChange}
      className={`bg-transparent border-[#8C6529] border-[0.1rem] border-solid text-white placeholder:text-secondary placeholder:opacity-60 py-2 px-3  rounded-lg outline-none focus:border-[#461F00] focus:border-[0.1rem] focus:border-solid  font-medium my-2`}
      />
      <button className={`h-[35px] rounded-lg font-medium text-white w-[100%] mt-4 p-1 bg-[#8C6529] hover:bg-[#825B1F] tracking-widest`}>
       {isLoading?  <Box sx={{ display: 'flex' ,justifyContent:'center',color:'red'}} >
      <CircularProgress size={23} />
    </Box>:
       'Register'}
        </button>
      <p className="text-[13px] my-2 ml-2 text-[#E6BF83]">already have acct?  
        <Link href={'/login'} className="underline hover:text-[#A0793D]"> login</Link>
         </p>
    </form>
  </div>
}