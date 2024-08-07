"use client"

import { useState } from "react"
import { FormEventHandler, KeyboardEventHandler } from 'react';
import Link  from 'next/link'
import axios from 'axios';
import {useRouter} from 'next/navigation'
//spinner
import * as React from 'react';
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';

export default function RegisterForm(){
  const router=useRouter()
    const [isLoading,setIsLoading]=useState<boolean>(false)
    const [blockLogin,setBlockLogin]=useState<boolean>(false)
    const [status,setStatus]=useState<string>('Register')
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
        setBlockLogin(true)
        setIsLoading(true)
        try {
            let res=await axios.post('/api/register',form)
            if(res.status===200 || res.status === 409){
              let form =e.target as HTMLFormElement
                form.reset()
                setIsLoading(false)
                setStatus('Redirecting...')
                router.replace('/login')
            }
            
        } catch (error) {
            console.log(error);  
        }

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
      <button className={`h-[35px] rounded-lg font-medium text-white w-[100%] mt-4 p-1 ${isLoading?'bg-[#8C6529]':'bg-[#8C6529]'}  hover:bg-[#825B1F] tracking-widest relative`}>
      {blockLogin && <div className="absolute h-[100%] w-[100%] opacity-40 bg-slate-500 top-0 left-0 rounded-lg"></div>}
       {isLoading?  
    //    <Box sx={{ display: 'flex' ,justifyContent:'center',color:'red'}} >
    //   <CircularProgress size={23} />
    // </Box>
    <div role="status">
    <svg aria-hidden="true" className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    {/* <span class="sr-only">Loading...</span> */}
</div>
    :
       'Register'}
        </button>
      <p className="text-[13px] my-2 ml-2 text-[#E6BF83]">already have acct?  
        <Link href={'/login'} className="underline hover:text-[#A0793D]"> login</Link>
         </p>
         
    </form>
  </div>
}